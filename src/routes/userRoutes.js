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

const { uploadImagenUsuario } = require('../configuration/archivosUsuarios');

const { 
    validateCreateUser,
    validateUpdateUser
} = require('../validators/userValidator');

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
 *         usuario_id:
 *           type: integer
 *           description: ID único del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario único
 *         password:
 *           type: string
 *           description: Contraseña del usuario (encriptada)
 *         rol:
 *           type: string
 *           enum: [admin, ventas, soporte, bodega]
 *           description: Rol del usuario en el sistema
 *         estado:
 *           type: string
 *           enum: [Activo, Inactivo, Bloqueado]
 *           description: Estado del usuario
 *         profileImage:
 *           type: string
 *           description: Nombre de archivo de la imagen de perfil del usuario
 *         persona_id:
 *           type: integer
 *           description: ID de la persona asociada al usuario
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - rol
 *               - persona_id
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               rol:
 *                 type: string
 *                 enum: [admin, ventas, soporte, bodega]
 *                 description: Rol del usuario
 *               estado:
 *                 type: string
 *                 enum: [Activo, Inactivo, Bloqueado]
 *                 description: Estado del usuario (opcional, por defecto Activo)
 *               profileImage:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de perfil del usuario (opcional)
 *               persona_id:
 *                 type: integer
 *                 description: ID de la persona asociada al usuario
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

router.post('/', uploadImagenUsuario.single('profileImage'), validateCreateUser, handleValidationErrors, createUser);

/**
 * @swagger
 * /user/{id}:
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
 *             required:
 *               - username
 *               - rol
 *               - persona_id
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario (opcional)
 *               rol:
 *                 type: string
 *                 enum: [admin, ventas, soporte, bodega]
 *                 description: Rol del usuario
 *               estado:
 *                 type: string
 *                 enum: [Activo, Inactivo, Bloqueado]
 *                 description: Estado del usuario
 *               profileImage:
 *                 type: string
 *                 description: Nombre de archivo de la imagen de perfil (opcional)
 *               persona_id:
 *                 type: integer
 *                 description: ID de la persona asociada al usuario
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
 * /user:
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
 * /user/{id}:
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
 * /user/{id}:
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
 * /user/{id}/historial:
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