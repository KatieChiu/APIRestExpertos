const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaProductoController');
const { body, param } = require('express-validator');

/**
 * @swagger
 * /categoria/crear:
 *   post:
 *     summary: Crea una nueva categoría de producto
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 description: Nombre de la categoría
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/crear',
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100, min: 3 }).withMessage('El nombre del producto debe tener entre 3 y 100 caracteres'),
    categoriaController.crearCategoria
);

/**
 * @swagger
 * /categoria/listar:
 *   get:
 *     summary: Obtiene la lista de categorías
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 */
router.get('/listar', categoriaController.obtenerCategorias);

/**
 * @swagger
 * /categoria/{id}:
 *   get:
 *     summary: Obtiene una categoría por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Datos de la categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/:id', categoriaController.obtenerCategoriaPorId);

/**
 * @swagger
 * /categoria/{id}:
 *   put:
 *     summary: Actualiza una categoría existente
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 description: Nuevo nombre de la categoría
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Categoría no encontrada
 */
router.put('/:id',
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100, min: 3 }).withMessage('El nombre del producto debe tener entre 3 y 100 caracteres'),
    categoriaController.actualizarCategoria
);

/**
 * @swagger
 * /categoria/{categoria_id}:
 *   delete:
 *     summary: Elimina una categoría por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: categoria_id
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 5
 *           maxLength: 20
 *         description: ID de la categoría a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Categoría no encontrada
 */
router.delete('/:categoria_id',
    param('categoria_id')
        .notEmpty().withMessage('La categoria_id es obligatoria')
        .isLength({ max: 20, min: 5 }).withMessage('El código debe tener entre 5 y 20 caracteres'),
    categoriaController.eliminarCategoria
);

module.exports = router;
