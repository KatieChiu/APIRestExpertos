const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { body, param } = require('express-validator');
const Producto = require('../models/producto');
const { uploadImagenProducto } = require('../configuration/archivosProductos');

// Crear producto
router.post('/crear',
    uploadImagenProducto.single('imagen'),
    body('codigo')
        .notEmpty().withMessage('El código es obligatorio')
        .isLength({ max: 20, min: 5 }).withMessage('El código debe tener entre 5 y 20 caracteres')
        .custom(async (codigo) => {
            const productoExistente = await Producto.findOne({ where: { codigo } });
            if (productoExistente) {
                throw new Error('Ese código ya existe');
            }
            return true;
        }),
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100, min: 3 }).withMessage('El nombre del producto debe tener entre 3 y 100 caracteres'),
    body('precio_venta')
        .notEmpty().withMessage('El precio de venta es obligatorio')
        .isFloat().withMessage('El precio de venta debe ser un número entero o decimal'),
    body('precio_compra')
        .notEmpty().withMessage('El precio de compra es obligatorio')
        .isFloat().withMessage('El precio de compra debe ser un número entero o decimal'),
    productoController.crearProducto
);

// Listar productos
router.get('/listar', productoController.obtenerProductos);

// Obtener producto por ID
router.get('/:id', productoController.obtenerProductoPorId);

// Actualizar producto
router.put('/:id',
    body('codigo')
        .optional()
        .notEmpty().withMessage('El código es obligatorio si se proporciona')
        .isLength({ max: 20, min: 5 }).withMessage('El código debe tener entre 5 y 20 caracteres'),
    body('nombre')
        .optional()
        .notEmpty().withMessage('El nombre es obligatorio si se proporciona')
        .isLength({ max: 100, min: 3 }).withMessage('El nombre del producto debe tener entre 3 y 100 caracteres'),
    body('precio_venta')
        .optional()
        .notEmpty().withMessage('El precio de venta es obligatorio si se proporciona')
        .isFloat().withMessage('El precio de venta debe ser un número entero o decimal'),
    body('precio_compra')
        .optional()
        .notEmpty().withMessage('El precio de compra es obligatorio si se proporciona')
        .isFloat().withMessage('El precio de compra debe ser un número entero o decimal'),
    productoController.actualizarProducto
);

// Eliminar producto por código
router.delete('/:codigo',
    param('codigo')
        .notEmpty().withMessage('El código es obligatorio')
        .isLength({ max: 20, min: 5 }).withMessage('El código debe tener entre 5 y 20 caracteres'),
    productoController.eliminarProductoPorCodigo
);

// Subir o actualizar imagen de producto (cambiar POST por PUT)
router.put('/:codigo/imagen',
    uploadImagenProducto.single('imagen'),
    productoController.actualizarImagenProducto
);

// Eliminar imagen de producto
router.delete('/:codigo/imagen', productoController.eliminarImagenProducto);


module.exports = router;
