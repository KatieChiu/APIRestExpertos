const { DataTypes } = require('sequelize');
const db = require('../configuration/db');
const OrdenCompra = require('./ordenCompra'); 

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
    },
    numero_orden: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: OrdenCompra, 
            key: 'numero_orden' //FK
        }
    }
}, {
    tableName: 'detalles_recepcion',
    timestamps: true,
});

//(usando numero_orden)
DetalleRecepcion.belongsTo(OrdenCompra, {
    foreignKey: 'numero_orden', 
    targetKey: 'numero_orden'   
});

OrdenCompra.hasMany(DetalleRecepcion, {
    foreignKey: 'numero_orden',
    sourceKey: 'numero_orden'
});

module.exports = DetalleRecepcion;