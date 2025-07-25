const request = require('supertest');
const app = require('../app');

describe('Rutas /Recepcion', () => {
  it('GET /Recepcion debe responder con 200', async () => {
    const res = await request(app).get('/Recepcion');
    expect(res.statusCode).toBeDefined();
  });
});
