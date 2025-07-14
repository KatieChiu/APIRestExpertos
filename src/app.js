const express = require ('express');
const morgan = require('morgan') ;
const cors = require('cors');
const dotenv = require('dotenv');
const db = require ('./configuration/db.js');
const venta = require ('./models/venta.js');
const proveedor = require ('./models/proveedor.js');
const categoriaProducto = require ('./models/categoriaProducto.js');
const DetalleRecepcion = require( './models/detalleRecepcion.js');
const DetalleVenta = require ('./models/detalleVenta.js');
const OrdenCompra = require ('./models/ordenCompra.js');
const Persona = require ('./models/persona.js');
const Producto = require ('./models/producto.js');
const Usuario =require ('./models/users.js');
const ordenDetalle = require ('./models/ordenCompraDetalle.js');
const cliente = require ('./models/clientes.js');
const movimientoCaja = require('./models/movimiento.js');
const configuracionCaja = require('./models/confCaja.js');
const authRoutes = require('./src/routes/auth.routes');
const { crearUsuarioMaestro } = require('./src/controllers/auth.controller');


const app = express();

app.use(cors());
//app.use(morgan('dev'));
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.get('/', (req, res) => {
  res.send('Servidor Express activo');
});


db.authenticate().then(async () => {
    console.log("Se conectó con el servidor de la BD");

    await Producto.sync().then(() => console.log("Producto ✅"))
        .catch(console.log);

    await proveedor.sync().then(() => console.log("Proveedor ✅"))
        .catch(console.log);

    await Persona.sync().then(() => console.log("Persona ✅"))
        .catch(console.log);

    await venta.sync().then(() => console.log("Venta ✅"))
        .catch(console.log);

    await Usuario.sync().then(() => console.log("Usuario ✅"))
        .catch(console.log);

    await categoriaProducto.sync().then(() => console.log("CategoriaProducto ✅"))
        .catch(console.log);

    await OrdenCompra.sync().then(() => console.log("OrdenCompra ✅"))
        .catch(console.log);

    await DetalleRecepcion.sync().then(() => console.log("DetalleRecepcion ✅"))
        .catch(console.log);

    await DetalleVenta.sync().then(() => console.log("DetalleVenta ✅"))
        .catch(console.log);
    
    await ordenDetalle.sync().then(() => console.log("detalleCompra✅"))
        .catch(console.log);
    await cliente.sync().then(() => console.log("Cliente ✅"))
        .catch(console.log);
    await configuracionCaja.sync().then(() => console.log("ConfiguracionCaja ✅"))
        .catch(console.log);
    await movimientoCaja.sync().then(() => console.log("MovimientoCaja ✅"))
        .catch(console.log);
})
.catch(console.log);



app.use('/proveedor/', require('./routes/proveedorRoute'));
app.use('/ordenCompra/', require('./routes/ordenCompraRoute'));
app.use('/venta/', require('./routes/ventaRoute'));
app.use('/producto/', require('./routes/productoRoute'));
app.use('/categoria/', require('./routes/categoriaProductoRoute') );
app.use('/Recepcion/', require('./routes/detalleRecepcionRoute'));
app.use('/cliente/', require('./routes/clienteRoute'));
app.use('/saldo/', require('./routes/cajaRoute'));
app.use('/confCaja/', require('./routes/confCajaRoute'));
app.use('/api/auth', authRoutes);
