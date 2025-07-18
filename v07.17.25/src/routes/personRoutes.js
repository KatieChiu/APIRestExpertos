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
<<<<<<< Updated upstream
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
=======
 * /persona/:
 *   post:
 *     summary: Crear una nueva persona
 *     tags: [Personas]
>>>>>>> Stashed changes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
<<<<<<< Updated upstream
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

=======
 *             $ref: '#/components/schemas/Persona'
 *     responses:
 *       201:
 *         description: Persona creada exitosamente
 */
>>>>>>> Stashed changes
router.post('/', validateCreatePerson, handleValidationErrors, createPersona);

/**
 * @swagger
 * /persona/{id}:
 *   put:
<<<<<<< Updated upstream
 *     summary: Actualiza una persona existente
 *     tags: [Personas]
 *     security:
 *       - BearerAuth: []
=======
 *     summary: Actualizar una persona
 *     tags: [Personas]
>>>>>>> Stashed changes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
<<<<<<< Updated upstream
 *           type: string
 *         description: ID de la persona a actualizar
=======
 *           type: integer
 *         description: ID de la persona
>>>>>>> Stashed changes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
<<<<<<< Updated upstream
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

=======
 *             $ref: '#/components/schemas/Persona'
 *     responses:
 *       200:
 *         description: Persona actualizada exitosamente
 */
>>>>>>> Stashed changes
router.put('/:id', validateUpdatePerson, handleValidationErrors, updatePersona);

/**
 * @swagger
<<<<<<< Updated upstream
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

=======
 * /persona/:
 *   get:
 *     summary: Obtener todas las personas
 *     tags: [Personas]
 *     responses:
 *       200:
 *         description: Lista de personas
 */
>>>>>>> Stashed changes
router.get('/', getAllPersonas);

/**
 * @swagger
 * /persona/{id}:
 *   get:
<<<<<<< Updated upstream
 *     summary: Obtiene una persona por su ID
 *     tags: [Personas]
 *     security:
 *       - BearerAuth: []
=======
 *     summary: Obtener una persona por ID
 *     tags: [Personas]
>>>>>>> Stashed changes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
<<<<<<< Updated upstream
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

=======
 *           type: integer
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Persona encontrada
 *       404:
 *         description: Persona no encontrada
 */
>>>>>>> Stashed changes
router.get('/:id', getPersonaById);

/**
 * @swagger
 * /persona/{id}:
 *   delete:
<<<<<<< Updated upstream
 *     summary: Elimina una persona
 *     tags: [Personas]
 *     security:
 *       - BearerAuth: []
=======
 *     summary: Eliminar una persona
 *     tags: [Personas]
>>>>>>> Stashed changes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
<<<<<<< Updated upstream
 *           type: string
 *         description: ID de la persona a eliminar
=======
 *           type: integer
 *         description: ID de la persona
>>>>>>> Stashed changes
 *     responses:
 *       200:
 *         description: Persona eliminada exitosamente
 *       404:
 *         description: Persona no encontrada
 */
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
router.delete('/:id', deletePersona);

module.exports = router;