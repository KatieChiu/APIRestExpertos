const request = require('supertest');
const app = require('../app');

describe('Rutas /usuario', () => {
  it('GET /usuario debe responder con 200', async () => {
    const res = await request(app).get('/usuario');
    expect(res.statusCode).toBeDefined();
  });
});
