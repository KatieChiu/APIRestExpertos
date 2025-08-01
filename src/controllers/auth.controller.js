const { validationResult } = require("express-validator");
const Usuario = require("../models/users");
const Persona = require("../models/persona");
const { hashPassword, verifyPassword } = require("../utils/argon");
const generateToken = require("../utils/generateToken");
const argon = require('argon2');

async function crearUsuarioMaestro() {
  try {
    const existe = await Usuario.findOne({ username: 'admin' });
    if (!existe) {
      const persona = new Persona({
        primerNombre: 'Admin',
        segundoNombre: '',
        primerApellido: 'Principal',
        segundoApellido: '',
        numeroIdentificacion: '1000000100000',
        telefono: '',
        email: 'admin@admin.com',
        estadoCivil: '',
        sexo: '',
        direccion: ''
      });
      await persona.save();

      await new Usuario({
        username: 'admin',
        password: await argon.hash('admin123', { type: argon.argon2id }),
        rol: 'admin',
        estado: 'Activo',
        persona_id: persona._id
      }).save();

      console.log('Usuario maestro creado');
    }
  } catch (error) {
    console.error('Error al crear usuario maestro:', error);
  }
}

const login = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { username, password } = req.body;
  try {
    const user = await Usuario.findOne({ username }).populate('persona_id');
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const valid = await verifyPassword(password, user.password);
    if (!valid) return res.status(401).json({ msg: "Contraseña incorrecta" });

    const token = generateToken(user);

    // jsonwebtoken y algunos datos del usuario
    return res.json({
      token,
      user: {
        username: user.username,
        rol: user.rol,
        persona: user.persona_id
      }
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { crearUsuarioMaestro, login };
