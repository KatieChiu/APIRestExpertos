const express = require('express');
const { body, query, param } = require('express-validator');
const router = express.Router();
const controlador = require('../controllers/ventaController');

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
 *               - subtotal
 *               - iva
 *               - total
 *               - estado
 *               - tipo_pago
 *             properties:
 *               numero_factura:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 20
 *               fecha:
 *                 type: string
 *                 format: date
 *               subtotal:
 *                 type: number
 *                 format: float
 *               iva:
 *                 type: number
 *                 format: float
 *               descuento:
 *                 type: number
 *                 format: float
 *               total:
 *                 type: number
 *                 format: float
 *               estado:
 *                 type: string
 *                 enum: [completada, cancelada]
 *               tipo_pago:
 *                 type: string
 *                 enum: [efectivo, tarjeta, transferencia, mixto]
 *               observaciones:
 *                 type: string
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/',
    body('numero_factura').notEmpty().withMessage('El número de venta es obligatorio').isLength({ min: 5, max: 20 }).withMessage('El número de venta debe tener entre 5 y 20 caracteres'),
    body('fecha').isDate().withMessage('La fecha debe ser una fecha válida'),
    body('subtotal').isDecimal().withMessage('El subtotal debe ser un número decimal').notEmpty().withMessage('El subtotal debe tener un valor'),
    body('iva').isDecimal().withMessage('El IVA debe ser un número decimal').notEmpty().withMessage('El IVA debe tener un valor'),
    body('descuento').optional().isDecimal().withMessage('El descuento debe ser un número decimal'),
    body('total').isDecimal().withMessage('El total debe ser un número decimal').notEmpty().withMessage('El total debe tener un valor'),
    body('estado').notEmpty().withMessage('El estado es obligatorio').isIn(['completada', 'cancelada']).withMessage('El estado debe ser uno de: completada, cancelada'),
    body('tipo_pago').notEmpty().withMessage('El tipo de pago es obligatorio').isIn(['efectivo', 'tarjeta', 'transferencia', 'mixto']).withMessage('El tipo de pago debe ser uno de: efectivo, tarjeta, transferencia, mixto'),
    body('observaciones').optional().isString().withMessage('Las observaciones deben ser una cadena de texto'),
    controlador.guardar
);

/**
 * @swagger
 * /venta:
 *   put:
 *     summary: Edita una venta existente
 *     tags: [Ventas]
 *     parameters:
 *       - in: query
 *         name: numero_factura
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 5
 *           maxLength: 20
 *         description: Número de la factura a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - subtotal
 *               - iva
 *               - total
 *               - estado
 *               - tipo_pago
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               subtotal:
 *                 type: number
 *                 format: float
 *               iva:
 *                 type: number
 *                 format: float
 *               descuento:
 *                 type: number
 *                 format: float
 *               total:
 *                 type: number
 *                 format: float
 *               estado:
 *                 type: string
 *                 enum: [completada, cancelada]
 *               tipo_pago:
 *                 type: string
 *                 enum: [efectivo, tarjeta, transferencia, mixto]
 *               observaciones:
 *                 type: string
 *     responses:
 *       200:
 *         description: Venta actualizada exitosamente
 *       400:
 *         description: Error de validación
 */
router.put('/',
    query('numero_factura').notEmpty().withMessage('El número de venta es obligatorio').isLength({ min: 5, max: 20 }).withMessage('El número de venta debe tener entre 5 y 20 caracteres'),
    body('fecha').isDate().withMessage('La fecha debe ser una fecha válida'),
    body('subtotal').isDecimal().withMessage('El subtotal debe ser un número decimal').notEmpty().withMessage('El subtotal debe tener un valor'),
    body('iva').isDecimal().withMessage('El IVA debe ser un número decimal').notEmpty().withMessage('El IVA debe tener un valor'),
    body('descuento').optional().isDecimal().withMessage('El descuento debe ser un número decimal'),
    body('total').isDecimal().withMessage('El total debe ser un número decimal').notEmpty().withMessage('El total debe tener un valor'),
    body('estado').notEmpty().withMessage('El estado es obligatorio').isIn(['completada', 'cancelada']).withMessage('El estado debe ser uno de: completada, cancelada'),
    body('tipo_pago').notEmpty().withMessage('El tipo de pago es obligatorio').isIn(['efectivo', 'tarjeta', 'transferencia', 'mixto']).withMessage('El tipo de pago debe ser uno de: efectivo, tarjeta, transferencia, mixto'),
    body('observaciones').optional().isString().withMessage('Las observaciones deben ser una cadena de texto'),
    controlador.editar
);

/**
 * @swagger
 * /venta/{numero_factura}:
 *   delete:
 *     summary: Elimina una venta por su número de factura
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: numero_venta
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
router.delete('/:numero_venta',
    param('numero_venta').notEmpty().withMessage('El número de venta es obligatorio').isLength({ min: 5, max: 20 }).withMessage('El número de venta debe tener entre 5 y 20 caracteres'),
    controlador.eliminar
);

module.exports = router;
