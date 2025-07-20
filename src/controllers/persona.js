const Persona = require('../models/persona');

const createPersona = async (req, res) => {
    try {
        const newPersona = await Persona.create(req.body);
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
}

const updatePersona = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Persona.update(req.body, {
            where: { persona_id: id }
        });

        if (updated === 0) {
            return res.status(404).json({
                success: false,
                message: 'Persona no encontrada'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Persona actualizada exitosamente'
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
        const personas = await Persona.findAll();
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
}

const getPersonaById = async (req, res) => {
    try {
        const { id } = req.params;
        const persona = await Persona.findByPk(id);

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
        const { id } = req.params;
        const deleted = await Persona.destroy({
            where: { persona_id: id }
        });

        if (deleted === 0) {
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

module.exports = {
    createPersona,
    updatePersona,
    getAllPersonas,
    getPersonaById,
    deletePersona
};