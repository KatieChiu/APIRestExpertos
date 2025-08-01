const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'ventas', 'soporte', 'bodega'], required: true },
    estado: { type: String, enum: ['Activo', 'Inactivo', 'Bloqueado'], default: 'Activo' },
    profileImage: { type: String, default: 'default_profile_image.png' },
    persona_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
