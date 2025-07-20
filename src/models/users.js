
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');
const Persona = require('./persona');

const Usuario = db.define('Usuario', {
    usuario_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    username: { 
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('admin', 'ventas', 'soporte', 'bodega'),
        allowNull: false
    },
    estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo', 'Bloqueado'),
    allowNull: false,
    defaultValue: 'Activo'
    },
    
    persona_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
        model: 'personas',
        key: 'persona_id'
    }
},
}, {
    tableName: 'usuarios',
    timestamps: true
});


module.exports = Usuario;