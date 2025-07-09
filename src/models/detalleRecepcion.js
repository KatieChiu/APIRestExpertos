const { DataTypes } = require('sequelize');
const db = require('../configuration/db');
const OrdenCompra = require('./ordenCompra'); 
const Producto = require('./producto'); // Asegúrate de que la ruta sea correcta

const DetalleRecepcion = db.define('DetalleRecepcion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
     numero_orden: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: OrdenCompra, 
            key: 'numero_orden' //FK
        }
    },
     codigo_producto: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: Producto, 
            key: 'codigo' //FK
        }
    },
    cantidad_recibida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
   
    fecha_recepcion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
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

//(usando codigo_producto)
DetalleRecepcion.belongsTo(Producto, {
    foreignKey: 'codigo_producto', 
    targetKey: 'codigo' 
});
Producto.hasMany(DetalleRecepcion, {
    foreignKey: 'codigo_producto',
    sourceKey: 'codigo'
});


module.exports = DetalleRecepcion;

//Erick Blanco