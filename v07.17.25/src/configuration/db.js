const { Sequelize } = require('sequelize'); // Importa Sequelize correctamente
require('dotenv').config();

<<<<<<< Updated upstream
const db = new Sequelize( // Creamos una nueva instancia de sequelize
    process.env.DBNAME, // Nombre de la base de datos
    process.env.DBUSER, // Usuario
    process.env.DBPASSWORD, // Contraseña
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306, // Puerto de la base de datos
    },
   // console.log(process.env.bd, process.env.bdusuario, process.env.bdcontra) // Imprimimos los datos de conexión    
=======
const db = new sequelize( // Creamos una nueva instancia de sequelize
   process.env.bd, // Nombre de la base de datos
   process.env.bdusuario, // Usuario
   process.env.bdcontra, // Contraseña
   {
       host: 'localhost',
       dialect: 'mysql',
       port: 3306, // Puerto de la base de datos
   }
>>>>>>> Stashed changes
);

module.exports = db;

