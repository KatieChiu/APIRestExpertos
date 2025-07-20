
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
    profileImage: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'default_profile_image.png'
    },
    persona_id: {
    type: DataTypes.INTEGER,
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