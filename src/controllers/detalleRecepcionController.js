const DetalleRecepcion = require('../models/detalleRecepcion');
const OrdenCompra = require('../models/ordenCompra');
const DetalleOrdenCompra = require('../models/ordenCompraDetalle');
const Producto = require('../models/producto');
const { validationResult } = require('express-validator');
const db = require('../configuration/db');

exports.guardar = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json(errores.array());
  }

  const { numero_orden, recepciones } = req.body;
  const t = await db.transaction();

  try {
    const orden = await OrdenCompra.findByPk(numero_orden, { transaction: t });
    if (!orden) throw new Error("Orden de compra no encontrada");

    for (const item of recepciones) {
      const producto = await Producto.findByPk(item.codigo_producto, { transaction: t });
      if (!producto) throw new Error(`Producto ${item.codigo_producto} no encontrado`);

      // Insertar la recepción
      await DetalleRecepcion.create({
        numero_orden,
        codigo_producto: item.codigo_producto,
        cantidad_recibida: item.cantidad_recibida
      }, { transaction: t });

      // Actualizar stock
      producto.stock_actual += item.cantidad_recibida;
      await producto.save({ transaction: t });
    }

    // Obtener todos los detalles de la orden
    const detallesOrden = await DetalleOrdenCompra.findAll({
      where: { numero_orden },
      transaction: t
    });

    // Obtener todas las recepciones de esa orden
    const recepcionesTotales = await DetalleRecepcion.findAll({
      where: { numero_orden },
      transaction: t
    });

    // Mapear cantidades solicitadas y recibidas
    const cantidadesSolicitadas = {};
    for (const d of detallesOrden) {
      cantidadesSolicitadas[d.codigo_producto] = d.cantidad;
    }

    const cantidadesRecibidas = {};
    for (const r of recepcionesTotales) {
      cantidadesRecibidas[r.codigo_producto] = (cantidadesRecibidas[r.codigo_producto] || 0) + r.cantidad_recibida;
    }

    let estado = 'completada';
    for (const codigo in cantidadesSolicitadas) {
      const solicitada = cantidadesSolicitadas[codigo];
      const recibida = cantidadesRecibidas[codigo] || 0;
      if (recibida < solicitada) {
        estado = recibida === 0 ? 'pendiente' : 'parcial';
        break;
      }
    }

    // Actualizar estado de la orden
    orden.estado = estado;
    await orden.save({ transaction: t });

    await t.commit();
    res.status(201).json({ mensaje: "Recepción registrada y estado actualizado", estado_actual: orden.estado });

  } catch (error) {
    await t.rollback();
    console.error("Error al registrar recepción:", error);
    res.status(500).json({ error: error.message });
  }
};


//Erick Blanco