// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth.controller');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   - name: Autenticación
 *     description: Operaciones relacionadas con autenticación y registro
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión en el sistema
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     nombre:
 *                       type: string
 *                     apellido:
 *                       type: string
 *                     rol:
 *                       type: string
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Credenciales inválidas
 */

// POST /api/auth/login
router.post('/login', [
  body('username').notEmpty().withMessage('Usuario requerido'),
  body('password').notEmpty().withMessage('Contraseña requerida')
], login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario en el sistema
 *     tags: [Autenticación]
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
 *                 description: Rol del usuario en el sistema
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     nombre:
 *                       type: string
 *                     apellido:
 *                       type: string
 *                     rol:
 *                       type: string
 *       400:
 *         description: Error de validación
 *       409:
 *         description: Usuario ya existe
 */

// POST /api/auth/register (opcional para pruebas)
router.post('/register', [
  body('username').notEmpty(),
  body('password').notEmpty(),
  body('nombre').notEmpty(),
  body('apellido').notEmpty(),
  body('rol').isIn(['admin', 'ventas', 'soporte', 'bodega'])
], register);

module.exports = router;
