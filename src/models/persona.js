const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
    primerNombre: { type: String, required: true },
    segundoNombre: { type: String },
    primerApellido: { type: String, required: true },
    segundoApellido: { type: String },
    numeroIdentificacion: { type: String, required: true, unique: true },
    telefono: { type: String, select: false },
    email: { type: String, match: /.+\@.+\..+/ },
    estadoCivil: { type: String },
    sexo: { type: String },
    direccion: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Persona', personaSchema);
