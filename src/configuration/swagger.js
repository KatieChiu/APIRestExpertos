const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API-SIEX',
      version: '1.0.0',
      description: 'API del sistemas expertos',
      contact: {
        email: 'desofiwfacturacion@gmail.com'
      },
    },
    servers: [
        {
          url: 'http://localhost:'+ 3000, // URL del servidor
          description: 'Servidor local',
        },
    ],
    components: {
      securitySchemes: {
          BearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
          }
      }
    },
    security: [
        {
            BearerAuth: []
        }
    ],
  },
  apis: [`${path.join(__dirname, "../routes/*.js")}`], // Ruta a los archivos donde están definidas las rutas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;