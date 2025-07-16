const express = require('express');
const router = express.Router();
const {
    createPersona,
    updatePersona,
    getAllPersonas,
    getPersonaById,
    deletePersona
} = require('../controllers/persona');

const { 
    validateCreatePerson,
    validateUpdatePerson
} = require('../validators/personValidator');

const { handleValidationErrors } = require('../middlewares/validationMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Personas
 *     description: Operaciones relacionadas con la gestión de personas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Persona:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Número de identificación (Cédula)
 *         nombre:
 *           type: string
 *           description: Nombre de la persona
 *         apellido:
 *           type: string
 *           description: Apellido de la persona
 *         telefono:
 *           type: string
 *           description: Número de teléfono
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico
 *         direccion:
 *           type: string
 *           description: Dirección física
 *         fecha_nacimiento:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento
 */

/**
 * @swagger
 * /persona:
 *   post:
 *     summary: Crea una nueva persona
 *     tags: [Personas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - nombre
 *               - apellido
 *             properties:
 *               id:
 *                 type: string
 *                 description: Número de identificación
 *               nombre:
 *                 type: string
 *                 description: Nombre de la persona
 *               apellido:
 *                 type: string
 *                 description: Apellido de la persona
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico
 *               direccion:
 *                 type: string
 *                 description: Dirección física
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento
 *     responses:
 *       201:
 *         description: Persona creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Persona'
 *       400:
 *         description: Error de validación
 *       409:
 *         description: Persona ya existe
 */

router.post('/', validateCreatePerson, handleValidationErrors, createPersona);

/**
 * @swagger
 * /persona/{id}:
 *   put:
 *     summary: Actualiza una persona existente
 *     tags: [Personas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la persona a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               direccion:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Persona actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Persona'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Persona no encontrada
 */

router.put('/:id', validateUpdatePerson, handleValidationErrors, updatePersona);

/**
 * @swagger
 * /persona:
 *   get:
 *     summary: Obtiene la lista de todas las personas
 *     tags: [Personas]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de personas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Persona'
 */

router.get('/', getAllPersonas);

/**
 * @swagger
 * /persona/{id}:
 *   get:
 *     summary: Obtiene una persona por su ID
 *     tags: [Personas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la persona a obtener
 *     responses:
 *       200:
 *         description: Persona encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Persona'
 *       404:
 *         description: Persona no encontrada
 */

router.get('/:id', getPersonaById);

/**
 * @swagger
 * /persona/{id}:
 *   delete:
 *     summary: Elimina una persona
 *     tags: [Personas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la persona a eliminar
 *     responses:
 *       200:
 *         description: Persona eliminada exitosamente
 *       404:
 *         description: Persona no encontrada
 */

router.delete('/:id', deletePersona);

module.exports = router;