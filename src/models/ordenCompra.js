
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');

const Proveedor = require('./proveedor');

const OrdenCompra = db.define('OrdenCompra', {
  numero_orden: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  fecha_emision: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  fecha_entrega_esperada: DataTypes.DATE,
  subtotal: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  iva: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'parcial', 'completada', 'cancelada'),
    defaultValue: 'pendiente'
  },
  observaciones: DataTypes.TEXT,
  proveedor_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: {
      model: Proveedor,
      key: 'proveedor_id'
    }
  }
}, {
  tableName: 'ordencompra',
  timestamps: true
});

// Relación con Proveedor
OrdenCompra.belongsTo(Proveedor, {
  foreignKey: 'proveedor_id'
});
Proveedor.hasMany(OrdenCompra, {
  foreignKey: 'proveedor_id'

});

module.exports = OrdenCompra;

