// models/usuario.js
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
    }
}, {
    tableName: 'usuarios',
    timestamps: true
});

// Relación 1:1 (Usuario hereda de Persona)
Usuario.belongsTo(Persona, {
    foreignKey: {
        name: 'persona_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

Persona.hasOne(Usuario, {
    foreignKey: 'persona_id'
});

module.exports = Usuario;