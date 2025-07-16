// src/controllers/auth.controller.js
const Usuario = require('../models/users');
const Persona = require('../models/persona');
const { validationResult } = require('express-validator');
const { hashPassword, verifyPassword } = require('../utils/argon');
const jwt = require('jsonwebtoken');
const generarToken = require('../utils/generateToken');

// Crear usuario maestro si no existe
const crearUsuarioMaestro = async () => {
    const existe = await Usuario.findOne({ where: { username: 'admin' } });
    if (!existe) {
        const persona = await Persona.create({ nombre: 'Administrador', apellido: 'General' });
        const hashed = await hashPassword('admin123');
        await Usuario.create({
            username: 'admin',
            password: hashed,
            rol: 'admin',
            persona_id: persona.id
        });
        console.log('Usuario maestro creado');
    }
};

const login = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { username, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { username } });
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        const match = await verifyPassword(password, usuario.password);
        if (!match) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

        if (usuario.estado !== 'Activo') return res.status(403).json({ mensaje: 'Usuario bloqueado o inactivo' });

        const token = generarToken({ usuario_id: usuario.usuario_id, rol: usuario.rol });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        });
        res.json({ token, usuario: { username: usuario.username, rol: usuario.rol } });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno', error });
    }
};


const register = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    const { nombre, apellido, username, password, rol } = req.body;
    try {
        const persona = await Persona.create({ nombre, apellido });
        const hashed = await hashPassword(password);
        const nuevo = await Usuario.create({ username, password: hashed, rol, persona_id: persona.id });
        res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevo });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno', error });
    }
};

module.exports = { login, register, crearUsuarioMaestro };
