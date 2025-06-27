// models/persona base
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');

const Persona = db.define('Persona', {
    persona_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    primerNombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    segundoNombre: {
        type: DataTypes.STRING(50)
    },
    primerApellido: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    segundoApellido: {
        type: DataTypes.STRING(50)
    },
    numeroIdentificacion: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING(20)
    },
    email: {
        type: DataTypes.STRING(100),
        validate: {
            isEmail: true
        }
    },
    estadoCivil: {
        type: DataTypes.STRING(20)
    },
    sexo: {
        type: DataTypes.STRING(10)
    },
    direccion: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'personas',
    timestamps: true
});

module.exports = Persona;