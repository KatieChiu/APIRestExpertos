// models/producto.js
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');
const CategoriaProducto = require('./categoriaProducto');
//const Proveedor = require('./proveedor');

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
  categoria_id: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: {
      model: CategoriaProducto, // Nombre del modelo relacionado
      key: 'categoria_id' // Clave primaria de la tabla de categorias_productos
    }
<<<<<<< Updated upstream
  }
=======
  },
>>>>>>> Stashed changes
}, {
  tableName: 'productos',
  timestamps: true
});






module.exports = Producto;