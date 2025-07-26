const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const { crearUsuarioMaestro } = require('./controllers/auth.controller');


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
const userRoutes = require('./routes/userRoutes');
const personaRoutes = require('./routes/personRoutes');
const authRoutes = require('./routes/auth.routes');

require('./models/relacionesTransaccionesUsuario.js');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configuration/swagger.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/admin', require('./routes/admin.routes'));

app.get('/', (req, res) => {
  res.send('Servidor Express activo');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/proveedor', proveedorRoutes);
app.use('/ordenCompra', ordenCompraRoutes);
app.use('/venta', ventaRoutes);
app.use('/producto', productoRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/recepcion', recepcionRoutes);
app.use('/cliente', clienteRoutes);
app.use('/saldo', cajaRoutes);
app.use('/confCaja', confCajaRoutes);
app.use('/user', userRoutes);
app.use('/persona', personaRoutes);
app.use('/api/auth', authRoutes);


// Conexión y sincronización de base de datos
db.authenticate()
  .then(async () => {
    console.log('Conexión con la base de datos establecida');

    await db.sync({ alter: true }); // Solo para desarrollo (cambiar en producción)
    console.log('Modelos sincronizados');
    crearUsuarioMaestro();
  })
  .catch((err) => {
    console.error(' Error al conectar con la base de datos:', err);
  });

module.exports = app;