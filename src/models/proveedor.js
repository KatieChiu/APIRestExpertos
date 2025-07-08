const {DataTypes} = require('sequelize');
const db = require('../configuration/db');


const Proveedor = db.define('Proveedor', {

  proveedor_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
    
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


module.exports = Proveedor;