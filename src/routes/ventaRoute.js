const express = require('express');
const { body, query, param } = require('express-validator');
const router = express.Router();
const controlador = require('../controllers/ventaController');

router.get('/', controlador.listar);

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

router.delete('/:numero_venta',
    param('numero_venta').notEmpty().withMessage('El número de venta es obligatorio').isLength({ min: 5, max: 20 }).withMessage('El número de venta debe tener entre 5 y 20 caracteres'),
    controlador.eliminar
);

module.exports = router;
