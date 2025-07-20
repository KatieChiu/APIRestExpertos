// src/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth.controller");
const { check } = require("express-validator");

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Rutas de login de usuario
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token generado
 *       401:
 *         description: Credenciales incorrectas
 */
router.post(
    "/login",
    [
        check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
    ],
    login
);

module.exports = router;
