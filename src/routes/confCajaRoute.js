const express = require('express');
const router = express.Router();
const controlador = require('../controllers/confCajaController');
const { body } = require('express-validator');

// Obtener la configuración
router.get('/', controlador.listar);

// guardar la configuración
router.post('/',
    body('fecha')
        .isDate().withMessage('La fecha debe ser una fecha válida'), 
    body('saldo_inicial')
        .notEmpty().withMessage('El saldo inicial es obligatorio')
        .isDecimal().withMessage('El saldo inicial debe ser un número decimal'),
    controlador.guardar);

//Eliminar la configuración
router.delete('/',
    body('caja_id')
        .notEmpty().withMessage('El ID de la configuración es obligatorio')
        .isInt().withMessage('El ID de la configuración debe ser un número entero'), 
    controlador.eliminar);


module.exports = router;