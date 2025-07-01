// models/producto.js
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');
const CategoriaProducto = require('./categoriaProducto');


const Producto = db.define('Producto', {
    producto_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    codigo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
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
    }
}, {
    tableName: 'productos',
    timestamps: true
});





module.exports = Producto;