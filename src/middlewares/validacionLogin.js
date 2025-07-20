// src/middlewares/validateLogin.js
const { check, validationResult } = require('express-validator');

const validateLogin = [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        next();
    }
];

module.exports = validateLogin;
