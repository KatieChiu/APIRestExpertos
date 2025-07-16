// routes/ordenCompraDetalle.routes.js
const express = require('express');
const router = express.Router();
const detalleController = require('../controllers/ordenDetalleController');

/**
 * @swagger
 * tags:
 *   - name: OrdenDetalle
 *     description: Operaciones relacionadas con los detalles de órdenes de compra
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrdenDetalle:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del detalle
 *         numero_orden:
 *           type: string
 *           description: Número de la orden de compra
 *         producto_id:
 *           type: integer
 *           description: ID del producto
 *         cantidad:
 *           type: integer
 *           description: Cantidad del producto
 *         precio_unitario:
 *           type: number
 *           format: decimal
 *           description: Precio unitario del producto
 *         subtotal:
 *           type: number
 *           format: decimal
 *           description: Subtotal (cantidad * precio_unitario)
 */

/**
 * @swagger
 * /ordenDetalle:
 *   post:
 *     summary: Crea un nuevo detalle de orden de compra
 *     tags: [OrdenDetalle]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero_orden
 *               - producto_id
 *               - cantidad
 *               - precio_unitario
 *             properties:
 *               numero_orden:
 *                 type: string
 *                 description: Número de la orden de compra
 *               producto_id:
 *                 type: integer
 *                 description: ID del producto
 *               cantidad:
 *                 type: integer
 *                 minimum: 1
 *                 description: Cantidad del producto
 *               precio_unitario:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0
 *                 description: Precio unitario del producto
 *     responses:
 *       201:
 *         description: Detalle de orden creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrdenDetalle'
 *       400:
 *         description: Error de validación
 */

// Crear detalle
router.post('/', detalleController.crearDetalle);

/**
 * @swagger
 * /ordenDetalle/{id}:
 *   delete:
 *     summary: Elimina un detalle de orden de compra por ID
 *     tags: [OrdenDetalle]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle a eliminar
 *     responses:
 *       200:
 *         description: Detalle eliminado exitosamente
 *       404:
 *         description: Detalle no encontrado
 */

// Eliminar detalle por ID
router.delete('/:id', detalleController.eliminarDetalle);

/**
 * @swagger
 * /ordenDetalle/orden/{numero_orden}:
 *   get:
 *     summary: Obtiene todos los detalles de una orden de compra específica
 *     tags: [OrdenDetalle]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: numero_orden
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de la orden de compra
 *     responses:
 *       200:
 *         description: Lista de detalles de la orden
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrdenDetalle'
 *       404:
 *         description: Orden no encontrada
 */

// Obtener detalles por número de orden
router.get('/orden/:numero_orden', detalleController.listarDetallesPorOrden);

module.exports = router;
