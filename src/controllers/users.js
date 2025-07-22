const Users = require("../models/users");
const Venta = require("../models/venta");
const OrdenCompra = require("../models/ordenCompra");
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const argon = require('argon2');

const createUser = async (req, res) => {
    try {
        let profileImagePath;
        if (req.file) {
            // Redimensionar imagen antes de guardar
            const finalImageName = `usuario-${Date.now()}-${Math.floor(Math.random() * 10000)}.jpg`;
            const finalImagePath = path.join('uploads/imagenes-usuarios', finalImageName);
            const absoluteFinalPath = path.join(__dirname, '../', finalImagePath);
            
            const encryptedPassword = await argon.hash(req.body.password);
            req.body.password = encryptedPassword;
            
            await sharp(req.file.path)
                .resize(800, 600)
                .toFormat('jpeg')
                .toFile(absoluteFinalPath);

            // Eliminar imagen temporal
            fs.unlinkSync(req.file.path);

            profileImagePath = finalImagePath;
        } else {
            // Imagen por defecto
            profileImagePath = path.join('uploads/imagenes-usuarios', 'default_profile_image.png');
        }

        // Crear el usuario con la imagen de perfil
        const newUser = await Users.create({
            ...req.body,
            profileImage: profileImagePath
        });
        return res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: newUser
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {
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
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al actualizar el usuario',
            error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: { exclude: ['password'] } // Excluir password por seguridad
        });
        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios',
            error: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id, {
            attributes: { exclude: ['password'] } // Excluir password por seguridad
        });

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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el usuario',
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el usuario',
            error: error.message
        });
    }
};

// Obtener historial de compras y ventas
const obtenerHistorialUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Users.findByPk(id, {
            include: [
                { model: Venta, as: 'ventas' },
                { model: OrdenCompra, as: 'compras' }
            ],
            exclude: ['estado','rol','password','persona_id', 'createdAt', 'updatedAt']
        });

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: usuario
        });
    } catch (error) {
        console.error('Error al obtener historial:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener historial del usuario',
            error: error.message
        });
    }
};

module.exports = {
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
    obtenerHistorialUsuario // nuevo endpoint
};
