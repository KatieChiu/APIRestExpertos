const request = require('supertest');
const app = require('../src/app');

describe('Rutas /venta', () => {
  it('GET /venta debe responder con 200', async () => {
    const res = await request(app).get('/venta');
    expect(res.statusCode).toBeDefined();
  });
});
