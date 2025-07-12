
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { body, param } = require('express-validator'); 


router.post('/',
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100, min: 3 }).withMessage('El nombre del producto debe tener entre 3 y 100 caracteres'),
    clienteController.guardar
);
router.get('/', clienteController.listar);
router.delete('/:id',
    param('id')
        .notEmpty().withMessage( 'No de identidad o pasaporte es obligatorio')
        .isLength({ max: 13 }).withMessage('El número de identificación debe tener entre 1 y 13 caracteres'),
    clienteController.eliminar
);

module.exports = router;