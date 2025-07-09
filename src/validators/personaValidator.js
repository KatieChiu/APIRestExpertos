const {body} = require("express-validator");

const validatePersona = [
    body('primerNombre')
        .optional()
        .isLength({ min: 2, max: 15 }).withMessage('El primer nombre debe tener entre 2 y 15 caracteres')
        .isAlpha('es-ES').withMessage('El nombre solo puede contener letras'),
    body('segundoNombre')
        .optional()
        .isLength({ min: 2, max: 15 }).withMessage('El segundo nombre debe tener entre 2 y 15 caracteres')
        .isAlpha('es-ES').withMessage('El nombre solo puede contener letras'),
    body('primerApellido')
        .optional()
        .isLength({ min: 2, max: 15 }).withMessage('El apellido debe tener entre 2 y 15 caracteres')
        .isAlpha('es-ES').withMessage('El apellido solo puede contener letras'),
    body('segundoApellido')
        .optional()
        .isLength({ min: 2, max: 15 }).withMessage('El apellido debe tener entre 2 y 15 caracteres')
        .isAlpha('es-ES').withMessage('El apellido solo puede contener letras'),
    body('numeroIdentificacion')
        .optional()
        .isLength({ min: 13, max: 13 }).withMessage('El número de identificación debe tener 15 dígitos')
        .matches(/[0-9]/).withMessage('El número de identificación solo puede contener números'),
    body('telefono')    
        .optional()
        .isMobilePhone('es-HN').withMessage('El teléfono debe ser un número de teléfono móvil válido'),
    body('email')
        .optional()
        .isEmail().withMessage('El email debe ser válido')
        .isLength({ max: 100 }).withMessage('El email no puede exceder los 100 caracteres'),
    body('estadoCivil')
        .optional()
        .isIn(['soltero', 'casado', 'divorciado', 'viudo']).withMessage('El estado civil debe ser uno de los siguientes: soltero, casado, divorciado, viudo'),
    body('sexo')
        .optional()
        .isIn(['masculino', 'femenino', 'otro']).withMessage('El sexo debe ser uno de los siguientes: masculino, femenino, otro'),
    body('direccion')
        .optional() 
        .isLength({ max: 200 }).withMessage('La dirección no puede exceder los 200 caracteres')
];


module.exports = {
    validatePersona
};