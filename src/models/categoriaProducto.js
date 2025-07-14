//modelo categoriaProducto.js con relacion a producto.js
const { DataTypes } = require('sequelize'); 
const db = require('../configuration/db'); 
//const Producto = require('./producto');
const express = require('express');

const CategoriaProducto = db.define('CategoriaProducto', {
 
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