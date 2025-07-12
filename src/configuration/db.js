const sequelize = require('sequelize'); // Importamos sequelize
require('dotenv').config()

const db = new sequelize( // Creamos una nueva instancia de sequelize
    process.env.BD, // Nombre de la base de datos
    process.env.BDUSUARIO, // Usuario
    process.env.BDCONTRA, // Contraseña
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306, // Puerto de la base de datos
    },
    console.log(process.env.bd, process.env.bdusuario, process.env.bdcontra) // Imprimimos los datos de conexión    
);

module.exports = db;

