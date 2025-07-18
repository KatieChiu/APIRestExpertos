const Venta = require('../models/venta');
const DetalleVenta = require('../models/detalleVenta');
const MovimientoCaja = require('../models/movimiento');
const Producto = require('../models/producto');
const { validationResult } = require('express-validator');
const db = require('../configuration/db');

// Listar todas las ventas
exports.listar = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: DetalleVenta
    });
    res.json(ventas);
  } catch (error) {
    console.error("Error al listar ventas:", error);
    res.status(500).json({ error: "Error al obtener ventas" });
  }
};

// Crear nueva venta asociada al usuario autenticado
exports.guardar = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json(errores.array());
  }

  const {
    numero_factura,
    fecha,
    estado,
    tipo_pago,
<<<<<<< Updated upstream
    descuento = 0,
=======
    descuento,
>>>>>>> Stashed changes
    observaciones,
    detalles
  } = req.body;

  const usuario_id = req.user?.usuario_id; // ← Obtenemos el ID desde el token

  if (!usuario_id) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  const t = await db.transaction();

  try {
    let subtotal = 0;

<<<<<<< Updated upstream
=======
    // Calcular subtotal en base a los productos
>>>>>>> Stashed changes
    for (const item of detalles) {
      const producto = await Producto.findByPk(item.codigo_producto, { transaction: t });

      if (!producto) throw new Error(`Producto ${item.codigo_producto} no encontrado`);
      if (producto.stock_actual < item.cantidad) {
        throw new Error(`Stock insuficiente para el producto: ${producto.nombre}`);
      }

      const precio_unitario = parseFloat(producto.precio_venta);
      const cantidad = parseFloat(item.cantidad);
      subtotal += precio_unitario * cantidad;
    }

    const iva = parseFloat((subtotal * 0.15).toFixed(2));
    const total = parseFloat((subtotal + iva - descuento).toFixed(2));

<<<<<<< Updated upstream
=======
    // Crear la venta
>>>>>>> Stashed changes
    const nuevaVenta = await Venta.create({
      numero_factura,
      fecha,
      subtotal,
      iva,
      descuento, // si no hay, se asume 0
      total,
      estado,
      tipo_pago,
      observaciones,
      usuario_id // ← Asociar al usuario logueado
    }, { transaction: t });

<<<<<<< Updated upstream
=======
    // Guardar detalles y actualizar stock
>>>>>>> Stashed changes
    for (const item of detalles) {
      const producto = await Producto.findByPk(item.codigo_producto, { transaction: t });

      const precio_unitario = parseFloat(producto.precio_venta);
      const cantidad = parseFloat(item.cantidad);

      await DetalleVenta.create({
        numero_factura,
        codigo_producto: item.codigo_producto,
        cantidad: cantidad,
        precio_unitario: precio_unitario
      }, { transaction: t });

      producto.stock_actual -= cantidad;
      await producto.save({ transaction: t });
    }

<<<<<<< Updated upstream
=======
    // Registrar movimiento en caja
>>>>>>> Stashed changes
    await MovimientoCaja.create({
      tipo: 'ingreso',
      descripcion: `Venta ${numero_factura}`,
      monto: total,
      fecha,
      numero_factura
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ mensaje: 'Venta registrada con éxito', venta: nuevaVenta });

  } catch (error) {
    await t.rollback();
    console.error("Error al guardar venta:", error);
    res.status(500).json({ error: error.message });
  }
};

<<<<<<< Updated upstream
// Eliminar una venta y devolver stock
exports.eliminar = async (req, res) => {
  const { numero_factura } = req.params;
=======

// Eliminar una venta y devolver stock
exports.eliminar = async (req, res) => {
  const { numero_factura } = req.params;

>>>>>>> Stashed changes
  const t = await db.transaction();

  try {
      const venta = await Venta.findByPk(numero_factura, {
      include: DetalleVenta,
      transaction: t
    });
      console.log("Venta encontrada:", venta);
    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });

    for (const detalle of venta.DetalleVenta) {
      const producto = await Producto.findByPk(detalle.codigo_producto, { transaction: t });
      if (producto) {
        producto.stock_actual += detalle.cantidad;
        await producto.save({ transaction: t });
      }
    }

    await DetalleVenta.destroy({ where: { numero_factura }, transaction: t });
    await venta.destroy({ transaction: t });

    await t.commit();
    res.json({ mensaje: 'Venta eliminada y stock restituido' });

  } catch (error) {
    await t.rollback();
    console.error("Error al eliminar venta:", error);
    res.status(500).json({ error: "Error al eliminar venta" });
  }
};
