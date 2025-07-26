const app = require('./app');
const { db } = require('./models');

db.authenticate()
  .then(async () => {
    console.log('Conexión con la base de datos establecida');
    await db.sync({ alter: true }); // Solo para desarrollo (cambiar en producción)
    console.log('Modelos sincronizados');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar con la base de datos:', err);
  });