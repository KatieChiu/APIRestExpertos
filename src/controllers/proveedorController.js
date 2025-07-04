
const proveedor = require('../models/proveedor');

const Proveedor = require('../models/proveedor');
const {validationResult} = require('express-validator');
exports.listar = async (req, res) => {
    try {
        const proveedores = await proveedor.findAll();
        res.json(proveedores);
    } catch (error) {
        console.error("Error al listar proveedores:", error);
        res.status(500).json({ error: "Error al obtener proveedores" });
    }
};

exports.guardar = async (req, res) => {
    const validacion = validationResult(req);

    if (validacion.errors.length > 0) {
        console.log(validacion.errors);
        return res.status(400).json(validacion.errors);
    }

    const { proveedor_id, nombre, telefono } = req.body;

    try {
        const nuevoProveedor = await proveedor.create({
            proveedor_id,
            nombre,
            telefono
        });
        res.status(201).json(nuevoProveedor);
    } catch (error) {
        console.error("Error al guardar proveedor:", error);
        res.status(500).json({ error: "Error al guardar proveedor" });
    }
}

exports.editar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        console.log("Errores de validación en editar:", errores.array());
        return res.status(400).json(errores.array());
    }

    const { proveedor_id } = req.params;
    const { nombre, telefono } = req.body;

    try {
        const proveedorExiste = await Proveedor.findByPk(proveedor_id); 
        console.log(proveedorExiste);
        if (!proveedorExiste) {
            return res.status(404).json({ mensaje: 'Proveedor no encontrada' });
        }

       
        
        await proveedorExiste.save();

        console.log("Datos actualizados:", nombre, telefono);


    } catch (error) {
        console.error("Error al editar Proveedor:", error);
        return res.status(500).json({ mensaje: 'Error ' });
    }
};

exports.eliminar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        console.log("Errores de validación en eliminar:", errores.array());
        return res.status(400).json(errores.array());
    }

    const { proveedor_id } = req.body;

    try {
        const proveedor = await Proveedor.findByPk(proveedor_id);
        if (!proveedor) {
            return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
        }

        await proveedor.destroy();
        res.json({ mensaje: 'Proveedor eliminado correctamente' });

    } catch (error) {
        console.error("Error al eliminar Proveedor:", error);
        return res.status(500).json({ mensaje: 'Error al eliminar Proveedor' });
    }
};

