const { Usuario, Persona, Venta, OrdenCompra } = require("../models");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const argon = require("argon2");

// Crear usuario con imagen y persona asociada
const createUser = async (req, res) => {
  try {
    let profileImagePath;
    if (req.file) {
      const finalImageName = `usuario-${Date.now()}-${Math.floor(Math.random() * 10000)}.jpg`;
      const finalImagePath = path.join("uploads/imagenes-usuarios", finalImageName);
      const absoluteFinalPath = path.join(__dirname, "../", finalImagePath);

      // Hashear contraseña
      req.body.password = await argon.hash(req.body.password, {
        type: argon.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 4,
        parallelism: 1,
      });

      // Procesar imagen
      await sharp(req.file.path)
        .resize(800, 600)
        .toFormat("jpeg")
        .toFile(absoluteFinalPath);

      fs.unlinkSync(req.file.path);
      profileImagePath = finalImagePath;
    } else {
      profileImagePath = path.join("uploads/imagenes-usuarios", "default_profile_image.png");
    }

    // Crear persona en Mongo
    const persona = new Persona(req.body);
    await persona.save();

    // Crear usuario en Mongo
    const newUser = new Usuario({
      username: req.body.username,
      password: req.body.password,
      rol: req.body.rol,
      estado: req.body.estado || "Activo",
      persona_id: persona._id,
      profileImage: profileImagePath,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error al crear el usuario",
      error: error.message,
    });
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      success: true,
      message: "Usuario actualizado exitosamente",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

// Obtener todos los usuarios (sin password)
const getAllUsers = async (req, res) => {
  try {
    const users = await Usuario.find().select("-password").populate("persona_id");
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findById(id).select("-password").populate("persona_id");

    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener el usuario",
      error: error.message,
    });
  }
};

// Eliminar usuario y su persona asociada
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    await Persona.findByIdAndDelete(usuario.persona_id);

    return res.status(200).json({
      success: true,
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el usuario",
      error: error.message,
    });
  }
};

// Obtener historial de compras y ventas (Sequelize)
const obtenerHistorialUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id).select("-password -persona_id");
    if (!usuario) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    // Ventas y compras desde MySQL
    const ventas = await Venta.findAll({ where: { usuario_id: id } });
    const compras = await OrdenCompra.findAll({ where: { usuario_id: id } });

    return res.status(200).json({
      success: true,
      data: { usuario, ventas, compras },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener historial del usuario",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  obtenerHistorialUsuario,
};
