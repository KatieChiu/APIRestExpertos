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
 *   name: Personas
 *   description: Gestión de Personas en el Sistema
 */

/**
 * @swagger
 * /persona/:
 *   post:
 *     summary: Crear una nueva persona
 *     tags: [Personas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Persona'
 *     responses:
 *       201:
 *         description: Persona creada exitosamente
 */
router.post('/', validateCreatePerson, handleValidationErrors, createPersona);

/**
 * @swagger
 * /persona/{id}:
 *   put:
 *     summary: Actualizar una persona
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la persona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Persona'
 *     responses:
 *       200:
 *         description: Persona actualizada exitosamente
 */
router.put('/:id', validateUpdatePerson, handleValidationErrors, updatePersona);

/**
 * @swagger
 * /persona/:
 *   get:
 *     summary: Obtener todas las personas
 *     tags: [Personas]
 *     responses:
 *       200:
 *         description: Lista de personas
 */
router.get('/', getAllPersonas);

/**
 * @swagger
 * /persona/{id}:
 *   get:
 *     summary: Obtener una persona por ID
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Persona encontrada
 *       404:
 *         description: Persona no encontrada
 */
router.get('/:id', getPersonaById);

/**
 * @swagger
 * /persona/{id}:
 *   delete:
 *     summary: Eliminar una persona
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Persona eliminada exitosamente
 *       404:
 *         description: Persona no encontrada
 */
router.delete('/:id', deletePersona);

module.exports = router;