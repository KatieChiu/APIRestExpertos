const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./configuration/db.js');

const Usuario = require('./models/users.js');
const Persona = require('./models/persona.js');
const Cliente = require('./models/clientes.js');
const CategoriaProducto = require('./models/categoriaProducto.js');
const Producto = require('./models/producto.js');
const Proveedor = require('./models/proveedor.js');
const Venta = require('./models/venta.js');
const DetalleVenta = require('./models/detalleVenta.js');
const OrdenCompra = require('./models/ordenCompra.js');
const OrdenCompraDetalle = require('./models/ordenCompraDetalle.js');
const DetalleRecepcion = require('./models/detalleRecepcion.js');
const MovimientoCaja = require('./models/movimiento.js');
const ConfiguracionCaja = require('./models/confCaja.js');

require('./models/relacionesTransaccionesUsuario.js'); // relaciones

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configuration/swagger.js');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos para imágenes
app.use('/uploads', express.static('./src/uploads'));

// Rutas
app.use('/proveedor', require('./routes/proveedorRoute'));
app.use('/ordenCompra', require('./routes/ordenCompraRoute'));
app.use('/venta', require('./routes/ventaRoute'));
app.use('/producto', require('./routes/productoRoute'));
app.use('/categoria', require('./routes/categoriaProductoRoute'));
app.use('/Recepcion', require('./routes/detalleRecepcionRoute'));
app.use('/cliente', require('./routes/clienteRoute'));
app.use('/saldo', require('./routes/cajaRoute'));
app.use('/confCaja', require('./routes/confCajaRoute'));

//Auth
app.use('/api/auth', require('./routes/auth.routes'));

// Usuarios
app.use('/users', require('./routes/userRoutes'));
app.use('/persona', require('./routes/personRoutes'));

// Imagen de perfil
app.use('/imagen-perfil', require('./routes/imagenPerfilRoute'));

// Correo
app.use('/correo', require('./routes/correoRoute'));

// Orden detalle
app.use('/ordenDetalle', require('./routes/ordenDetalleRoute'));

// cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());


// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Root
app.get('/', (req, res) => {
  res.send('Servidor Express activo');
});

// DB Sync ordenado
db.authenticate().then(async () => {
  console.log("✅ Conexión establecida con la BD");

  await CategoriaProducto.sync();
  await Producto.sync();

  await Proveedor.sync();
  await Persona.sync();
  await Cliente.sync();

  await Usuario.sync();

  await Venta.sync();
  await DetalleVenta.sync();

  await OrdenCompra.sync();
  await OrdenCompraDetalle.sync();
  await DetalleRecepcion.sync();

  await ConfiguracionCaja.sync();
  await MovimientoCaja.sync();

  console.log("✅ Tablas sincronizadas correctamente");
}).catch(console.error);

module.exports = app;
