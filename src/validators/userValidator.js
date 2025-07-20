const { body } = require("express-validator");

const validateCreateUser = [
    body('username')
        .notEmpty().withMessage('El nombre de usuario es requerido')
        .isLength({ min: 3, max: 50 }).withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres')
        .isAlphanumeric().withMessage('El nombre de usuario solo puede contener letras y números'),
    
    body('password')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 6, max: 100 }).withMessage('La contraseña debe tener entre 6 y 100 caracteres'),
    
    body('rol')
        .notEmpty().withMessage('El rol es requerido')
        .isIn(['admin', 'ventas', 'soporte', 'bodega']).withMessage('El rol debe ser uno de: admin, ventas, soporte, bodega'),
    
    body('persona_id')
        .notEmpty().withMessage('El ID de persona es requerido')
        .isInt({ min: 1 }).withMessage('El ID de persona debe ser un número entero positivo')
];

const validateUpdateUser = [
    body('username')
        .optional()
        .isLength({ min: 3, max: 50 }).withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres')
        .isAlphanumeric().withMessage('El nombre de usuario solo puede contener letras y números'),
    
    body('password')
        .optional()
        .isLength({ min: 6, max: 100 }).withMessage('La contraseña debe tener entre 6 y 100 caracteres'),
    
    body('rol')
        .optional()
        .isIn(['admin', 'ventas', 'soporte', 'bodega']).withMessage('El rol debe ser uno de: admin, ventas, soporte, bodega')
];

module.exports = {
    validateCreateUser,
    validateUpdateUser
}; 