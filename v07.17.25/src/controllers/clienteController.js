
const cliente = require('../models/clientes');
const {validationResult} = require('express-validator');
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
        res.status(500).json({ error: "Error al guardar " });
    }
}

exports.editar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        console.log("Errores de validación en editar:", errores.array());
        return res.status(400).json(errores.array());
    }

    const { id } = req.params;
    const { nombre, telefono, direccion } = req.body;

    try {
        const clienteExistente = await cliente.findByPk(id); 
        console.log(clienteExistente);
        if (!proveedorExiste) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }

       
        
        await clienteExistente.save();

        console.log("Datos actualizados:", nombre, telefono, direccion);


    } catch (error) {
        console.error("Error al editar", error);
        return res.status(500).json({ mensaje: 'Error ' });
    }
};

exports.eliminar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        console.log("Errores de validación en eliminar:", errores.array());
        return res.status(400).json(errores.array());
    }

    const { id } = req.body;

    try {
        const cliente = await cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ mensaje: ' No encontrado' });
        }

        await proveedor.destroy();
        res.json({ mensaje: 'Eliminado correctamente' });

    } catch (error) {
        console.error("Error al eliminar :", error);
        return res.status(500).json({ mensaje: 'Error al eliminar ' });
    }
};

