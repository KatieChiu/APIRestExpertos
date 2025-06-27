// models/detalleVenta.js
const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const Venta = require('./venta');
const Producto = require('./producto');

const DetalleVenta = db.define('DetalleVenta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    descuento: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0
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
    }
}, {
    tableName: 'detalles_venta',
    timestamps: true
});

// Relación con Venta
DetalleVenta.belongsTo(Venta, {
    foreignKey: {
        name: 'venta_id',
        allowNull: false
    }
});

Venta.hasMany(DetalleVenta, {
    foreignKey: 'venta_id'
});

// Relación con Producto
DetalleVenta.belongsTo(Producto, {
    foreignKey: {
        name: 'producto_id',
        allowNull: false
    }
});

Producto.hasMany(DetalleVenta, {
    foreignKey: 'producto_id'
});

module.exports = DetalleVenta;