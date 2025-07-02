const  ordenCompra  = require('../models/ordenCompra'); // o como sea que exportes el modelo

const {validationResult}= require('express-validator');
exports.listar = async (req, res) => {
    try {
        const ordenCompra = await ordenCompra.findAll();
        res.json(ordenCompra);
    } catch (error) {
        console.error("Error al listar las ordenes de compra:", error);
        res.status(500).json({ error: "Error al obtener compras" });
    }
};


exports.guardar = async (req, res) => {
  const validacion = validationResult(req);

  if (validacion.errors.length > 0) {
    console.log(validacion.errors);
    return res.status(400).json(validacion.errors);
  }

  const { fecha_emision, fecha_entrega_esperada, subtotal, iva, total, estado,observaciones } = req.body;
      console.log("Datos recibidos para crear una nueva orden de compra:", req.body);
  try {
    const nuevaCompra = await ordenCompra.create({
        fecha_emision,
        fecha_entrega_esperada,
        subtotal,
        iva,
        total,
        estado,
        observaciones
    });
    res.status(201).json(nuevaCompra);
  } catch (error) {
    console.error("Error al guardar compra:", error);
    res.status(500).json({ error: "Error al guardar compra" });
  }
}
exports.editar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        console.log("Errores de validación en editar:", errores.array());
        return res.status(400).json(errores.array());
    }

    const { numero_orden } = req.params;
    const {  } = req.body;

    try {
        const ordenExistente = await ordenCompra.findByPk(numero_orden); 
        console.log(ordenExistente);
        if (!ordenExistente) {
            return res.status(404).json({ mensaje: 'orden no encontrada' });
        }

       
        await ordenExistente.save();

        console.log("Datos actualizados para orden de compra:", numero_orden);

        //return res.json({ mensaje: 'Carrera actualizada correctamente', carrera: carreraExistente });

    } catch (error) {
        console.error("Error al editar la orden:", error);
        return res.status(500).json({ mensaje: 'Error ' });
    }
};


exports.eliminar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        console.log("Errores de validación en eliminar:", errores.array());
        return res.status(400).json(errores.array());
    }

    const { numero_orden } = req.body;

    console.log("ID recibido para eliminar:", req.body);
    res.json({
        datos: `Registro con numero de orden : ${numero_orden} eliminado`,
    });
};