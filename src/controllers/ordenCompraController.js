const { validationResult } = require('express-validator');
const ordenCompra = require('../models/ordenCompra'); // mayúscula para modelo
const OrdenCompraDetalle = require('../models/ordenCompraDetalle'); // modelo detalle
const MovimientoCaja = require('../models/movimiento'); // modelo de movimiento de caja
const db = require('../configuration/db'); // para transacciones

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
    console.log(errores.array());
    return res.status(400).json(errores.array());
  }

  const {
    numero_orden,
    fecha_emision,
    fecha_entrega_esperada,
    subtotal,
    iva,
    total,
    estado,
    observaciones,
    proveedor_id,
    detalles
  } = req.body;

  const t = await db.transaction();

  try {
    // Crear la orden
    const nuevaOrden = await ordenCompra.create({
      numero_orden,
      fecha_emision,
      fecha_entrega_esperada,
      subtotal,
      iva,
      total,
      estado,
      observaciones,
      proveedor_id
    }, { transaction: t });

    // Crear los detalles (si vienen)
    if (detalles && Array.isArray(detalles)) {
      for (const detalle of detalles) {
        await OrdenCompraDetalle.create({
          numero_orden,
          codigo_producto: detalle.codigo_producto,
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario
        }, { transaction: t });
      }
    }
     await MovimientoCaja.create({
      tipo: 'egreso',
      descripcion: `Compra orden ${numero_orden}`,
      monto: total,
      fecha: fecha_emision,
      //cajaId: cajaActiva.id,
      numero_orden: numero_orden
    });
    await t.commit();
    // Crear el movimiento de egreso
   
    console.log("Nueva orden de compra creada:", nuevaOrden);
    res.status(201).json({ message: "Orden creada con éxito", orden: nuevaOrden });
  } catch (error) {
    await t.rollback();
    console.error("Error al guardar compra:", error);
    res.status(500).json({ error: "Error al guardar compra" });
  }
};

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
