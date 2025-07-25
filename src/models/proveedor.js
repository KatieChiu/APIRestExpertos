const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/db'); // asegúrate que esta es tu instancia de Sequelize

const Proveedor = sequelize.define('Proveedor', {
  proveedor_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    validate: {
      isEmail: true
    }
  },  
}, {
  tableName: 'proveedores',
  timestamps: true
});

module.exports = Proveedor;
