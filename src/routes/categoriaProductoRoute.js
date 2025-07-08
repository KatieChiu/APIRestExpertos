
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaProductoController');
const { body, param } = require('express-validator'); 

// POST /categoria/crear
router.post('/crear',
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100, min: 3 }).withMessage('El nombre del producto debe tener entre 3 y 100 caracteres'),
    categoriaController.crearCategoria
);

// GET /categoria/listar
router.get('/listar', categoriaController.obtenerCategorias);

// GET /categoria/:id
router.get('/:id', categoriaController.obtenerCategoriaPorId);

// PUT /categoria/:id
router.put('/:id',
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100, min: 3 }).withMessage('El nombre del producto debe tener entre 3 y 100 caracteres'),
    categoriaController.actualizarCategoria
);

// DELETE /categoria/:categoria_id
router.delete('/:categoria_id',
    param('categoria_id')
        .notEmpty().withMessage('La categoria_id es obligatoria')
        .isLength({ max: 20, min: 5 }).withMessage('El código debe tener entre 5 y 20 caracteres'),
    categoriaController.eliminarCategoria
);

module.exports = router;