const sequelize = require('sequelize'); // Importamos sequelize

const db = new sequelize( // Creamos una nueva instancia de sequelize
    process.env.bd, // Nombre de la base de datos
    process.env.bdusuario, // Usuario
    process.env.bdcontra, // Contraseña
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    }
);

module.exports = db;

