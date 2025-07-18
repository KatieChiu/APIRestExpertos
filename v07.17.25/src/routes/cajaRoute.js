const express = require('express');
const router = express.Router();
const { obtenerSaldoCaja } = require('../controllers/cajaController');

/**
 * @swagger
 * /saldo:
 *   get:
 *     summary: Obtiene el saldo actual de caja con ingresos y egresos desde la configuración
 *     tags: [Caja]
 *     responses:
 *       200:
 *         description: Información del saldo de caja
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha_config:
 *                   type: string
 *                   format: date
 *                   description: Fecha de la configuración inicial de caja
 *                 saldo_inicial:
 *                   type: number
 *                   format: float
 *                   description: Saldo inicial configurado
 *                 total_ingresos:
 *                   type: number
 *                   format: float
 *                   description: Suma total de ingresos desde la fecha de configuración
 *                 total_egresos:
 *                   type: number
 *                   format: float
 *                   description: Suma total de egresos desde la fecha de configuración
 *                 saldo_actual:
 *                   type: number
 *                   format: float
 *                   description: Saldo actual calculado (inicial + ingresos - egresos)
 *       500:
 *         description: Error al obtener el saldo de caja
 */

router.get('/', obtenerSaldoCaja);

module.exports = router;
