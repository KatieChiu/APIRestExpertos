const db = require('../configuration/db');

// Import models
const Usuario = require('./users');
const Persona = require('./persona');
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

// RELATIONS

// Usuario - Persona (1:1)
Usuario.belongsTo(Persona, { foreignKey: { name: 'persona_id', allowNull: false }, onDelete: 'CASCADE' });
Persona.hasOne(Usuario, { foreignKey: 'persona_id' });

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

// Usuario - Persona (1:1)
Usuario.belongsTo(Persona, { foreignKey: 'persona_id' });
Persona.hasOne(Usuario, { foreignKey: 'persona_id' });


// Export models and conexion
module.exports = {
  db,
  Usuario,
  Persona,
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
