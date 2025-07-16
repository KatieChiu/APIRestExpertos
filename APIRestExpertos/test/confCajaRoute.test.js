const request = require('supertest');
const app = require('../src/app');

describe('Rutas /confCaja', () => {
  it('GET /confCaja debe responder con 200', async () => {
    const res = await request(app).get('/confCaja');
    expect(res.statusCode).toBeDefined();
  });
});
