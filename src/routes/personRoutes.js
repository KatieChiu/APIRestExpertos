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
 * components:
 *   schemas:
 *     Persona:
 *       type: object
 *       properties:
 *         primerNombre:
 *           type: string
 *           minLength: 2
 *           maxLength: 15
 *           description: Primer nombre de la persona
 *         segundoNombre:
 *           type: string
 *           minLength: 2
 *           maxLength: 15
 *           description: Segundo nombre de la persona
 *         primerApellido:
 *           type: string
 *           minLength: 2
 *           maxLength: 15
 *           description: Primer apellido de la persona
 *         segundoApellido:
 *           type: string
 *           minLength: 2
 *           maxLength: 15
 *           description: Segundo apellido de la persona
 *         numeroIdentificacion:
 *           type: string
 *           minLength: 13
 *           maxLength: 13
 *           pattern: '^[0-9]+$'
 *           description: Número de identificación (13 dígitos)
 *         telefono:
 *           type: string
 *           description: Teléfono móvil válido (Honduras)
 *         email:
 *           type: string
 *           maxLength: 100
 *           format: email
 *           description: Correo electrónico
 *         estadoCivil:
 *           type: string
 *           enum: [soltero, casado, divorciado, viudo]
 *           description: Estado civil
 *         sexo:
 *           type: string
 *           enum: [masculino, femenino, otro]
 *           description: Sexo
 *         direccion:
 *           type: string
 *           maxLength: 200
 *           description: Dirección
 *
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
 * /persona/{numeroIdentificacion}:
 *   put:
 *     summary: Actualizar una persona
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de identificación de la persona
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
router.put('/:numeroIdentificacion', validateUpdatePerson, handleValidationErrors, updatePersona);

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
 * /persona/{numeroIdentificacion}:
 *   get:
 *     summary: Obtener una persona por número de identificación
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de identificación de la persona
 *     responses:
 *       200:
 *         description: Persona encontrada
 *       404:
 *         description: Persona no encontrada
 */
router.get('/:numeroIdentificacion', getPersonaById);

/**
 * @swagger
 * /persona/{numeroIdentificacion}:
 *   delete:
 *     summary: Eliminar una persona
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de identificación de la persona
 *     responses:
 *       200:
 *         description: Persona eliminada exitosamente
 *       404:
 *         description: Persona no encontrada
 */
router.delete('/:numeroIdentificacion', deletePersona);


module.exports = router;