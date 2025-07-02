//modelo categoriaProducto.js con relacion a producto.js
const { DataTypes } = require('sequelize'); 
const db = require('../configuration/db'); 
//const Producto = require('./producto');
const express = require('express');

const CategoriaProducto = db.define('CategoriaProducto', {
      id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    categoria_id: { 
        type: DataTypes.STRING(20),
       // primaryKey: true, probando corregir el put de categoria
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