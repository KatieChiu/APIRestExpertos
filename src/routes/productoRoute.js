const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { body, param } = require('express-validator');
const Producto = require('../models/producto'); // Asegúrate de importar tu modelo
const { uploadImagenProducto } = require('../configuration/archivosProductos');
/**
 * @swagger
 * tags:
 *   - name: Productos
 *     description: Operaciones relacionadas con productos
 */

/**
 * @swagger
 * /producto/crear:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - nombre
 *               - precio_venta
 *               - precio_compra
 *               - categoria_id
 *             properties:
 *               codigo:
 *                 type: string
 *                 description: Código único del producto
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto
 *               precio_venta:
 *                 type: number
 *                 format: float
 *               precio_compra:
 *                 type: number
 *                 format: float
 *               categoria_id:
 *                 type: string
 *                 description: ID de la categoría
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error de validación
 */
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
    body('categoria_id')
        .notEmpty().withMessage('La categoría es obligatoria')
        .isLength({ min: 3 }).withMessage('El ID de categoría debe tener al menos 3 caracteres'),
    productoController.crearProducto
);

/**
 * @swagger
 * /producto/listar:
 *   get:
 *     summary: Lista todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/listar', productoController.obtenerProductos);

/**
 * @swagger
 * /producto/{codigo}:
 *   get:
 *     summary: Obtiene un producto por su código
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del producto
 *     responses:
 *       200:
 *         description: Detalle del producto
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:codigo', productoController.obtenerProductoPorId);

/**
 * @swagger
 * /producto/{codigo}:
 *   put:
 *     summary: Actualiza un producto por su código
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio_venta:
 *                 type: number
 *                 format: float
 *               precio_compra:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       400:
 *         description: Error de validación
 */
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

/**
 * @swagger
 * /producto/{codigo}:
 *   delete:
 *     summary: Elimina un producto por su código
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:codigo',
    param('codigo')
        .notEmpty().withMessage('El código es obligatorio')
        .isLength({ max: 20, min: 5 }).withMessage('El código debe tener entre 5 y 20 caracteres'),
    productoController.eliminarProductoPorCodigo
);

/**
 * @swagger
 * /producto/{codigo}/imagen:
 *   put:
 *     summary: Sube o actualiza la imagen de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del producto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen subida/actualizada correctamente
 *       400:
 *         description: Error al subir la imagen
 */
router.put('/:codigo/imagen',
    uploadImagenProducto.single('imagen'),
    productoController.actualizarImagenProducto
);

/**
 * @swagger
 * /producto/{codigo}/imagen:
 *   delete:
 *     summary: Elimina la imagen de un producto por su código
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del producto
 *     responses:
 *       200:
 *         description: Imagen eliminada correctamente
 *       404:
 *         description: Producto o imagen no encontrada
 */
router.delete('/:codigo/imagen', productoController.eliminarImagenProducto);

module.exports = router;
