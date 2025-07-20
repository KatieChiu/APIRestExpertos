const express = require('express');
const router = express.Router();
const imagenPerfilController = require('../controllers/imagenPerfilController');
const { uploadImagenUsuario } = require('../configuration/archivosUsuarios');
const verifyToken = require('../middlewares/verifyToken');

/**
 * @swagger
 * tags:
 *   - name: ImagenPerfil
 *     description: Operaciones relacionadas con las imágenes de perfil de usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ImagenPerfilResponse:
 *       type: object
 *       properties:
 *         usuario_id:
 *           type: integer
 *           description: ID del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         imagen_perfil:
 *           type: string
 *           nullable: true
 *           description: URL de la imagen de perfil
 */

/**
 * @swagger
 * /imagen-perfil/{id}:
 *   post:
 *     summary: Sube una nueva imagen de perfil para un usuario
 *     tags: [ImagenPerfil]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
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
 *                 description: Archivo de imagen (PNG, JPG, JPEG - máximo 2MB)
 *     responses:
 *       200:
 *         description: Imagen de perfil subida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Imagen de perfil subida correctamente"
 *                 imagen_perfil:
 *                   type: string
 *                   description: URL de la nueva imagen
 *       400:
 *         description: No se envió imagen o formato inválido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/:id', verifyToken, uploadImagenUsuario.single('imagen'), imagenPerfilController.subirImagenPerfil);

/**
 * @swagger
 * /imagen-perfil/{id}:
 *   put:
 *     summary: Actualiza la imagen de perfil de un usuario
 *     tags: [ImagenPerfil]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
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
 *                 description: Archivo de imagen (PNG, JPG, JPEG - máximo 2MB)
 *     responses:
 *       200:
 *         description: Imagen de perfil actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Imagen de perfil actualizada correctamente"
 *                 imagen_perfil:
 *                   type: string
 *                   description: URL de la nueva imagen
 *       400:
 *         description: No se envió imagen o formato inválido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', verifyToken, uploadImagenUsuario.single('imagen'), imagenPerfilController.actualizarImagenPerfil);

/**
 * @swagger
 * /imagen-perfil/{id}:
 *   get:
 *     summary: Obtiene la información de la imagen de perfil de un usuario
 *     tags: [ImagenPerfil]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Información de la imagen de perfil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImagenPerfilResponse'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', verifyToken, imagenPerfilController.obtenerImagenPerfil);

/**
 * @swagger
 * /imagen-perfil/{id}:
 *   delete:
 *     summary: Elimina la imagen de perfil de un usuario
 *     tags: [ImagenPerfil]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Imagen de perfil eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Imagen de perfil eliminada correctamente"
 *       400:
 *         description: El usuario no tiene imagen de perfil para eliminar
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', verifyToken, imagenPerfilController.eliminarImagenPerfil);

module.exports = router;
