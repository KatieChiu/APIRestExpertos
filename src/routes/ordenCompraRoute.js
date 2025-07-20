const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const controlador = require('../controllers/ordenCompraController');
const detalleControlador = require('../controllers/ordenDetalleController');

const verifyToken = require('../middlewares/verifyToken');
const ordenCompraController = require('../controllers/ordenCompraController');

router.post('/', verifyToken, ordenCompraController.guardar);



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
 *               - detalles
 *             properties:
 *               numero_orden:
 *                 type: integer
 *               fecha_emision:
 *                 type: string
 *                 format: date
 *               fecha_entrega_esperada:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *               proveedor_id:
 *                 type: string
 *               observaciones:
 *                 type: string
 *               detalles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - codigo_producto
 *                     - cantidad
 *                     - precio_unitario
 *                   properties:
 *                     codigo_producto:
 *                       type: string
 *                     cantidad:
 *                       type: integer
 *                     precio_unitario:
 *                       type: number
 *     responses:
 *       201:
 *         description: Orden creada correctamente
 *       400:
 *         description: Error en los datos proporcionados
 */

router.post('/',
    body('numero_orden').notEmpty().withMessage('El número de orden es obligatorio').isLength({ min: 5, max: 20 }).withMessage('El número de orden debe tener entre 5 y 20 caracteres'),
    body('fecha_emision').isDate().withMessage('La fecha de emisión debe ser una fecha válida'),
    body('fecha_entrega_esperada').isDate().withMessage('La fecha de entrega esperada debe ser una fecha válida'),
    body('estado').notEmpty().withMessage('El estado es obligatorio').isIn(['pendiente', 'parcial', 'completada', 'cancelada']).withMessage('El estado debe ser uno de: pendiente, parcial, completada, cancelada'),
    body('proveedor_id').notEmpty().withMessage('El ID del proveedor es obligatorio'),
    body('observaciones').optional().isString().withMessage('Las observaciones deben ser una cadena de texto'),
    controlador.guardar
);

/**
 * @swagger
 * /ordenCompra:
 *   put:
 *     summary: Actualiza una orden de compra existente junto con sus detalles
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
 *               - detalles
 *             properties:
 *               numero_orden:
 *                 type: integer
 *               fecha_emision:
 *                 type: string
 *                 format: date
 *               fecha_entrega_esperada:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *               proveedor_id:
 *                 type: string
 *               subtotal:
 *                 type: number
 *               iva:
 *                 type: number
 *               total:
 *                 type: number
 *               observaciones:
 *                 type: string
 *               detalles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - codigo_producto
 *                     - cantidad
 *                     - precio_unitario
 *                   properties:
 *                     codigo_producto:
 *                       type: string
 *                     cantidad:
 *                       type: integer
 *                     precio_unitario:
 *                       type: number
 *     responses:
 *       200:
 *         description: Orden actualizada correctamente
 *       400:
 *         description: Error en los datos proporcionados
 *       404:
 *         description: Orden no encontrada
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
