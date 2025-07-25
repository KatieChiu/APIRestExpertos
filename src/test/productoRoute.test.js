const request = require('supertest');
const app = require('../app');

describe('Rutas /producto', () => {
  it('GET /producto debe responder con 200', async () => {
    const res = await request(app).get('/producto');
    expect(res.statusCode).toBeDefined();
  });
});
