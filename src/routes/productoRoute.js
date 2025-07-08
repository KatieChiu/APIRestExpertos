
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { body, param } = require('express-validator');
const  Producto  = require('../models/producto'); // Asegúrate de importar tu modelo

router.post('/crear',
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
        .isLength({ max: 100, min: 3}).withMessage('El nombre del producto debe tener entre 3 y 100 caracteres'),
    body('precio_venta')
        .notEmpty().withMessage('El precio de venta es obligatorio')
        .isFloat().withMessage('El precio de venta debe ser un número entero o decimal'),
    body('precio_compra')
        .notEmpty().withMessage('El precio de compra es obligatorio')
        .isFloat().withMessage('El precio de compra debe ser un número entero o decimal'),
    body('categoria_id')
        .notEmpty().withMessage('La categoría es obligatoria')
        .isLength({ min: 3 }).withMessage('El ID de categoría debe tener al menos 3 caracteres'),

    productoController.crearProducto);


router.get('/listar', productoController.obtenerProductos);
router.get('/:codigo', productoController.obtenerProductoPorId);

router.put('/:codigo', 
   
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



router.delete('/:codigo',
    param('codigo')
        .notEmpty().withMessage('El código es obligatorio')
        .isLength({ max: 20, min: 5 }).withMessage('El código debe tener entre 5 y 20 caracteres'),
    productoController.eliminarProductoPorCodigo
);

module.exports = router;