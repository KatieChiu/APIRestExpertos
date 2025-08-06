const { validationResult } = require("express-validator");
const Usuario = require("../models/users");
const Persona = require("../models/persona");
const { hashPassword, verifyPassword } = require("../utils/argon");
const generateToken = require("../utils/generateToken");
const argon = require('argon2');

async function crearUsuarioMaestro() {
  try {
    // Verifica si ya existe el usuario maestro (usando sintaxis Sequelize correcta)
    const existe = await Usuario.findOne({ where: { username: 'admin' } });
    if (!existe) {
      // Crea la persona usando Sequelize
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

      // Crea el usuario asociado a la persona usando Sequelize
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
        persona_id: persona.persona_id // Relación con la persona creada
      });

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
    // Incluir datos de la persona relacionada para el token (sintaxis Sequelize)
    const user = await Usuario.findOne({ 
      where: { username },
      include: [{
        model: Persona,
        attributes: ['primerNombre', 'primerApellido', 'email']
      }]
    });
    
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    // Verificar que el usuario esté activo
    if (user.estado !== 'Activo') {
      return res.status(401).json({ msg: "Usuario inactivo o bloqueado" });
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) return res.status(401).json({ msg: "Contraseña incorrecta" });

    const token = generateToken(user);
    
    // Respuesta completa con información del usuario y persona
    res.json({ 
      token,
      user: {
        usuario_id: user.usuario_id,
        username: user.username,
        rol: user.rol,
        estado: user.estado,
        // Incluir datos de la persona si están disponibles
        persona: user.Persona ? {
          primerNombre: user.Persona.primerNombre,
          primerApellido: user.Persona.primerApellido,
          email: user.Persona.email
        } : null
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

module.exports = {
  crearUsuarioMaestro,
  login
};