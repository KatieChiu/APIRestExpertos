// routes/ordenCompraDetalle.routes.js
const express = require('express');
const router = express.Router();
const detalleController = require('../controllers/ordenCompraDetalle.controller');

// Crear detalle
router.post('/', detalleController.crearDetalle);

// Eliminar detalle por ID
router.delete('/:id', detalleController.eliminarDetalle);

// Obtener detalles por número de orden
router.get('/orden/:numero_orden', detalleController.listarDetallesPorOrden);

module.exports = router;
