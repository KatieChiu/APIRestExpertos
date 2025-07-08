//modelo categoriaProducto.js con relacion a producto.js
const { DataTypes } = require('sequelize'); 
const db = require('../configuration/db'); // Asegúrate de que la ruta sea correcta
const Producto = require('./producto');
const e = require('express');

const CategoriaProducto = db.define('CategoriaProducto', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,       
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
     categoria_id: { 
        type: DataTypes.STRING(36),    
        allowNull: false,
        unique: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'categorias_productos',
    timestamps: true
});







module.exports = CategoriaProducto; 