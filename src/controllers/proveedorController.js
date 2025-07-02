const proveedor = require('../models/proveedor');

const {validatotionResult} = require('express-validator');
exports.listar = async (req, res) => {
    try {
        const proveedores = await proveedor.findAll();
        res.json(proveedores);
    } catch (error) {
        console.error("Error al listar proveedores:", error);
        res.status(500).json({ error: "Error al obtener proveedores" });
    }
};
