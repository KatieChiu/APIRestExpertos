const { validationResult } = require('express-validator');
const ordenCompra = require('../models/ordenCompra'); // mayúscula para modelo
const OrdenCompraDetalle = require('../models/ordenCompraDetalle'); // modelo detalle
const MovimientoCaja = require('../models/movimiento'); // modelo de movimiento de caja
const Producto = require('../models/producto'); // modelo de producto
const Proveedor = require('../models/proveedor'); // modelo de proveedor
const db = require('../configuration/db'); // para transacciones
const {EnviarCorreo} = require("../configuration/correo");// función para enviar correos
require('dotenv').config();

exports.listar = async (req, res) => {
  try {
    const ordenes = await ordenCompra.findAll({
      include: [{ model: OrdenCompraDetalle }] // opcional, si quieres detalles
    });
    res.json(ordenes);
  } catch (error) {
    console.error("Error al listar las ordenes de compra:", error);
    res.status(500).json({ error: "Error al obtener compras" });
  }
};

exports.guardar = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json(errores.array());
  }

  const {
    numero_orden,
    fecha_emision,
    fecha_entrega_esperada,
    estado,
    observaciones,
    proveedor_id,
    detalles
  } = req.body;

  const usuario_id = req.user?.usuario_id;
  if (!usuario_id) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const t = await db.transaction();

  try {
    let subtotal = 0;

    for (const detalle of detalles) {
      const producto = await Producto.findByPk(detalle.codigo_producto, { transaction: t });

<<<<<<< Updated upstream
      if (!producto) throw new Error(`Producto con código ${detalle.codigo_producto} no encontrado`);

      const cantidad = parseFloat(detalle.cantidad);
      const precio_unitario = parseFloat(detalle.precio_unitario);
=======
      if (!producto) {
        throw new Error(`Producto con código ${detalle.codigo_producto} no encontrado`);
      }

      const cantidad = parseFloat(detalle.cantidad);
      const precio_unitario = parseFloat(detalle.precio_unitario);

>>>>>>> Stashed changes
      subtotal += cantidad * precio_unitario;

      producto.precio_compra = precio_unitario;
      await producto.save({ transaction: t });
    }

    const iva = parseFloat((subtotal * 0.15).toFixed(2));
    const total = parseFloat((subtotal + iva).toFixed(2));

    const nuevaOrden = await ordenCompra.create({
      numero_orden,
      fecha_emision,
      fecha_entrega_esperada,
      subtotal,
      iva,
      total,
      estado,
      observaciones,
      proveedor_id,
      usuario_id // ✅ Asociación del usuario autenticado
    }, { transaction: t });

    for (const detalle of detalles) {
      await OrdenCompraDetalle.create({
        numero_orden,
        codigo_producto: detalle.codigo_producto,
        cantidad: detalle.cantidad,
        precio_unitario: parseFloat(detalle.precio_unitario)
      }, { transaction: t });
    }

    await MovimientoCaja.create({
      tipo: 'egreso',
      descripcion: `Compra orden ${numero_orden}`,
      monto: total,
      fecha: fecha_emision,
      numero_orden
    }, { transaction: t });

    await t.commit();

<<<<<<< Updated upstream
    // 📨 Envío de correo
    const proveedor = await Proveedor.findByPk(proveedor_id);
    if (proveedor?.email) {
      try {
        await EnviarCorreo({
          from: process.env.correousuario,
          to: proveedor.email,
          subject: "Orden de Compra - Ferretería Sistemas",
          html: `<p>Se ha extendido una orden de compra <b>${numero_orden}</b> por L. ${total}.00.</p>`
        });
      } catch (err) {
        console.error("Error al enviar correo:", err.message);
      }
    }

=======
    // ENVIAR CORREO DESPUÉS DEL COMMIT (fuera de la transacción)
    const proveedor = await Proveedor.findByPk(proveedor_id);
    console.log("Intentando enviar correo a proveedor...");
    console.log("Proveedor:", proveedor?.email);
    if (proveedor && proveedor.email) {
      try {
        const enviado = await EnviarCorreo({
          from: process.env.correousuario,
          to: proveedor.email,
          subject: "Orden de Compra - Ferretería Sistemas",
          html: `
            <p>Se ha extendido una orden de compra con número de orden <b>${numero_orden}</b>, de parte de Ferretería Sistemas por el monto de <b>L. ${total}.00</b>.</p>
          `
        });

        if (!enviado) {
          console.warn("Correo no enviado");
        }
      } catch (err) {
        console.error("Error al enviar el correo:", err);
      }
    }

    console.log("Nueva orden de compra creada:", nuevaOrden);
>>>>>>> Stashed changes
    res.status(201).json({ message: "Orden creada con éxito", orden: nuevaOrden });

  } catch (error) {
    await t.rollback();
    console.error("Error al guardar compra:", error);
    res.status(500).json({ error: error.message });
  }
};


<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
exports.editar = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log("Errores de validación en editar:", errores.array());
    return res.status(400).json(errores.array());
  }

  const { numero_orden } = req.params;
  const {
    fecha_emision,
    fecha_entrega_esperada,
    subtotal,
    iva,
    total,
    estado,
    observaciones,
    proveedor_id
  } = req.body;

  try {
    const ordenExistente = await ordenCompra.findByPk(numero_orden);
    if (!ordenExistente) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }

    await ordenExistente.update({
      fecha_emision,
      fecha_entrega_esperada,
      subtotal,
      iva,
      total,
      estado,
      observaciones,
      proveedor_id
    });

    console.log("Datos actualizados para orden de compra:", numero_orden);
    res.json({ mensaje: 'Orden actualizada correctamente', orden: ordenExistente });
  } catch (error) {
    console.error("Error al editar la orden:", error);
    res.status(500).json({ mensaje: 'Error al editar la orden' });
  }
};

exports.eliminar = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log("Errores de validación en eliminar:", errores.array());
    return res.status(400).json(errores.array());
  }

  const { numero_orden } = req.body;

  try {
    const orden = await ordenCompra.findByPk(numero_orden);
    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }

    await orden.destroy();

    console.log(`Registro con número de orden ${numero_orden} eliminado`);
    res.json({ mensaje: `Registro con número de orden ${numero_orden} eliminado` });
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    res.status(500).json({ mensaje: 'Error al eliminar la orden' });
  }
};
