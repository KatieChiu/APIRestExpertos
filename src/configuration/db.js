const { Sequelize } = require('sequelize'); // Importa Sequelize correctamente
require('dotenv').config();

const db = new Sequelize( // Creamos una nueva instancia de sequelize
   "DATAFERRE",// Nombre de la base de datos
   "sistemas", // Usuario
   "Sistemas123.", // Contraseña
   {
       host: 'localhost',
       dialect: 'mysql',
       port: 3306, // Puerto de la base de datos
   }
);

module.exports = db;

