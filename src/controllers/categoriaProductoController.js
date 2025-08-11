const { validationResult } = require('express-validator');
const CategoriaProducto = require("../models/categoriaProducto");


exports.crearCategoria = async (req, res) => {
    console.log("Datos recibidos:", req.body); // Agrega un log para depuración

    // Validación de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const mensajes = errors.array().map(error => error.msg);
        console.log("Errores de validación:", mensajes); 
        return res.status(400).json({ mensaje: "Errores de validación", errores: mensajes });
    }

    try {
        const nuevaCategoria = await CategoriaProducto.create(req.body);
        console.log("Categoría creada exitosamente:", nuevaCategoria);
        res.status(201).json({ mensaje: "Categoría creada exitosamente", data: nuevaCategoria });
    } catch (error) {
        console.error("Error al crear categoría:", error);
        
        // Manejo específico de errores de Sequelize
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ 
                mensaje: "Error: El ID de categoría o nombre ya existe en la base de datos" 
            });
        } else if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ 
                mensaje: "Error de validación en la base de datos", 
                detalles: error.errors 
            });
        } else {
            return res.status(500).json({ 
                mensaje: "Error interno del servidor al crear la categoría", 
                error: error.message 
            });
        }
    }
};

//READ (todas)
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await CategoriaProducto.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener categorías", error });
    }
};

//READ (una)
exports.obtenerCategoriaPorId = async (req, res) => {
    try {
        const categoria = await CategoriaProducto.findByPk(req.params.id);
        if (!categoria) return res.status(404).json({ mensaje: "No encontrada" });
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar categoría", error });
    }
};

//UPDATE
exports.actualizarCategoria = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const mensajes = errors.array().map(error => error.msg);
        return res.status(400).json({ mensaje: "Errores de validación", errores: mensajes });
    }

    try {
        const categoria = await CategoriaProducto.findByPk(req.params.id);
        if (!categoria) return res.status(404).json({ mensaje: "Categoría no encontrada" });

        await categoria.update(req.body, {
            fields: Object.keys(req.body)
        });
        res.json({ mensaje: "Categoría actualizada", data: categoria });
    } catch (error) {
        console.error("Error al actualizar categoría:", error); // Agrega más detalles para depuración
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ mensaje: "Error: El nombre o categoria_id ya está en uso" });
        } else if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ mensaje: "Error de validación", detalles: error.errors });
        } else {
            res.status(500).json({ mensaje: "Error al actualizar categoría", error: error.message });
        }
    }
};

//DELETE

exports.eliminarCategoria = async (req, res) => {
    console.log('🗑️ Parámetros recibidos:', req.params);
    console.log('🗑️ Body recibido:', req.body);
    
    const { id } = req.params;
    console.log('🗑️ ID extraído:', id);
    console.log('🗑️ Tipo de ID:', typeof id);
    
    if (!id) {
        console.log('❌ ID no encontrado en parámetros');
        return res.status(400).json({ mensaje: "El ID de la categoría es obligatorio" });
    }

    try {
        console.log('🔍 Buscando categoría con ID:', id);
        const categoria = await CategoriaProducto.findOne({ where: { categoria_id: id } });
        
        if (!categoria) {
            console.log('❌ Categoría no encontrada');
            return res.status(404).json({ mensaje: "Categoría no encontrada" });
        }
        
        console.log('✅ Categoría encontrada:', categoria.categoria_id);
        await categoria.destroy();
        console.log('✅ Categoría eliminada exitosamente');
        res.json({ mensaje: "Categoría eliminada correctamente" });
    } catch (error) {
        console.error('💥 Error al eliminar categoría:', error);
        res.status(500).json({ mensaje: "Error al eliminar la categoría", error: error.message });
    }
};