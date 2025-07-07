const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaProductoController');
const { body, param } = require('express-validator'); 

// POST /api/categorias/crear
router.post('/crear',
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100, min: 3 }).withMessage('El nombre del producto debe tener entre 3 y 100 caracteres'),
    categoriaController.crearCategoria
);

// GET /api/categorias/listar
router.get('/listar', categoriaController.obtenerCategorias);

// GET /api/categorias/:id
router.get('/:id', categoriaController.obtenerCategoriaPorId);

// PUT /api/categorias/:id
router.put('/:id',
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100, min: 3 }).withMessage('El nombre del producto debe tener entre 3 y 100 caracteres'),
    categoriaController.actualizarCategoria
);

// DELETE /api/categorias/:categoria_id
router.delete('/:categoria_id',
    param('categoria_id')
        .notEmpty().withMessage('La categoria_id es obligatoria')
        .isLength({ max: 20, min: 5 }).withMessage('El código debe tener entre 5 y 20 caracteres'),
    categoriaController.eliminarCategoria
);

module.exports = router;
