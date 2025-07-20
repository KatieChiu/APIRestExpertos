const { Sequelize } = require('sequelize'); // Importa Sequelize correctamente
require('dotenv').config();

const db = new Sequelize( // Creamos una nueva instancia de sequelize
   process.env.bd, // Nombre de la base de datos
   process.env.bdusuario, // Usuario
   process.env.bdcontra, // Contraseña
   {
       host: process.env.DB_HOST || 'localhost',
       dialect: 'mysql',
       port: process.env.DB_PORT || 3306, // Puerto de la base de datos
       dialectOptions: {
           ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : false, // Configuración SSL
       },
       pool: {
           max: 5,
           min: 0,
           acquire: process.env.DB_ACQUIRE_TIMEOUT || 30000, // Tiempo máximo para adquirir conexión
           idle: process.env.DB_IDLE_TIMEOUT || 10000, // Tiempo máximo de inactividad
       },
   }
);

module.exports = db;

