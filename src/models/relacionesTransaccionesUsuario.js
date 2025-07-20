// Manejo de Relaciones con las trasnsacciones del usuario

const Usuario = require('./users');
const Venta = require('./venta');
const OrdenCompra = require('./ordenCompra');

// Usuario tiene muchas ventas
Usuario.hasMany(Venta, {
  foreignKey: 'usuario_id',
  as: 'ventas'
});
Venta.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

// Usuario tiene muchas ordenes de compra
Usuario.hasMany(OrdenCompra, {
  foreignKey: 'usuario_id',
  as: 'compras'
});
OrdenCompra.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

OrdenCompra.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
