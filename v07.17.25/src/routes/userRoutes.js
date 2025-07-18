const express = require('express');
const router = express.Router();

const {
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
    obtenerHistorialUsuario
} = require('../controllers/users');

const { 
    validateCreateUser,
    validateUpdateUser
} = require('../validators/userValidators');

const { handleValidationErrors } = require('../middlewares/validationMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Operaciones relacionadas con la gestión de usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario único
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         apellido:
 *           type: string
 *           description: Apellido del usuario
 *         rol:
 *           type: string
 *           enum: [admin, ventas, soporte, bodega]
 *           description: Rol del usuario en el sistema
 *         estado:
 *           type: boolean
 *           description: Estado activo/inactivo del usuario
 *         imagen_perfil:
 *           type: string
 *           nullable: true
 *           description: URL de la imagen de perfil del usuario
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - nombre
 *               - apellido
 *               - rol
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario
 *               rol:
 *                 type: string
 *                 enum: [admin, ventas, soporte, bodega]
 *                 description: Rol del usuario
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error de validación
 *       409:
 *         description: Usuario ya existe
 */

router.post('/', validateCreateUser, handleValidationErrors, createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [admin, ventas, soporte, bodega]
 *               estado:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Usuario no encontrado
 */

router.put('/:id', validateUpdateUser, handleValidationErrors, updateUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene la lista de todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get('/', getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a obtener
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */

router.get('/:id', getUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */

router.delete('/:id', deleteUser);

/**
 * @swagger
 * /users/{id}/historial:
 *   get:
 *     summary: Obtiene el historial de transacciones de un usuario
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario para obtener su historial
 *     responses:
 *       200:
 *         description: Historial de transacciones del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   transaccion_id:
 *                     type: integer
 *                   tipo_transaccion:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                   monto:
 *                     type: number
 *                     format: decimal
 *                   descripcion:
 *                     type: string
 *       404:
 *         description: Usuario no encontrado
 */

router.get('/:id/historial', obtenerHistorialUsuario);

module.exports = router; 