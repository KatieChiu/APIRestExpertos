const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');

dotenv.config(); // Cargar variables de entorno

//const db = require('./configuration/db');
const swaggerSpec = require('./configuration/swagger');

// Modelos (asegúrate que las relaciones están en sus respectivos archivos)
// const CategoriaProducto = require('./models/categoriaProducto');
// const Cliente = require('./models/clientes');
// const ConfiguracionCaja = require('./models/confCaja');
// const DetalleRecepcion = require('./models/detalleRecepcion');
// const DetalleVenta = require('./models/detalleVenta');
// const MovimientoCaja = require('./models/movimiento');
// const OrdenCompra = require('./models/ordenCompra');
// const OrdenCompraDetalle = require('./models/ordenCompraDetalle');
// const Persona = require('./models/persona');
// const Producto = require('./models/producto');
// const Proveedor = require('./models/proveedor');
// const Usuario = require('./models/users');
// const Venta = require('./models/venta');
const { db } = require('./models');

// Rutas
const proveedorRoutes = require('./routes/proveedorRoute');
const ordenCompraRoutes = require('./routes/ordenCompraRoute');
const ventaRoutes = require('./routes/ventaRoute');
const productoRoutes = require('./routes/productoRoute');
const categoriaRoutes = require('./routes/categoriaProductoRoute');
const recepcionRoutes = require('./routes/detalleRecepcionRoute');
const clienteRoutes = require('./routes/clienteRoute');
const cajaRoutes = require('./routes/cajaRoute');
const confCajaRoutes = require('./routes/confCajaRoute');
// const authRoutes = require('./src/routes/auth.routes');
// const { crearUsuarioMaestro } = require('./src/controllers/auth.controller');

const { crearUsuarioMaestro } = require('./controllers/auth.controller');
crearUsuarioMaestro(); // se ejecuta al iniciar


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

const app = express();
// Usuario Maestro
app.use('/api/auth', require('./routes/auth.routes'));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Servir archivos estáticos de la carpeta uploads
app.use('/uploads', express.static(__dirname + '/uploads'));

// Registrar usuario si tiene el rol Maestro
app.use('/admin', require('./routes/admin.routes'));

// Rutas básicas
app.get('/', (req, res) => {
  res.send('Servidor Express activo');
});

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Rutas API
app.use('/proveedor', proveedorRoutes);
app.use('/ordenCompra', ordenCompraRoutes);
app.use('/venta', ventaRoutes);
app.use('/producto', productoRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/recepcion', recepcionRoutes);
app.use('/cliente', clienteRoutes);
app.use('/saldo', cajaRoutes);
app.use('/confCaja', confCajaRoutes);
// app.use('/api/auth', authRoutes);

// Conexión y sincronización de base de datos
db.authenticate()
  .then(async () => {
    console.log('Conexión con la base de datos establecida');

    await db.sync({ alter: true }); // Solo para desarrollo (cambiar en producción)
    console.log('Modelos sincronizados');
  })
  .catch((err) => {
    console.error(' Error al conectar con la base de datos:', err);
  });

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
