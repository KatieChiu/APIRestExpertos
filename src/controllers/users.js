const Users = require("../models/users");

const createUser = async(req, res) => {
    try {
        const newUser = new Users(req.body);
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: newUser
        });
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};

const updateUser = async(req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await Users.update(req.body, {
            where: { usuario_id: id }
        });
        
        if (updatedUser[0] === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Usuario actualizado exitosamente'
        });
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: 'Error al actualizar el usuario',
            error: error.message
        });
    }
};

const getAllUsers = async(req, res) => {
    try {
        const users = await Users.findAll();
        return res.status(200).json({
            success: true,
            data: users
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios',
            error: error.message
        });
    }
};

const getUserById = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el usuario',
            error: error.message
        });
    }
};

const deleteUser = async(req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await Users.destroy({
            where: { usuario_id: id }
        });
        
        if (deletedUser === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Usuario eliminado exitosamente'
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el usuario',
            error: error.message
        });
    }
};

module.exports = {
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser
};

