const request = require("supertest");
const app = require('../../src/app');
const mockData = require('../mock-data');
const mockDb = require('../mock-database');
const success_obj = require('./success.obj');
const { describe } = require("node:test");
require('dotenv').config();

jest.mock('../../src/services/database.service', () => {
  return {
    __esModule: false,
    get: () => mockDb.data
  }
});

const endpoint = '/refresh';

describe('Refresh token', () => {

  it('should return fresh new token - post authorize', async () => {
    const resToken = await request(app)
                .post('/authorize')
                .set('Content-type', 'application/json')
                .send(mockData.client_default);
    const token = resToken.body.refresh_token;
    const res = await request(app)
            .post(endpoint)
            .set('Content-type', 'application/json')
            .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(success_obj);
  })

  it('should return fresh new token - get token', async () => {
    const resToken = await request(app)
                .get('/token')
                .set('Content-type', 'application/json')
                .query(mockData.client_without_secret);
    const token = resToken.body.refresh_token;
    const res = await request(app)
            .post(endpoint)
            .set('Content-type', 'application/json')
            .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(success_obj);
  })

  it('should return fresh new token - token ttl = 1', async () => {
    process.env.TOKEN_TTL_SEC = 1
    const resToken = await request(app)
                .post('/authorize')
                .set('Content-type', 'application/json')
                .send(mockData.client_default);
    const token = resToken.body.refresh_token;
    await new Promise((r) => setTimeout(r, 2000));
    const res = await request(app)
            .post(endpoint)
            .set('Content-type', 'application/json')
            .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(success_obj);
  })

  it('should return forbidden - token not found', async () => {
    const res = await request(app)
            .post(endpoint)
            .set('Content-type', 'application/json')
    const status = res.statusCode;
    expect(status).toBe(403);
    expect(res.body).toMatchObject({
      code: 403,
      status: 'error',
      message: 'Forbidden: token not found'
    });
  })

  it('should return forbidden - invalid token', async () => {
    const res = await request(app)
            .post(endpoint)
            .set('Content-type', 'application/json')
            .set('authorization', `Bearer a.b.c`);
    const status = res.statusCode;
    expect(status).toBe(403);
    expect(res.body).toMatchObject({
      code: 403,
      status: 'error',
      message: 'Forbidden: invalid token'
    });
  })

  it('should return forbidden - jwt malformed', async () => {
    const res = await request(app)
            .post(endpoint)
            .set('Content-type', 'application/json')
            .set('authorization', `Bearer abc`);
    const status = res.statusCode;
    expect(status).toBe(403);
    expect(res.body).toMatchObject({
      code: 403,
      status: 'error',
      message: 'Forbidden: jwt malformed'
    });
  })
});