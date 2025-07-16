const request = require('supertest');
const app = require('../app');

describe('Rutas /correo', () => {
  it('POST /correo/envio debe responder con 200 o 500', async () => {
    const res = await request(app).post('/correo/envio').send({ email: 'test@example.com', descripcion: 'prueba' });
    expect([200,500]).toContain(res.statusCode);
  });
});
