const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./src/configuration/db');
const authRoutes = require('./src/routes/auth.routes');
const { crearUsuarioMaestro } = require('./src/controllers/auth.controller');

// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
db.authenticate()
  .then(() => {
    console.log(' Base de datos conectada');
    return db.sync(); // Crea tablas si no existen
  })
  .then(() => {
    console.log(' Tablas sincronizadas');
    crearUsuarioMaestro(); // Crea el usuario admin si no existe
  })
  .catch(err => {
    console.error(' Error al conectar o sincronizar DB:', err);
  });

// Rutas
app.use('/api/auth', authRoutes);

// Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Servidor corriendo en puerto ${PORT}`));
