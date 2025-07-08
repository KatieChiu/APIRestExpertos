
const { validationResult } = require('express-validator');
const CategoriaProducto = require("../models/categoriaProducto");


exports.crearCategoria = async (req, res) => {
    console.log("Datos recibidos:", req.body); // Agrega un log para depuración
    // Validación de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const mensajes = errors.array().map(error => error.msg);
        console.log(mensajes); 
        return res.status(400).json({ mensaje: "Errores de validación", errores: mensajes });
    }

    try {
        const nuevaCategoria = await CategoriaProducto.create(req.body);
        res.status(201).json({ mensaje: "Categoría creada", data: nuevaCategoria });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la categoría", error });
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
    const { categoria_id } = req.params;
    if (!categoria_id) {
        return res.status(400).json({ mensaje: "El categoria_id es obligatorio" });
    }

    try {
        const categoria = await CategoriaProducto.findOne({ where: { categoria_id } });
        if (!categoria) return res.status(404).json({ mensaje: "Categoría no encontrada" });

        await categoria.destroy();
        res.json({ mensaje: "Categoría eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la categoría", error });
    }
};