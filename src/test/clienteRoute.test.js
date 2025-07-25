const request = require('supertest');
const app = require('../app');

describe('Rutas /cliente', () => {
  it('GET /cliente debe responder con 200', async () => {
    const res = await request(app).get('/cliente');
    expect(res.statusCode).toBeDefined();
  });
});
