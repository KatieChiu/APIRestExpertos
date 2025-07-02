const  ventas  = require('../models/venta'); // o como sea que exportes el modelo

const {validationResult}= require('express-validator');
exports.listar = async (req, res) => {
    try {
        const ventas = await ventas.findAll();
        res.json(ventas);
    } catch (error) {
        console.error("Error al listar las ordenes de venta:", error);
        res.status(500).json({ error: "Error al procesar la venta" });
    }
};


exports.guardar = async (req, res) => {
  const validacion = validationResult(req);

  if (validacion.errors.length > 0) {
    console.log(validacion.errors);
    return res.status(400).json(validacion.errors);
  }

  const { numero_factura,total,tipo_pago, estado } = req.body;
      console.log("Datos recibidos para crear una nueva orden de compra:", req.body);
  try {
    const newsales = await ventas.create({
        numero_factura,
        total,
        tipo_pago,
        estado
    });
    res.status(201).json(newsales);
  } catch (error) {
    console.error("Error al proesar venta:", error);
    res.status(500).json({ error: "Error al procesar venta" });
  }
}
exports.editar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        console.log("Errores de validación en editar:", errores.array());
        return res.status(400).json(errores.array());
    }

    const { numero_factura } = req.params;
    const { total, tipo_pago, estado } = req.body;

    try {
        const sales = await ventas.findByPk(numero_factura); 
        console.log(sales);
        if (!sales) {
            return res.status(404).json({ mensaje: 'orden no encontrada' });
        }

       
        await sales.save();

        console.log("Datos actualizados para orden de compra:", numero_factura, total, tipo_pago, estado);

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
        datos: `Registro con numero de factura : ${numero_factura} eliminado`,
    });
};