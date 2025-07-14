const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

// Puedes agregar más rutas de autenticación aquí, por ejemplo para logout, refresh token, etc.

module.exports = router;