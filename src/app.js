require("dotenv").config(); // Carga las variables de entorno desde el archivo .env
const express = require("express");
const morgan = require("morgan");

const app = express();
const db = require("./configuration/db.js");
const categoriaProducto = require("./models/categoriaProducto.js");
const Producto = require("./models/producto.js");
const categoriaRoutes = require('./routes/categoriaProductoRoutes');
const productoRoutes = require('./routes/productoRoutes');
const userRoutes = require('./routes/userRoutes');
const personRoutes = require('./routes/personRoutes');



// Conexión a la base de datos
// db es una instancia de Sequelize que se conecta a la base de datos
db.authenticate().then(async()=>{ 
    console.log("Se conecto con el servidor de la BD");
    await Producto.sync().then(()=>{// Sincroniza el modelo Cargo con la base de datos
        // Esto crea la tabla si no existe y actualiza la estructura si es necesario.
        console.log("El modelo Producto se creo correctamente");
    })
    .catch((er)=>{// Errores al crear el modelo
        console.log(er);
    })
    await categoriaProducto.sync().then(()=>{
        console.log("El modelo categoriaProducto se creo correctamente");
    })
    .catch((er)=>{
        console.log(er);
    })
}).catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
});

app.set("port", process.env.port || 3001); // Establece el puerto del servidor, si no se especifica en las variables de entorno, usa 3001
app.use(morgan("dev"));
app.use(express.json());

app.use('/api/categorias', categoriaRoutes);
app.use('/api/productos', productoRoutes);

app.use("/api/", require("./routes/productoRoutes.js")); // Rutas para productos
app.use("/api/", require("./routes/categoriaProductoRoutes.js")); // Rutas para categorías
app.listen(app.get("port"), () => {
console.log("Servidor corriendo en el puerto "+ app.get("port"));
});