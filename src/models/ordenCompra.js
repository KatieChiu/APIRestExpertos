// This file defines the OrdenCompra model for managing purchase orders in the system.
const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexion');
const Proveedor = require('./proveedor');
const Usuario = require('./usuario');

const OrdenCompra = db.define('OrdenCompra', {
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    numero_orden: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false,
        unique: true
    },
    fecha_emision: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    fecha_entrega_esperada: {
        type: DataTypes.DATE
    },
    subtotal: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    iva: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'parcial', 'completada', 'cancelada'),
        defaultValue: 'pendiente'
    },
    observaciones: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'ordenes_compra',
    timestamps: true
});

// Relación con Proveedor
OrdenCompra.belongsTo(Proveedor, {
    foreignKey: {
        name: 'proveedor_id',
        allowNull: false
    }
});

Proveedor.hasMany(OrdenCompra, {
    foreignKey: 'proveedor_id'
});

// Relación con Usuario
OrdenCompra.belongsTo(Usuario, {
    foreignKey: {
        name: 'usuario_id',
        allowNull: false
    }
});

Usuario.hasMany(OrdenCompra, {
    foreignKey: 'usuario_id'
});

module.exports = OrdenCompra;