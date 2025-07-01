const {DataTypes} = require('sequelize');
const db = require('../configuration/db');


const Proveedor = db.define('Proveedor', {
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


module.exports = Proveedor;