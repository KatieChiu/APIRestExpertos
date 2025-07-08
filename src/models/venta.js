// models/venta.js
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');
const Usuario = require('./users');

const Venta = db.define('Venta', {
    
    numero_factura: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    subtotal: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    iva: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    descuento: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0
    },
    total: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('completada', 'cancelada'),
        defaultValue: 'completada'
    },
    tipo_pago: {
        type: DataTypes.ENUM('efectivo', 'tarjeta', 'transferencia', 'mixto'),
        allowNull: false
    },
    observaciones: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'ventas',
    timestamps: true
});

// Relación con Usuario


module.exports = Venta;