
const Producto = require("../models/producto");
const CategoriaProducto = require("../models/categoriaProducto");
const { validationResult } = require('express-validator'); // Importa validationResult

exports.crearProducto = async (req, res) => {
    // Verifica los errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const mensajes = errors.array().map(error => error.msg);
        console.log(mensajes); 
        return res.status(400).json({ mensaje: "Errores de validación", errores: mensajes });
    }

    try {
        const nuevoProducto = await Producto.create(req.body);
        res.status(201).json({ mensaje: "Producto creado", data: nuevoProducto });
    } catch (error) {
        console.error("Error al crear producto:", error);
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json({ mensaje: "Error: El categoria_id no existe o es inválido" });
        } else if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ mensaje: "Error de validación", detalles: error.errors });
        } else {
            res.status(500).json({ mensaje: "Error al crear producto", error: error.message });
        }
    }
};

//READ (todos)
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({ include: CategoriaProducto });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener productos", error });
    }
};

//READ (uno)
exports.obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.codigo, { include: CategoriaProducto });
        if (!producto) return res.status(404).json({ mensaje: "No encontrado" });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar producto", error });
    }
};

// UPDATE
exports.actualizarProducto = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const mensajes = errors.array().map(error => error.msg);
        return res.status(400).json({ mensaje: "Errores de validación", errores: mensajes });
    }

    try {
        const producto = await Producto.findByPk(req.params.codigo);
        if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

        if (req.body.categoria_id) {
            const categoria = await CategoriaProducto.findOne({ where: { categoria_id: req.body.categoria_id } });
            if (!categoria) {
                return res.status(400).json({ mensaje: "Error: categoria_id no existe" });
            }
        }

        await producto.update(req.body, {
            fields: Object.keys(req.body)
        });
        res.json({ mensaje: "Producto actualizado correctamente", data: producto });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json({ mensaje: "Error: El categoria_id no existe o es inválido" });
        } else if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ mensaje: "Error de validación", detalles: error.errors });
        } else {
            res.status(500).json({ mensaje: "Error al actualizar producto", error: error.message });
        }
    }
};

//DELETE
exports.eliminarProductoPorCodigo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const mensajes = errors.array().map(error => error.msg);
        return res.status(400).json({ mensaje: "Errores de validación", errores: mensajes });
    }

    const { codigo } = req.params;
    try {
        const producto = await Producto.findOne({ where: { codigo } });
        if (!producto) return res.status(404).json({ mensaje: "No encontrado" });

        await producto.destroy();
        res.json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar producto", error: error.message });
    }
};