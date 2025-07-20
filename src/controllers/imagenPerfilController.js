const Usuario = require('../models/users');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

// SUBIR IMAGEN DE PERFIL
exports.subirImagenPerfil = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ mensaje: 'No se envió imagen' });
    }

    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            // Elimina la imagen recién subida si el usuario no existe
            fs.unlinkSync(req.file.path);
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Elimina la imagen anterior si existe
        if (usuario.imagen_perfil) {
            const rutaAnterior = path.join(__dirname, '../uploads/imagenes-usuarios', path.basename(usuario.imagen_perfil));
            if (fs.existsSync(rutaAnterior)) {
                fs.unlinkSync(rutaAnterior);
            }
        }

        usuario.imagen_perfil = '/uploads/imagenes-usuarios/' + req.file.filename;
        await usuario.save();

        res.json({ 
            mensaje: 'Imagen de perfil subida correctamente', 
            imagen_perfil: usuario.imagen_perfil 
        });
    } catch (error) {
        // Si ocurre un error, elimina la imagen recién subida
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        console.error('Error al subir imagen de perfil:', error);
        res.status(500).json({ mensaje: 'Error al subir la imagen de perfil', error: error.message });
    }
};

// ACTUALIZAR IMAGEN DE PERFIL
exports.actualizarImagenPerfil = async (req, res) => {
    const { id } = req.params;
    if (!req.file) {
        return res.status(400).json({ mensaje: 'No se envió imagen' });
    }

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            // Elimina la imagen recién subida si el usuario no existe
            fs.unlinkSync(req.file.path);
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Elimina la imagen anterior si existe
        if (usuario.imagen_perfil) {
            const rutaAnterior = path.join(__dirname, '../uploads/imagenes-usuarios', path.basename(usuario.imagen_perfil));
            if (fs.existsSync(rutaAnterior)) {
                fs.unlinkSync(rutaAnterior);
            }
        }

        usuario.imagen_perfil = '/uploads/imagenes-usuarios/' + req.file.filename;
        await usuario.save();

        res.json({ 
            mensaje: 'Imagen de perfil actualizada correctamente', 
            imagen_perfil: usuario.imagen_perfil 
        });
    } catch (error) {
        // Si ocurre un error, elimina la imagen recién subida
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        console.error('Error al actualizar imagen de perfil:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la imagen de perfil', error: error.message });
    }
};

// ELIMINAR IMAGEN DE PERFIL
exports.eliminarImagenPerfil = async (req, res) => {
    const { id } = req.params;
    
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        if (!usuario.imagen_perfil) {
            return res.status(400).json({ mensaje: 'El usuario no tiene imagen de perfil para eliminar' });
        }

        // Elimina el archivo físico
        const rutaImagen = path.join(__dirname, '../uploads/imagenes-usuarios', path.basename(usuario.imagen_perfil));
        if (fs.existsSync(rutaImagen)) {
            fs.unlinkSync(rutaImagen);
        }

        // Actualiza el campo en la base de datos
        usuario.imagen_perfil = null;
        await usuario.save();

        res.json({ mensaje: 'Imagen de perfil eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar imagen de perfil:', error);
        res.status(500).json({ mensaje: 'Error al eliminar la imagen de perfil', error: error.message });
    }
};

// OBTENER IMAGEN DE PERFIL
exports.obtenerImagenPerfil = async (req, res) => {
    const { id } = req.params;
    
    try {
        const usuario = await Usuario.findByPk(id, {
            attributes: ['usuario_id', 'username', 'imagen_perfil']
        });
        
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ 
            usuario_id: usuario.usuario_id,
            username: usuario.username,
            imagen_perfil: usuario.imagen_perfil 
        });
    } catch (error) {
        console.error('Error al obtener imagen de perfil:', error);
        res.status(500).json({ mensaje: 'Error al obtener la imagen de perfil', error: error.message });
    }
};
