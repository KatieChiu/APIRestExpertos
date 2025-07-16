// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth.controller');
const { body } = require('express-validator');

// POST /api/auth/login
router.post('/login', [
  body('username').notEmpty().withMessage('Usuario requerido'),
  body('password').notEmpty().withMessage('Contraseña requerida')
], login);

// POST /api/auth/register (opcional para pruebas)
router.post('/register', [
  body('username').notEmpty(),
  body('password').notEmpty(),
  body('nombre').notEmpty(),
  body('apellido').notEmpty(),
  body('rol').isIn(['admin', 'ventas', 'soporte', 'bodega'])
], register);

module.exports = router;
