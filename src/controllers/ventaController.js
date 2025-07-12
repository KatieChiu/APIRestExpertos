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

// Crear nueva venta
exports.guardar = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json(errores.array());
  }

  const {
    numero_factura,
    fecha,
    subtotal,
    iva,
    descuento,
    total,
    estado,
    tipo_pago,
    observaciones,
    detalles
  } = req.body;

  const t = await db.transaction();
  try {
    const nuevaVenta = await Venta.create({
      numero_factura,
      fecha,
      subtotal,
      iva,
      descuento,
      total,
      estado,
      tipo_pago,
      observaciones
    }, { transaction: t });
    await MovimientoCaja.create({
      tipo: 'ingreso',
      descripcion: `Venta ${numero_factura}`,
      monto: total,
      fecha: fecha,
      //cajaId: cajaActiva.id,
      numero_factura: numero_factura
    });
    for (const item of detalles) {
      const producto = await Producto.findByPk(item.codigo_producto, { transaction: t });

      if (!producto) throw new Error(`Producto ${item.codigo_producto} no encontrado`);
      if (producto.stock_actual < item.cantidad) throw new Error(`Stock insuficiente para ${producto.nombre}`);

      await DetalleVenta.create({
        numero_factura,
        codigo_producto: item.codigo_producto,
        cantidad: item.cantidad,
        precio_unitario: item.precio_unitario
      }, { transaction: t });

      producto.stock_actual -= item.cantidad;
      await producto.save({ transaction: t });
    }

    await t.commit();
    res.status(201).json({ mensaje: 'Venta registrada con éxito', venta: nuevaVenta });
    

  } catch (error) {
    await t.rollback();
    console.error("Error al guardar venta:", error);
    res.status(500).json({ error: error.message });
  }
};

// Editar una venta (solo campos generales, no detalles ni stock)
exports.editar = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json(errores.array());
  }

  const { numero_factura } = req.params;
  const {
    fecha,
    subtotal,
    iva,
    descuento,
    total,
    estado,
    tipo_pago,
    observaciones
  } = req.body;

  try {
    const venta = await Venta.findByPk(numero_factura);
    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });

    await venta.update({
      fecha, subtotal, iva, descuento, total, estado, tipo_pago, observaciones
    });

    res.json({ mensaje: 'Venta actualizada con éxito', venta });
  } catch (error) {
    console.error("Error al editar venta:", error);
    res.status(500).json({ error: "Error al editar venta" });
  }
};

// Eliminar una venta y devolver stock
exports.eliminar = async (req, res) => {
  const { numero_factura } = req.body;

  const t = await db.transaction();
  try {
    const venta = await Venta.findByPk(numero_factura, {
      include: DetalleVenta,
      transaction: t
    });

    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });

    // Devolver el stock
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
