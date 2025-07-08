const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const controlador = require('../controllers/proveedorController');

router.get('/', controlador.listar);

router.post('/',
    body('nombre').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body('telefono').notEmpty().withMessage('El teléfono es obligatorio').isLength({ min: 8, max: 15 }).withMessage('El teléfono debe tener entre 8 y 15 caracteres'),
    controlador.guardar
);

router.put('/',
    query('proveedor_id').notEmpty().withMessage('El ID del proveedor es obligatorio').isInt().withMessage('El ID del proveedor debe ser un número entero'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body('telefono').notEmpty().withMessage('El teléfono es obligatorio').isLength({ min: 8, max: 15 }).withMessage('El teléfono debe tener entre 8 y 15 caracteres'),
    controlador.editar
);

router.delete('/',
    body('proveedor_id').notEmpty().withMessage('El ID del proveedor es obligatorio').isInt().withMessage('El ID del proveedor debe ser un número entero'),
    controlador.eliminar
);

module.exports = router;
