const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const controlador = require('../controllers/proveedorController');

/**
 * @swagger
 * tags:
 *   - name: Proveedores
 *     description: Operaciones relacionadas con los proveedores
 */

/**
 * @swagger
 * /proveedor:
 *   get:
 *     summary: Lista todos los proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del proveedor
 *                   nombre:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   email:
 *                     type: string
 *                 
 */
router.get('/', controlador.listar);

/**
 * @swagger
 * /proveedor:
 *   post:
 *     summary: Crea un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - telefono
 *             properties:
 *               nombre:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *               telefono:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 15
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: Proveedor creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/',
    body('nombre').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body('telefono').notEmpty().withMessage('El teléfono es obligatorio').isLength({ min: 8, max: 15 }).withMessage('El teléfono debe tener entre 8 y 15 caracteres'),
    controlador.guardar
);

/**
 * @swagger
 * /proveedor/{proveedor_id}:
 *   put:
 *     summary: Edita un proveedor existente
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: proveedor_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - telefono
 *             properties:
 *               nombre:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *               telefono:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 15
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Proveedor actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Proveedor no encontrado
 *       409:
 *         description: Email ya existe en otro proveedor
 */
router.put('/:proveedor_id',
    require('express-validator').param('proveedor_id').notEmpty().withMessage('El ID del proveedor es obligatorio').isInt().withMessage('El ID del proveedor debe ser un número entero'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body('telefono').notEmpty().withMessage('El teléfono es obligatorio').isLength({ min: 8, max: 15 }).withMessage('El teléfono debe tener entre 8 y 15 caracteres'),
    body('email').optional().isEmail().withMessage('Debe ser un email válido'),
    controlador.editar
);

/**
 * @swagger
 * /proveedor/{proveedor_id}:
 *   delete:
 *     summary: Elimina un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: proveedor_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor a eliminar
 *     responses:
 *       200:
 *         description: Proveedor eliminado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Proveedor no encontrado
 */
router.delete('/:proveedor_id',
    require('express-validator').param('proveedor_id').notEmpty().withMessage('El ID del proveedor es obligatorio').isInt().withMessage('El ID del proveedor debe ser un número entero'),
    controlador.eliminar
);

module.exports = router;
