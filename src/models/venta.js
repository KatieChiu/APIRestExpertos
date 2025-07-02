// models/venta.js
/*const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const Usuario = require('./usuario');

const Venta = db.define('Venta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    numero_factura: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
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
Venta.belongsTo(Usuario, {
    foreignKey: {
        name: 'usuario_id',
        allowNull: false
    }
});

Usuario.hasMany(Venta, {
    foreignKey: 'usuario_id'
});

module.exports = Venta;*/