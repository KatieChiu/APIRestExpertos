// models/producto.js
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');
const CategoriaProducto = require('./categoriaProducto');
//const Proveedor = require('./proveedor');

const Producto = db.define('Producto', {
    producto_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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

// Relación con CategoriaProducto
Producto.belongsTo(CategoriaProducto, {
    foreignKey: {
        name: 'categoria_id',
        allowNull: false,
        type: DataTypes.STRING(20)
    }
});

CategoriaProducto.hasMany(Producto, {
    foreignKey: 'categoria_id'
});

// Relación con Proveedor 
/*Producto.belongsTo(Proveedor, {
    foreignKey: {
        name: 'proveedor_id',
        allowNull: false
    }
});

Proveedor.hasMany(Producto, {foreignKey: 'proveedor_id'});*/

module.exports = Producto;