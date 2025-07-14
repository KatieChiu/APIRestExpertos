const {DataTypes} = require('sequelize');
const db =require('../configuration/db');

const Cliente= db.define('Cliente', {
    id: { // este id es la identificación del cliente CEDULA    
        type: DataTypes.STRING(13),
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
            is: /^[0-9]+$/i // Solo números
        }
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }

}, {
    tableName: 'clientes',
    timestamps: true, 
   
}); 

module.exports = Cliente;

