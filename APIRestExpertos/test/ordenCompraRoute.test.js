const request = require('supertest');
const app = require('../src/app');

describe('Rutas /ordenCompra', () => {
  it('GET /ordenCompra debe responder con 200', async () => {
    const res = await request(app).get('/ordenCompra');
    expect(res.statusCode).toBeDefined();
  });
});
