const express = require('express');
const { body, query, param } = require('express-validator');
const router = express.Router();
const controlador = require('../controllers/ventaController');
const verifyToken = require('../middlewares/verifyToken');

// Aplicar el middleware aquí
router.post('/', verifyToken, controlador.guardar);
/**
 * @swagger
 * tags:
 *   - name: Ventas
 *     description: Operaciones relacionadas con las ventas
 */

/**
 * @swagger
 * /venta:
 *   get:
 *     summary: Obtiene la lista de ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numero_factura:
 *                     type: string
 *                     description: Número de factura
 *                   fecha:
 *                     type: string
 *                     format: date
 *                   subtotal:
 *                     type: number
 *                     format: float
 *                   iva:
 *                     type: number
 *                     format: float
 *                   descuento:
 *                     type: number
 *                     format: float
 *                   total:
 *                     type: number
 *                     format: float
 *                   estado:
 *                     type: string
 *                     enum: [completada, cancelada]
 *                   tipo_pago:
 *                     type: string
 *                     enum: [efectivo, tarjeta, transferencia, mixto]
 *                   observaciones:
 *                     type: string
 */
router.get('/', controlador.listar);

/**
 * @swagger
 * /venta:
 *   post:
 *     summary: Crea una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero_factura
 *               - fecha
 *               - descuento
 *               - estado
 *               - tipo_pago
 *               - detalles
 *             properties:
 *               numero_factura:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               descuento:
 *                 type: number
 *               estado:
 *                 type: string
 *                 enum: [completada, cancelada]
 *               tipo_pago:
 *                 type: string
 *                 enum: [efectivo, tarjeta, transferencia, mixto]
 *               observaciones:
 *                 type: string
 *               detalles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - codigo_producto
 *                     - cantidad
 *                   properties:
 *                     codigo_producto:
 *                       type: string
 *                     cantidad:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 *       400:
 *         description: Error de validación
 */

router.post('/',
    body('numero_factura').notEmpty().withMessage('El número de venta es obligatorio').isLength({ min: 5, max: 20 }).withMessage('El número de venta debe tener entre 5 y 20 caracteres'),
    body('fecha').isDate().withMessage('La fecha debe ser una fecha válida'),
    body('descuento').optional().isDecimal().withMessage('El descuento debe ser un número decimal'),
    body('estado').notEmpty().withMessage('El estado es obligatorio').isIn(['completada', 'cancelada']).withMessage('El estado debe ser uno de: completada, cancelada'),
    body('tipo_pago').notEmpty().withMessage('El tipo de pago es obligatorio').isIn(['efectivo', 'tarjeta', 'transferencia', 'mixto']).withMessage('El tipo de pago debe ser uno de: efectivo, tarjeta, transferencia, mixto'),
    body('observaciones').optional().isString().withMessage('Las observaciones deben ser una cadena de texto'),
    controlador.guardar
);




/**
 * @swagger
 * /venta/{numero_factura}:
 *   delete:
 *     summary: Elimina una venta por su número de factura
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: numero_factura
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 5
 *           maxLength: 20
 *         description: Número de factura a eliminar
 *     responses:
 *       200:
 *         description: Venta eliminada exitosamente
 *       400:
 *         description: Error de validación
 */
router.delete('/:numero_factura',
    param('numero_factura').notEmpty().withMessage('El número de venta es obligatorio').isLength({ min: 5, max: 20 }).withMessage('El número de venta debe tener entre 5 y 20 caracteres'),
    controlador.eliminar
);

module.exports = router;
