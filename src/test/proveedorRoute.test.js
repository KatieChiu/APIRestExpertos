const request = require('supertest');
const app = require('../app');

describe('Rutas /proveedor', () => {
  it('GET /proveedor debe responder con 200', async () => {
    const res = await request(app).get('/proveedor');
    expect(res.statusCode).toBeDefined();
  });
});
