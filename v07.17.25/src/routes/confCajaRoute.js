const express = require('express');
const router = express.Router();
const controlador = require('../controllers/confCajaController');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   - name: ConfiguracionCaja
 *     description: Operaciones relacionadas con la configuración de caja
 */

/**
 * @swagger
 * /confCaja:
 *   get:
 *     summary: Obtiene la configuración de caja actual
 *     tags: [ConfiguracionCaja]
 *     responses:
 *       200:
 *         description: Configuración de caja encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 caja_id:
 *                   type: integer
 *                   description: ID de la configuración
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   description: Fecha de la configuración
 *                 saldo_inicial:
 *                   type: number
 *                   format: decimal
 *                   description: Saldo inicial de la caja
 */

/**
 * @swagger
 * /confCaja:
 *   post:
 *     summary: Guarda una nueva configuración de caja
 *     tags: [ConfiguracionCaja]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - saldo_inicial
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la configuración
 *               saldo_inicial:
 *                 type: number
 *                 format: decimal
 *                 description: Saldo inicial a configurar
 *     responses:
 *       201:
 *         description: Configuración guardada exitosamente
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /confCaja:
 *   delete:
 *     summary: Elimina una configuración de caja por ID
 *     tags: [ConfiguracionCaja]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - caja_id
 *             properties:
 *               caja_id:
 *                 type: integer
 *                 description: ID de la configuración a eliminar
 *     responses:
 *       200:
 *         description: Configuración eliminada exitosamente
 *       400:
 *         description: Error de validación
 */

router.get('/', controlador.listar);

router.post('/',
    body('fecha')
        .isDate().withMessage('La fecha debe ser una fecha válida'),
    body('saldo_inicial')
        .notEmpty().withMessage('El saldo inicial es obligatorio')
        .isDecimal().withMessage('El saldo inicial debe ser un número decimal'),
    controlador.guardar);

router.delete('/',
    body('caja_id')
        .notEmpty().withMessage('El ID de la configuración es obligatorio')
        .isInt().withMessage('El ID de la configuración debe ser un número entero'),
    controlador.eliminar);

module.exports = router;
