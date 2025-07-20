// models/producto.js
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');
const CategoriaProducto = require('./categoriaProducto');
//const Proveedor = require('./proveedor');
const fs = require('fs');
const path = require('path');

const rutaCarpeta = path.join(__dirname, '../uploads/imagenes-productos');
if (!fs.existsSync(rutaCarpeta)) {
    fs.mkdirSync(rutaCarpeta, { recursive: true });
}

const Producto = db.define('Producto', {

   
  codigo: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: DataTypes.TEXT,
  precio_venta: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  precio_compra: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  stock_minimo: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  stock_actual: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  imagen: { 
    type: DataTypes.STRING(255),
    allowNull: true
  },
  categoria_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: {
      model: CategoriaProducto,
      key: 'categoria_id'
    }
  },
}, {
  tableName: 'productos',
  timestamps: true
});






module.exports = Producto;