
const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const controlador = require('../controllers/ordenCompraController');
const detalleControlador = require('../controllers/ordenDetalleController');

router.get('/', controlador.listar);

router.post('/',
    body('numero_orden').notEmpty().withMessage('El número de orden es obligatorio').isLength({ min: 5, max: 20 }).withMessage('El número de orden debe tern entre 5 y 20 caracteres'),
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

router.put('/',
    query('numero_orden').notEmpty().withMessage('El número de orden es obligatorio').isLength({ min: 5, max: 20 }).withMessage('El número de orden debe tern entre 5 y 20 caracteres'),
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

router.delete('/',
     body('numero_orden').notEmpty().withMessage('El número de orden es obligatorio').isLength({ min: 5, max: 20 }).withMessage('El número de orden debe tern entre 5 y 20 caracteres'),
    controlador.eliminar);

module.exports = router;