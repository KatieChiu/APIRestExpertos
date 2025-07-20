
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { body, param } = require('express-validator'); 


router.post('/',
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100, min: 3 }).withMessage('El nombre del producto debe tener entre 3 y 100 caracteres'),
    clienteController.guardar
);
router.get('/', clienteController.listar);
router.delete('/:id',
    param('id')
        .notEmpty().withMessage( 'No de identidad o pasaporte es obligatorio')
        .isLength({ max: 13 }).withMessage('El número de identificación debe tener entre 1 y 13 caracteres'),
    clienteController.eliminar
);



/**
 * @swagger
 * tags:
 *   - name: Clientes
 *     description: Operaciones relacionadas con clientes
 */

/**
 * @swagger
 * /cliente:
 *   get:
 *     summary: Obtiene la lista de todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Número de identificación (Cédula)
 *                   nombre:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   direccion:
 *                     type: string
 */

/**
 * @swagger
 * /cliente:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - nombre
 *               - email
 *             properties:
 *               id:
 *                 type: string
 *                 maxLength: 13
 *                 description: Número de identificación (Cédula)
 *               nombre:
 *                 type: string
 *                 maxLength: 100
 *               email:
 *                 type: string
 *                 format: email
 *               telefono:
 *                 type: string
 *                 maxLength: 15
 *               direccion:
 *                 type: string
 *                 maxLength: 255
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /cliente:
 *   put:
 *     summary: Actualiza un cliente existente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 maxLength: 13
 *               nombre:
 *                 type: string
 *                 maxLength: 100
 *               email:
 *                 type: string
 *                 format: email
 *               telefono:
 *                 type: string
 *                 maxLength: 15
 *               direccion:
 *                 type: string
 *                 maxLength: 255
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /cliente/{id}:
 *   delete:
 *     summary: Elimina un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 13
 *         description: Número de identificación del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       400:
 *         description: Error de validación
 */

router.post('/',
    body('id')
        .notEmpty().withMessage('El número de identificación es obligatorio')
        .isLength({ max: 13 }).withMessage('El número de identificación debe tener máximo 13 caracteres'),
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100, min: 3 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email válido'),
    body('telefono')
        .optional()
        .matches(/^[0-9]+$/).withMessage('El teléfono solo debe contener números')
        .isLength({ max: 15 }).withMessage('El teléfono debe tener máximo 15 caracteres'),
    body('direccion')
        .optional()
        .isLength({ max: 255 }).withMessage('La dirección debe tener máximo 255 caracteres'),
    clienteController.guardar
);

router.put('/',
    body('id')
        .notEmpty().withMessage('El número de identificación es obligatorio')
        .isLength({ max: 13 }).withMessage('El número de identificación debe tener máximo 13 caracteres'),
    body('nombre')
        .optional()
        .notEmpty().withMessage('El nombre no puede estar vacío si se proporciona')
        .isLength({ max: 100, min: 3 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    body('email')
        .optional()
        .notEmpty().withMessage('El email no puede estar vacío si se proporciona')
        .isEmail().withMessage('Debe ser un email válido'),
    body('telefono')
        .optional()
        .matches(/^[0-9]+$/).withMessage('El teléfono solo debe contener números')
        .isLength({ max: 15 }).withMessage('El teléfono debe tener máximo 15 caracteres'),
    body('direccion')
        .optional()
        .isLength({ max: 255 }).withMessage('La dirección debe tener máximo 255 caracteres'),
    clienteController.editar
);

router.get('/', clienteController.listar);

router.delete('/:id',
    param('id')
        .notEmpty().withMessage('No de identidad o pasaporte es obligatorio')
        .isLength({ max: 13 }).withMessage('El número de identificación debe tener máximo 13 caracteres'),
    clienteController.eliminar
);

module.exports = router;
