// src/controllers/auth.controller.js
const { validationResult } = require("express-validator");
const Usuario = require("../models/users");
const Persona = require("../models/persona");
const { hashPassword, verifyPassword } = require("../utils/argon");
const generateToken = require("../utils/generateToken");
const bcrypt = require('bcryptjs'); // Asegúrate de tener bcryptjs instalado

async function crearUsuarioMaestro() {
  try {
    // Verifica si ya existe el usuario maestro
    const existe = await Usuario.findOne({ where: { username: 'admin' } });
    if (!existe) {
      // Crea la persona
      const persona = await Persona.create({
        primerNombre: 'Admin',
        segundoNombre: '',
        primerApellido: 'Principal',
        segundoApellido: '',
        numeroIdentificacion: '00000001',
        telefono: '',
        email: 'admin@admin.com',
        estadoCivil: '',
        sexo: '',
        direccion: ''
      });

      // Crea el usuario asociado a la persona
      await Usuario.create({
        username: 'admin',
        password: await bcrypt.hash('admin123', 10), // Cambia la contraseña si lo deseas
        rol: 'admin',
        estado: 'Activo',
        persona_id: persona.persona_id // Relación con la persona creada
      });

      console.log('Usuario maestro creado');
    }
  } catch (error) {
    console.error('Error al crear usuario maestro:', error);
  }
}

// Login
const login = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { username, password } = req.body;
    try {
        const user = await Usuario.findOne({ where: { username } });
        if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

        const valid = await verifyPassword(password, user.password);
        if (!valid) return res.status(401).json({ msg: "Contraseña incorrecta" });

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearUsuarioMaestro,
    login
};
