const Persona = require('../models/persona');

const createPersona = async (req, res) => {
    try {
        const newPersona = new Persona(req.body);
        await newPersona.save();
        return res.status(201).json({
            success: true,
            message: 'Persona creada exitosamente',
            data: newPersona
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al crear la persona',
            error: error.message
        });
    }
};

const updatePersona = async (req, res) => {
    try {
        const persona = await Persona.findOneAndUpdate(
            { numeroIdentificacion: req.params.numeroIdentificacion },
            req.body,
            { new: true }
        );
        if (!persona) {
            return res.status(404).json({
                success: false,
                message: 'Persona no encontrada'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Persona actualizada exitosamente',
            data: persona
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al actualizar la persona',
            error: error.message
        });
    }
};

const getAllPersonas = async (req, res) => {
    try {
        const personas = await Persona.find();
        return res.status(200).json({
            success: true,
            data: personas
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener las personas',
            error: error.message
        });
    }
};

const getPersonaById = async (req, res) => {
    try {
        const persona = await Persona.findOne({ numeroIdentificacion: req.params.numeroIdentificacion });
        if (!persona) {
            return res.status(404).json({
                success: false,
                message: 'Persona no encontrada'
            });
        }
        return res.status(200).json({
            success: true,
            data: persona
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener la persona',
            error: error.message
        });
    }
};

const deletePersona = async (req, res) => {
    try {
        const persona = await Persona.findOneAndDelete({ numeroIdentificacion: req.params.numeroIdentificacion });
        if (!persona) {
            return res.status(404).json({
                success: false,
                message: 'Persona no encontrada'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Persona eliminada exitosamente'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar la persona',
            error: error.message
        });
    }
};

module.exports = { createPersona, updatePersona, getAllPersonas, getPersonaById, deletePersona };
