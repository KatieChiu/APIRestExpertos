// this models define the new products coming into stock
const { DataTypes } = require('sequelize');
const db = require('../configuration/db');
const DetalleOrdenCompra = require('./detalleOrdenCompra');

const DetalleRecepcion = db.define('DetalleRecepcion', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    cantidad_recibida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    lote: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    fecha_vencimiento: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fecha_recepcion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'detalles_recepcion',
    timestamps: true,
   
});

// Relación con DetalleOrdenCompra
DetalleRecepcion.belongsTo(DetalleOrdenCompra, {
    foreignKey: {
        name: 'detalle_orden_id',
        allowNull: false
    },
    onDelete: 'RESTRICT' // Evitamos borrar si hay recepciones
});

DetalleOrdenCompra.hasMany(DetalleRecepcion, {
    foreignKey: 'detalle_orden_id'
});

module.exports = DetalleRecepcion;