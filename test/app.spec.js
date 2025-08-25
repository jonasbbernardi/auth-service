const request = require("supertest");
const app = require('../src/app');
const { describe } = require("node:test");
require('dotenv').config();

describe('Application health', () => {

  const notFound = {
    error: {
      location: "/notfound",
      msg: "Not found"
    }
  }

  it('should return success', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({success: true});
  })

  it('should return swagger doc json', async () => {
    const res = await request(app).get('/docs-json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('openapi');
  })

  it('get should return 404', async () => {
    const res = await request(app).get('/notfound');
    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject(notFound);
  })

  it('post should return 404', async () => {
    const res = await request(app).post('/notfound');
    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject(notFound);
  })
});
