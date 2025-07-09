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
    validatePersona
} = require('../validators/personaValidator');

const { handleValidationErrors } = require('../middlewares/validationMiddleware');

router.post('/', validatePersona, handleValidationErrors, createPersona);
router.put('/:id', validatePersona, handleValidationErrors, updatePersona);
router.get('/', getAllPersonas);
router.get('/:id', getPersonaById);
router.delete('/:id', deletePersona);

module.exports = router;