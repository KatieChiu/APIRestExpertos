// este modelo es para tener una compra con varios productos 
//Katie Chiu
const {DataTypes}= require('sequelize');
const OrdenCompra = require('./ordenCompra');
const Producto = require('./producto');
const db = require('../configuration/db');

const OrdenCompraDetalle = db.define('OrdenCompraDetalle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero_orden: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: OrdenCompra,
      key: 'numero_orden'
    }
  },
  codigo_producto: {
    type: DataTypes.STRING(36),
    allowNull: false,
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
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'ordencompra_detalle',
  timestamps: false
});

// una compra tiene varios detalles de productos
OrdenCompra.hasMany(OrdenCompraDetalle, {
  foreignKey: 'numero_orden'
});
// cada detalle de compra pertenece a una orden de compra
OrdenCompraDetalle.belongsTo(OrdenCompra, {
  foreignKey: 'numero_orden'
});
//un producto puede estar en varos detallles de compra
Producto.hasMany(OrdenCompraDetalle, {
  foreignKey: 'codigo_producto'
});
// cada detalle de compra pertenece a un producto
OrdenCompraDetalle.belongsTo(Producto, {
  foreignKey: 'codigo_producto'
});


module.exports = OrdenCompraDetalle;
