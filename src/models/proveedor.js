const {DataTypes} = require('sequelize');
const sequelize = require('../configuration/db');
const ordenCompra= require('./ordenCompra'); 
const Proveedor = sequelize.define('Proveedor', {

const Proveedor = db.define('Proveedor', {
  

  proveedor_id: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    unique: true,
    allowNull: false
    
  },   
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
 
    
})


module.exports = Proveedor;*/