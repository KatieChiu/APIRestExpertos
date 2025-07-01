const db = require('./configuration/db');

const connect = async() => {
try{
    await db.authenticate() ; 
    await db.sync({ force: false }) ;
    console.log('Conexión a la base de datos exitosa');         
}
catch(error){
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
}
}

const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

connect();
const port = 3000;
app.use(express.json());
app.use('/users', userRoutes);
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

exports = app;



