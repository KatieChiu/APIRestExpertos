/*const {DataTypes} = require('sequelize');
const sequelize = require('../configuration/db');
const ordenCompra= require('./ordenCompra'); 
const Proveedor = sequelize.define('Proveedor', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },  
  proveedor_id: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    
  },   
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    
})


module.exports = Proveedor;*/