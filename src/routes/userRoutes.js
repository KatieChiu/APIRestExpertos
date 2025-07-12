const express = require('express');
const router = express.Router();

const {
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser
} = require('../controllers/users');

const { 
    validateCreateUser,
    validateUpdateUser
} = require('../validators/userValidators');

const { handleValidationErrors } = require('../middlewares/validationMiddleware');

router.post('/', validateCreateUser, handleValidationErrors, createUser);
router.put('/:id', validateUpdateUser, handleValidationErrors, updateUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

module.exports = router; 