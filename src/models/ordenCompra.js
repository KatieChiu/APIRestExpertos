
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');
const Proveedor = require('./proveedor');
//const Usuario = require('./users');

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

//agg relacion con usuario


module.exports = OrdenCompra;