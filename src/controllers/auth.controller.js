const { validationResult } = require("express-validator");
const Usuario = require("../models/users");
const Persona = require("../models/persona");
const { hashPassword, verifyPassword } = require("../utils/argon");
const generateToken = require("../utils/generateToken");
const argon = require('argon2');

// Crear usuario maestro
async function crearUsuarioMaestro() {
  try {
    const existe = await Usuario.findOne({ username: 'admin' });
    if (!existe) {
      const persona = await Persona.create({
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

      await Usuario.create({
        username: 'admin',
        password: await argon.hash('admin123', { 
          type: argon.argon2id, 
          memoryCost: 2 ** 16, 
          timeCost: 4, 
          parallelism: 1 
        }),
        rol: 'admin',
        estado: 'Activo',
        profileImage: 'default_profile_image.png',
        persona_id: persona._id
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
    return res.status(400).json({ message: "Datos inválidos", error: errores.array() });
  }

  const { username, password } = req.body;
  try {
    const user = await Usuario.findOne({ username }).populate({
      path: 'persona_id',
      select: 'primerNombre primerApellido email'
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.estado !== 'Activo') {
      return res.status(401).json({ message: "Usuario inactivo o bloqueado" });
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = generateToken(user);

    res.status(200).json({
      token,
      user: {
        usuario_id: user._id,
        username: user.username,
        rol: user.rol,
        estado: user.estado,
        profileImage: user.profileImage,
        persona: user.persona_id ? {
          primerNombre: user.persona_id.primerNombre,
          primerApellido: user.persona_id.primerApellido,
          email: user.persona_id.email
        } : null
      },
      message: "Login exitoso"
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
    console.log(error);
  }
};

// Registro de usuario
const register = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ message: "Datos inválidos", error: errores.array() });
  }

  const { username, password, rol, estado, profileImage, persona_id, persona } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existe = await Usuario.findOne({ username });
    if (existe) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    let personaMongoId = persona_id;

    // Si se envían datos de persona, crea la persona
    if (persona && typeof persona === 'object') {
      const nuevaPersona = await Persona.create({
        primerNombre: persona.primerNombre,
        segundoNombre: persona.segundoNombre,
        primerApellido: persona.primerApellido,
        segundoApellido: persona.segundoApellido,
        numeroIdentificacion: persona.numeroIdentificacion,
        telefono: persona.telefono,
        email: persona.email,
        estadoCivil: persona.estadoCivil,
        sexo: persona.sexo,
        direccion: persona.direccion
      });
      personaMongoId = nuevaPersona._id;
    }

    // Crea el usuario
    const nuevoUsuario = await Usuario.create({
      username,
      password: await argon.hash(password, { 
        type: argon.argon2id, 
        memoryCost: 2 ** 16, 
        timeCost: 4, 
        parallelism: 1 
      }),
      rol,
      estado: estado || 'Activo',
      profileImage: profileImage || 'default_profile_image.png',
      persona_id: personaMongoId
    });

    // Obtiene los datos de la persona asociada
    const personaAsociada = await Persona.findById(personaMongoId);

    res.status(201).json({
      user: {
        usuario_id: nuevoUsuario._id,
        username: nuevoUsuario.username,
        rol: nuevoUsuario.rol,
        estado: nuevoUsuario.estado,
        profileImage: nuevoUsuario.profileImage,
        persona: personaAsociada ? {
          primerNombre: personaAsociada.primerNombre,
          primerApellido: personaAsociada.primerApellido,
          email: personaAsociada.email
        } : null
      },
      message: "Usuario registrado exitosamente"
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
    console.log(error);
  }
};

module.exports = {
  crearUsuarioMaestro,
  login,
  register
};