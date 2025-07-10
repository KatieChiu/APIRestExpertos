const express = require('express');
const router = express.Router();
const {
    createPersona,
    updatePersona,
    getAllPersonas,
    getPersonaById,
    deletePersona
} = require('../controllers/persona');

const { 
    validateCreatePerson,
    validateUpdatePerson
} = require('../validators/personValidator');

const { handleValidationErrors } = require('../middlewares/validationMiddleware');

router.post('/', handleValidationErrors, validateCreatePerson, createPersona);
router.put('/:id', handleValidationErrors, validateUpdatePerson , updatePersona);
router.get('/', getAllPersonas);
router.get('/:id', getPersonaById);
router.delete('/:id', deletePersona);

module.exports = router;