//Katie Chiu
const {validationResult} = require('express-validator');


const OrdenCompraDetalle = require('../models/ordenCompraDetalle');
const Producto = require('../models/producto');

module.exports = { async crearDetalle(req, res) {
    try {
      const { numero_orden, codigo_producto, cantidad, precio_unitario } = req.body;

      const detalle = await OrdenCompraDetalle.create({
        numero_orden,
        codigo_producto,
        cantidad,
        precio_unitario
      });

      res.status(201).json({ mensaje: 'Detalle agregado con éxito', detalle });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar el detalle' });
    }
  },

  // Eliminar un detalle por ID
  async eliminarDetalle(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await OrdenCompraDetalle.destroy({ where: { id } });

      if (eliminado === 0) {
        return res.status(404).json({ mensaje: 'Detalle no encontrado' });
      }

      res.status(200).json({ mensaje: 'Detalle eliminado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el detalle' });
    }
  },

  // Obtener todos los detalles de una orden
  async listarDetallesPorOrden(req, res) {
    try {
      const { numero_orden } = req.params;

      const detalles = await OrdenCompraDetalle.findAll({
        where: { numero_orden },
        include: [Producto]
      });

      res.status(200).json(detalles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los detalles' });
    }
  }
};
