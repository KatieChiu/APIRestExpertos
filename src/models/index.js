const db = require('../configuration/db');

// Sequelize models
const Producto = require('./producto');
const CategoriaProducto = require('./categoriaProducto');
const Cliente = require('./clientes');
const Proveedor = require('./proveedor');
const Venta = require('./venta');
const DetalleVenta = require('./detalleVenta');
const OrdenCompra = require('./ordenCompra');
const OrdenCompraDetalle = require('./ordenCompraDetalle');
const DetalleRecepcion = require('./detalleRecepcion');
const ConfiguracionCaja = require('./confCaja');
const MovimientoCaja = require('./movimiento');

// Mongoose (para Persona y Usuario)
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/miapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Usuario = require('./users');   // Modelo mongoose
const Persona = require('./persona'); // Modelo mongoose

// RELATIONS SOLO PARA SEQUELIZE

// Producto - CategoriaProducto (N:1)
Producto.belongsTo(CategoriaProducto, { foreignKey: 'categoria_id' });
CategoriaProducto.hasMany(Producto, { foreignKey: 'categoria_id' });

// Venta - DetalleVenta (1:N)
Venta.hasMany(DetalleVenta, { foreignKey: 'numero_factura' });
DetalleVenta.belongsTo(Venta, { foreignKey: 'numero_factura' });

// Producto - DetalleVenta (1:N)
Producto.hasMany(DetalleVenta, { foreignKey: 'codigo_producto' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'codigo_producto' });

// OrdenCompra - DetalleRecepcion (1:N)
OrdenCompra.hasMany(DetalleRecepcion, { foreignKey: 'numero_orden' });
DetalleRecepcion.belongsTo(OrdenCompra, { foreignKey: 'numero_orden' });

// Producto - DetalleRecepcion (1:N)
Producto.hasMany(DetalleRecepcion, { foreignKey: 'codigo_producto' });
DetalleRecepcion.belongsTo(Producto, { foreignKey: 'codigo_producto' });

// OrdenCompra - OrdenCompraDetalle (1:N)
OrdenCompra.hasMany(OrdenCompraDetalle, { foreignKey: 'numero_orden' });
OrdenCompraDetalle.belongsTo(OrdenCompra, { foreignKey: 'numero_orden' });

// Producto - OrdenCompraDetalle (1:N)
Producto.hasMany(OrdenCompraDetalle, { foreignKey: 'codigo_producto' });
OrdenCompraDetalle.belongsTo(Producto, { foreignKey: 'codigo_producto' });

// Proveedor - OrdenCompra (1:N)
Proveedor.hasMany(OrdenCompra, { foreignKey: 'proveedor_id' });
OrdenCompra.belongsTo(Proveedor, { foreignKey: 'proveedor_id' });

// Exportar Sequelize y Mongoose
module.exports = {
  // Conexiones
  db,       // Sequelize
  mongoose, // Mongoose
  // Modelos Mongo
  Usuario,
  Persona,
  // Modelos SQL
  Producto,
  CategoriaProducto,
  Cliente,
  Proveedor,
  Venta,
  DetalleVenta,
  OrdenCompra,
  OrdenCompraDetalle,
  DetalleRecepcion,
  ConfiguracionCaja,
  MovimientoCaja,
};
