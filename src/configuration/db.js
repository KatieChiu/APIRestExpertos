const { Sequelize } = require('sequelize'); // Importa Sequelize correctamente
require('dotenv').config();

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
);

module.exports = db;

