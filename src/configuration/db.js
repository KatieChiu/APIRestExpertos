const { Sequelize } = require('sequelize'); // Importa Sequelize correctamente
require('dotenv').config();

const db = new Sequelize( // Creamos una nueva instancia de sequelize
   process.env.bd, // Nombre de la base de datos
   process.env.bdusuario, // Usuario
   process.env.bdcontra, // Contraseña
   {
       host: 'localhost',
       dialect: 'mysql',
       port: 3306, // Puerto de la base de datos
   }
);

module.exports = db;

