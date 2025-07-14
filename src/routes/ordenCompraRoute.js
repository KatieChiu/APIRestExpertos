const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const controlador = require('../controllers/ordenCompraController');
const detalleControlador = require('../controllers/ordenDetalleController');

/**
 * @swagger
 * tags:
 *   - name: Ordenes de Compra
 *     description: Operaciones relacionadas con las órdenes de compra
 */

/**
 * @swagger
 * /ordenCompra:
 *   get:
 *     summary: Lista todas las órdenes de compra
 *     tags: [Ordenes de Compra]
 *     responses:
 *       200:
 *         description: Lista de órdenes de compra
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', controlador.listar);

/**
 * @swagger
 * /ordenCompra:
 *   post:
 *     summary: Crea una nueva orden de compra
 *     tags: [Ordenes de Compra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero_orden
 *               - fecha_emision
 *               - fecha_entrega_esperada
 *               - estado
 *               - proveedor_id
 *               - subtotal
 *               - iva
 *               - total
 *             properties:
 *               numero_orden:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 20
 *               fecha_emision:
 *                 type: string
 *                 format: date
 *               fecha_entrega_esperada:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *                 enum: [pendiente, parcial, completada, cancelada]
 *               proveedor_id:
 *                 type: string
 *               subtotal:
 *                 type: number
 *                 format: float
 *               iva:
 *                 type: number
 *                 format: float
 *               total:
 *                 type: number
 *                 format: float
 *               observaciones:
 *                 type: string
 *     responses:
 *       201:
 *         description: Orden creada correctamente
 *       400:
 *         description: Error de validación
 */
router.post('/',
    body('numero_orden').notEmpty().withMessage('El número de orden es obligatorio').isLength({ min: 5, max: 20 }).withMessage('El número de orden debe tener entre 5 y 20 caracteres'),
    body('fecha_emision').isDate().withMessage('La fecha de emisión debe ser una fecha válida'),
    body('fecha_entrega_esperada').isDate().withMessage('La fecha de entrega esperada debe ser una fecha válida'),
    body('estado').notEmpty().withMessage('El estado es obligatorio').isIn(['pendiente', 'parcial', 'completada', 'cancelada']).withMessage('El estado debe ser uno de: pendiente, parcial, completada, cancelada'),
    body('proveedor_id').notEmpty().withMessage('El ID del proveedor es obligatorio'),
    body('subtotal').isDecimal().withMessage('El subtotal debe ser un número decimal').notEmpty().withMessage('El subtotal debe tener un valor'),
    body('iva').isDecimal().withMessage('El IVA debe ser un número decimal').notEmpty().withMessage('El IVA debe tener un valor'),
    body('total').isDecimal().withMessage('El total debe ser un número decimal').notEmpty().withMessage('El total debe tener un valor'),
    body('observaciones').optional().isString().withMessage('Las observaciones deben ser una cadena de texto'),
    controlador.guardar
);

/**
 * @swagger
 * /ordenCompra:
 *   put:
 *     summary: Actualiza una orden de compra existente
 *     tags: [Ordenes de Compra]
 *     parameters:
 *       - in: query
 *         name: numero_orden
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de orden de compra a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha_emision
 *               - fecha_entrega_esperada
 *               - estado
 *               - proveedor_id
 *               - subtotal
 *               - iva
 *               - total
 *             properties:
 *               fecha_emision:
 *                 type: string
 *                 format: date
 *               fecha_entrega_esperada:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *                 enum: [pendiente, parcial, completada, cancelada]
 *               proveedor_id:
 *                 type: string
 *               subtotal:
 *                 type: number
 *                 format: float
 *               iva:
 *                 type: number
 *                 format: float
 *               total:
 *                 type: number
 *                 format: float
 *               observaciones:
 *                 type: string
 *     responses:
 *       200:
 *         description: Orden actualizada correctamente
 *       400:
 *         description: Error de validación
 */
router.put('/',
    query('numero_orden').notEmpty().withMessage('El número de orden es obligatorio').isLength({ min: 5, max: 20 }).withMessage('El número de orden debe tener entre 5 y 20 caracteres'),
    body('fecha_emision').isDate().withMessage('La fecha de emisión debe ser una fecha válida'),
    body('fecha_entrega_esperada').isDate().withMessage('La fecha de entrega esperada debe ser una fecha válida'),
    body('estado').notEmpty().withMessage('El estado es obligatorio').isIn(['pendiente', 'parcial', 'completada', 'cancelada']).withMessage('El estado debe ser uno de: pendiente, parcial, completada, cancelada'),
    body('proveedor_id').notEmpty().withMessage('El ID del proveedor es obligatorio'),
    body('subtotal').isDecimal().withMessage('El subtotal debe ser un número decimal').notEmpty().withMessage('El subtotal debe tener un valor'),
    body('iva').isDecimal().withMessage('El IVA debe ser un número decimal').notEmpty().withMessage('El IVA debe tener un valor'),
    body('total').isDecimal().withMessage('El total debe ser un número decimal').notEmpty().withMessage('El total debe tener un valor'),
    body('observaciones').optional().isString().withMessage('Las observaciones deben ser una cadena de texto'),
    controlador.editar
);

/**
 * @swagger
 * /ordenCompra:
 *   delete:
 *     summary: Elimina una orden de compra por su número
 *     tags: [Ordenes de Compra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero_orden
 *             properties:
 *               numero_orden:
 *                 type: string
 *                 description: Número de la orden de compra
 *     responses:
 *       200:
 *         description: Orden eliminada exitosamente
 *       400:
 *         description: Error de validación
 */
router.delete('/',
    body('numero_orden').notEmpty().withMessage('El número de orden es obligatorio').isLength({ min: 5, max: 20 }).withMessage('El número de orden debe tener entre 5 y 20 caracteres'),
    controlador.eliminar
);

module.exports = router;
