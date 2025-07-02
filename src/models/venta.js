// models/venta.js
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');
//const Usuario = require('./users');
const Producto = require('./producto');
const Venta = db.define('Venta', {
    //cambiamos PK a numero_factura
    
    numero_factura: {
        type: DataTypes.STRING(20),
        primaryKey: true,
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

Venta.belongsTo(Producto, {
    foreignKey: {
        name: 'producto_id',
        allowNull: false
    }
});

Producto.hasMany(Venta, {
    foreignKey: 'producto_id'
});
// Relación con Usuario
//Venta.belongsTo(Usuario, {foreignKey: {name: 'usuario_id', allowNull: false}});

//Usuario.hasMany(Venta, {foreignKey: 'usuario_id'});

module.exports = Venta;