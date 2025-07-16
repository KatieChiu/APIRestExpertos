
const Producto = require("../models/producto");
const CategoriaProducto = require("../models/categoriaProducto");
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

// CREAR PRODUCTO
exports.crearProducto = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const mensajes = errors.array().map(error => error.msg);
        return res.status(400).json({ mensaje: "Errores de validación", errores: mensajes });
    }

    try {
        // Si se subió imagen, la guardamos en el campo
        if (req.file) {
            req.body.imagen = '/uploads/imagenes-productos/' + req.file.filename;
        }


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

// ACTUALIZAR IMAGEN DE PRODUCTO
exports.actualizarImagenProducto = async (req, res) => {
    const { codigo } = req.params;
    if (!req.file) {
        return res.status(400).json({ mensaje: 'No se envió imagen' });
    }

    try {
        const producto = await Producto.findOne({ where: { codigo } });
        if (!producto) {
            // Elimina la imagen recién subida si el producto no existe
            fs.unlinkSync(req.file.path);
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        // Elimina la imagen anterior si existe
        if (producto.imagen) {
            const rutaAnterior = path.join(__dirname, '../uploads/imagenes-productos', path.basename(producto.imagen));
            if (fs.existsSync(rutaAnterior)) {
                fs.unlinkSync(rutaAnterior);
            }
        }

        producto.imagen = '/uploads/imagenes-productos/' + req.file.filename;
        await producto.save();

        res.json({ mensaje: 'Imagen actualizada correctamente', imagen: producto.imagen });
    } catch (error) {
        // Si ocurre un error, elimina la imagen recién subida
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        console.error('Error al actualizar imagen:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la imagen del producto', error: error.message });
    }
};

// ELIMINAR IMAGEN DE PRODUCTO
exports.eliminarImagenProducto = async (req, res) => {
    const { codigo } = req.params;
    try {
        const producto = await Producto.findOne({ where: { codigo } });
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        if (!producto.imagen) {
            return res.status(400).json({ mensaje: 'El producto no tiene imagen para eliminar' });
        }
        const rutaImagen = path.join(__dirname, '../uploads/imagenes-productos', path.basename(producto.imagen));
        if (fs.existsSync(rutaImagen)) {
            fs.unlinkSync(rutaImagen);
        }
        producto.imagen = null;
        await producto.save();
        res.json({ mensaje: 'Imagen eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar imagen:', error);
        res.status(500).json({ mensaje: 'Error al eliminar la imagen del producto', error: error.message });
    }
};


