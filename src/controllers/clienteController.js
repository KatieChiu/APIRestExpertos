
const cliente = require('../models/clientes');
const {validationResult} = require('express-validator');
const { Op } = require('sequelize');

exports.listar = async (req, res) => {
    try {
        const cl = await cliente.findAll();
        res.json(cl);
    } catch (error) {
        console.error("Error al listar clientes:", error);
        res.status(500).json({ error: "Error al obtener los datos" });
    }
};

exports.guardar = async (req, res) => {
    const validacion = validationResult(req);

    if (validacion.errors.length > 0) {
        console.log(validacion.errors);
        return res.status(400).json(validacion.errors);
    }

    const { id, nombre,email, telefono,direccion } = req.body;

    try {
        // Verificar si el cliente ya existe por cédula
        const clienteExistente = await cliente.findByPk(id);
        if (clienteExistente) {
            return res.status(409).json({ 
                error: "Ya existe un cliente con esta cédula",
                cedula: id 
            });
        }

        // Verificar si el email ya existe
        const clienteConEmail = await cliente.findOne({ where: { email } });
        if (clienteConEmail) {
            return res.status(409).json({ 
                error: "Ya existe un cliente con este email",
                email: email 
            });
        }

        const nuevoCliente = await cliente.create({
           id,
           nombre,
           email,
           telefono,
           direccion
        });
        res.status(201).json(nuevoCliente);
    } catch (error) {
        console.error("Error al guardar", error);
        
        // Manejar error de duplicado de clave primaria (cédula)
        if (error.name === 'SequelizeUniqueConstraintError') {
            if (error.fields && error.fields.PRIMARY) {
                return res.status(409).json({ 
                    error: "Ya existe un cliente con esta cédula",
                    cedula: id 
                });
            }
            
            // Manejar error de email duplicado
            if (error.fields && error.fields.email) {
                return res.status(409).json({ 
                    error: "Ya existe un cliente con este email",
                    email: email 
                });
            }
            
            return res.status(409).json({ 
                error: "Ya existe un cliente con estos datos",
                detalles: error.fields 
            });
        }
        
        // Manejar errores de validación
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ 
                error: "Error de validación",
                detalles: error.errors 
            });
        }
        
        res.status(500).json({ error: "Error al guardar cliente" });
    }
}

exports.editar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        console.log("Errores de validación en editar:", errores.array());
        return res.status(400).json(errores.array());
    }

    const { id } = req.params;
    const { nombre, email, telefono, direccion } = req.body;

    try {
        const clienteExistente = await cliente.findByPk(id); 
        console.log(clienteExistente);
        if (!clienteExistente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }

        // Verificar si el email ya existe en otro cliente
        if (email && email !== clienteExistente.email) {
            const clienteConEmail = await cliente.findOne({ 
                where: { 
                    email: email,
                    id: { [Op.ne]: id } // Excluir el cliente actual
                } 
            });
            if (clienteConEmail) {
                return res.status(409).json({ 
                    error: "Ya existe otro cliente con este email",
                    email: email 
                });
            }
        }

        // Actualizar los campos
        await clienteExistente.update({
            nombre: nombre || clienteExistente.nombre,
            email: email || clienteExistente.email,
            telefono: telefono || clienteExistente.telefono,
            direccion: direccion || clienteExistente.direccion
        });

        console.log("Datos actualizados:", nombre, telefono, direccion);
        res.json({ 
            mensaje: 'Cliente actualizado correctamente',
            cliente: clienteExistente 
        });

    } catch (error) {
        console.error("Error al editar", error);
        
        // Manejar errores de validación
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ 
                error: "Error de validación",
                detalles: error.errors 
            });
        }
        
        return res.status(500).json({ mensaje: 'Error al actualizar cliente' });
    }
};

exports.eliminar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        console.log("Errores de validación en eliminar:", errores.array());
        return res.status(400).json(errores.array());
    }

    const { id } = req.params;

    try {
        const clienteExistente = await cliente.findByPk(id);
        if (!clienteExistente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }


        await clienteExistente.destroy();
        res.json({ mensaje: 'Eliminado correctamente' });


    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        return res.status(500).json({ mensaje: 'Error al eliminar cliente' });
    }
};

