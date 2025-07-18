// models/MovimientoCaja.js
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');

const MovimientoCaja = db.define('MovimientoCaja', {
  tipo: {
    type: DataTypes.ENUM('ingreso', 'egreso'),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  numero_factura: { //op
    type: DataTypes.STRING(20),
    allowNull: true

  },
  numero_orden: { //op
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  tableName: 'movimientos_caja',
  timestamps: true
});

module.exports = MovimientoCaja;
