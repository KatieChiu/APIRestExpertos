
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');

const ConfiguracionCaja = db.define('ConfiguracionCaja', {
    caja_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
  saldo_inicial: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'configuracion_caja',
  timestamps: false
});

module.exports = ConfiguracionCaja;
