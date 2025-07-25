const MovimientoCaja = require('../models/movimiento');
const ConfiguracionCaja = require('../models/confCaja');
const { Op } = require('sequelize');

const obtenerSaldoCaja = async (req, res) => {
  try {
    const config = await ConfiguracionCaja.findOne();
    const saldo_inicial = parseFloat(config?.saldo_inicial || 0);
    const fecha_config = config?.fecha;

    const inicioDia = new Date(fecha_config);
    inicioDia.setHours(0, 0, 0, 0); //aquí se limpia la hora
    
    const movimientos = await MovimientoCaja.findAll({
      where: {
        fecha: {
          [Op.gte]: inicioDia
        }
      }
    });
    console.log(inicioDia);

    const total_ingresos = movimientos.filter(m => m.tipo === 'ingreso').reduce((sum, m) => sum + parseFloat(m.monto), 0);

    const total_egresos = movimientos
      .filter(m => m.tipo === 'egreso')
      .reduce((sum, m) => sum + parseFloat(m.monto), 0);

    const saldo_actual = saldo_inicial + total_ingresos - total_egresos;

    res.json({
      fecha_config,
      saldo_inicial,
      total_ingresos,
      total_egresos,
      saldo_actual
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el saldo de caja' });
  }
};

module.exports = {
  obtenerSaldoCaja
};
