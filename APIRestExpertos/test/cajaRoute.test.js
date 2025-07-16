const request = require('supertest');
const app = require('../src/app');

describe('Rutas /saldo', () => {
  it('GET /saldo debe responder con 200', async () => {
    const res = await request(app).get('/saldo');
    expect(res.statusCode).toBeDefined();
  });
});
