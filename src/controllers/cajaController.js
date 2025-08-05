const MovimientoCaja = require('../models/movimiento');
const ConfiguracionCaja = require('../models/confCaja');
const { Op, fn, col, where, literal } = require('sequelize');

const obtenerSaldoCaja = async (req, res) => {
  try {

    const ahora = new Date();//toma la fecha actual del servidor de donde esta corriendo node.js
    const year = ahora.getFullYear();
    const month = String(ahora.getMonth() + 1).padStart(2, '0'); 
    const day = String(ahora.getDate()).padStart(2, '0');

    const hoyLocalISO = `${year}-${month}-${day}`;
    console.log(hoyLocalISO);  // Ejemplo: "2025-08-04"

    const hoyISO = new Date().toISOString().split('T')[0];
    console.log("esta es la fecha de hoy ISO"+ hoyLocalISO); //observar si esta tomando la fecha de HOY EN EL PINCHE HONDURAS
  
    const config = await ConfiguracionCaja.findOne({
      where: where(fn('DATE', col('fecha')), hoyLocalISO)
    });

    if (!config) {
      return res.status(404).json({ mensaje: 'No hay configuración de caja para esa fecha' });
    }

    const saldo_inicial = parseFloat(config.saldo_inicial || 0);

    const movimientos = await MovimientoCaja.findAll({
      where: where(fn('DATE', col('fecha')), hoyLocalISO)
    });

    const total_ingresos = movimientos
      .filter(m => m.tipo === 'ingreso')
      .reduce((sum, m) => sum + parseFloat(m.monto), 0);

    const total_egresos = movimientos
      .filter(m => m.tipo === 'egreso')
      .reduce((sum, m) => sum + parseFloat(m.monto), 0);

    const saldo_actual = saldo_inicial + total_ingresos - total_egresos;
 
    res.json({
      caja_id: config.caja_id,
      fecha: hoyLocalISO,
      saldo_inicial,
      total_ingresos,
      total_egresos,
      saldo_actual
    });
    
  } catch (error) {
    console.error(' Error en obtenerSaldoCaja:', error);
    res.status(500).json({ mensaje: 'Error al obtener el saldo de caja' });
  }
};

module.exports = {
  obtenerSaldoCaja
};
