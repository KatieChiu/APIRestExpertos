const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../controllers/auth.admin.controller');
const verifyToken = require('../middlewares/verifyToken');
const isMaestro = require('../middlewares/isMaestro');
const { validateCreateUser } = require('../validators/userValidator');
const { validateCreatePerson } = require('../validators/personValidator');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Gestión de usuarios maestros
 */

/**
 * @swagger
 * /admin/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario (solo maestro)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *               rol: { type: string }
 *               primerNombre: { type: string }
 *               segundoNombre: { type: string }
 *               primerApellido: { type: string }
 *               segundoApellido: { type: string }
 *               numeroIdentificacion: { type: string }
 *               telefono: { type: string }
 *               email: { type: string }
 *               estadoCivil: { type: string }
 *               sexo: { type: string }
 *               direccion: { type: string }
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       403:
 *         description: Acceso denegado. Solo el usuario maestro puede registrar.
 */
console.log({
  verifyToken: typeof verifyToken,
  isMaestro: typeof isMaestro,
  validateCreateUser: typeof validateCreateUser,
  validateCreatePerson: typeof validateCreatePerson,
  handleValidationErrors: typeof handleValidationErrors,
  registrarUsuario: typeof registrarUsuario
});



router.post(
  '/registrar',
  verifyToken,
  isMaestro,
  validateCreateUser,
  validateCreatePerson,
  handleValidationErrors,
  registrarUsuario
);

module.exports = router;

module.exports = router;
