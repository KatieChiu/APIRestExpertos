
const proveedor = require('../models/proveedor');
const {validationResult} = require('express-validator');
const { Op } = require('sequelize');

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

    const { nombre, telefono, email } = req.body;

    try {
        // Verificar si el email ya existe
        const proveedorConEmail = await proveedor.findOne({ where: { email } });
        if (proveedorConEmail) {
            return res.status(409).json({ 
                error: "Ya existe un proveedor con este email",
                email: email 
            });
        }

        const nuevoProveedor = await proveedor.create({
            nombre,
            telefono,
            email
        });
        res.status(201).json(nuevoProveedor);
    } catch (error) {
        console.error("Error al guardar proveedor:", error);
        if (error.name === 'SequelizeUniqueConstraintError' && error.fields && error.fields.email) {
            return res.status(409).json({ 
                error: "Ya existe un proveedor con este email",
                email: email 
            });
        }
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
    const { nombre, telefono, email } = req.body;

    try {
        const proveedorExiste = await proveedor.findByPk(proveedor_id); 
        if (!proveedorExiste) {
            return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
        }

        // Verificar si el email ya existe en otro proveedor
        if (email && email !== proveedorExiste.email) {
            const proveedorConEmail = await proveedor.findOne({ 
                where: { 
                    email: email,
                    proveedor_id: { [Op.ne]: proveedor_id }
                } 
            });
            if (proveedorConEmail) {
                return res.status(409).json({ 
                    error: "Ya existe otro proveedor con este email",
                    email: email 
                });
            }
        }

        // Actualizar los campos
        await proveedorExiste.update({
            nombre: nombre || proveedorExiste.nombre,
            telefono: telefono || proveedorExiste.telefono,
            email: email || proveedorExiste.email
        });

        res.json({ 
            mensaje: 'Proveedor actualizado correctamente',
            proveedor: proveedorExiste 
        });

    } catch (error) {
        console.error("Error al editar proveedor:", error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ 
                error: "Error de validación",
                detalles: error.errors 
            });
        }
        return res.status(500).json({ mensaje: 'Error al actualizar proveedor' });
    }
};

exports.eliminar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        console.log("Errores de validación en eliminar:", errores.array());
        return res.status(400).json(errores.array());
    }

    const { proveedor_id } = req.params;

    try {
        const proveedorExiste = await proveedor.findByPk(proveedor_id);
        if (!proveedorExiste) {
            return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
        }

        await proveedorExiste.destroy();
        res.json({ mensaje: 'Proveedor eliminado correctamente' });

    } catch (error) {
        console.error("Error al eliminar proveedor:", error);
        return res.status(500).json({ mensaje: 'Error al eliminar proveedor' });
    }
};

