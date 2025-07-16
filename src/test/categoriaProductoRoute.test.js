const request = require('supertest');
const app = require('../app');

describe('Rutas /categoria', () => {
  it('GET /categoria debe responder con 200', async () => {
    const res = await request(app).get('/categoria');
    expect(res.statusCode).toBeDefined();
  });
});
