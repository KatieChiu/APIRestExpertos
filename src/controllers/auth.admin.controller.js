const Usuario = require('../models/users');
const Persona = require('../models/persona');
const { hashPassword } = require('../utils/argon');
const { validationResult } = require('express-validator');

const registrarUsuario = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const { primerNombre, segundoNombre, primerApellido, segundoApellido, numeroIdentificacion,
            telefono, email, estadoCivil, sexo, direccion, username, password, rol } = req.body;

        const persona = new Persona({
            primerNombre, segundoNombre, primerApellido, segundoApellido,
            numeroIdentificacion, telefono, email, estadoCivil, sexo, direccion
        });
        await persona.save();

        const hashedPassword = await hashPassword(password);

        const usuario = new Usuario({
            username,
            password: hashedPassword,
            rol,
            persona_id: persona._id
        });
        await usuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar usuario', error });
    }
};

module.exports = { registrarUsuario };
