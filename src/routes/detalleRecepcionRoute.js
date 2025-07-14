const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const controlador = require('../controllers/detalleRecepcionController');

/**
 * @swagger
 * tags:
 *   - name: DetalleRecepcion
 *     description: Operaciones relacionadas con el detalle de recepción de órdenes
 */

/**
 * @swagger
 * /Recepcion/:
 *   get:
 *     summary: Obtiene la lista de detalles de recepción
 *     tags: [DetalleRecepcion]
 *     responses:
 *       200:
 *         description: Lista de detalles de recepción
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numero_orden:
 *                     type: string
 *                     description: Número de orden
 *                   codigo_producto:
 *                     type: string
 *                     description: Código del producto recibido
 *                   cantidad_recibida:
 *                     type: integer
 *                     description: Cantidad recibida
 *                   fecha_recepcion:
 *                     type: string
 *                     format: date
 *                     description: Fecha de recepción
 */

/**
 * @swagger
 * /Recepcion/:
 *   post:
 *     summary: Registra un detalle de recepción para una orden
 *     tags: [DetalleRecepcion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero_orden
 *               - recepciones
 *             properties:
 *               numero_orden:
 *                 type: string
 *                 description: Número de orden asociado a la recepción
 *               recepciones:
 *                 type: array
 *                 description: Lista de productos recibidos
 *                 items:
 *                   type: object
 *                   required:
 *                     - codigo_producto
 *                     - cantidad_recibida
 *                     - fecha_recepcion
 *                   properties:
 *                     codigo_producto:
 *                       type: string
 *                       description: Código del producto recibido
 *                     cantidad_recibida:
 *                       type: integer
 *                       minimum: 1
 *                       description: Cantidad recibida (mínimo 1)
 *                     fecha_recepcion:
 *                       type: string
 *                       format: date
 *                       description: Fecha en la que se recibió el producto
 *     responses:
 *       201:
 *         description: Detalle de recepción registrado correctamente
 *       400:
 *         description: Error de validación en los datos enviados
 */

router.get('/', controlador.listar);

router.post('/',
  body('numero_orden').notEmpty().withMessage('Número de orden obligatorio'),
  body('recepciones.*.codigo_producto').notEmpty().withMessage('El código del producto es obligatorio'),
  body('recepciones.*.cantidad_recibida').isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1'),
  body('recepciones.*.fecha_recepcion').isDate().withMessage('La fecha de emisión debe ser una fecha válida'),
  controlador.guardar
);

module.exports = router;

