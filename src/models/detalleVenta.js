
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');
const Venta = require('./venta');
const Producto = require('./producto');

const DetalleVenta = db.define('DetalleVenta', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  numero_factura: {
    type: DataTypes.STRING(20),
    references: {
      model: Venta,
      key: 'numero_factura'
    }
  },
  codigo_producto: {
    type: DataTypes.STRING(20),
    references: {
      model: Producto,
      key: 'codigo'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
 
}, {
  tableName: 'detalles_venta',
  timestamps: false
});



module.exports = DetalleVenta;

