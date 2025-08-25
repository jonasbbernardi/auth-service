const request = require("supertest");
const app = require('../../src/app');
const jwtService = require('../../src/services/jwt.service');
const mockData = require('../mock-data');
const mockDb = require('../mock-database');
const { describe } = require("node:test");
require('dotenv').config();

jest.mock('../../src/services/database.service', () => {
  return {
    __esModule: false,
    get: () => mockDb.data
  }
});

describe('Validate token', () => {

  it('should return 200', async () => {
    const resToken = await request(app)
                .post('/authorize')
                .set('Content-type', 'application/json')
                .send(mockData.client_default);
    const token = resToken.body.token;
    const res = await request(app)
            .post('/validate')
            .set('Content-type', 'application/json')
            .set('authorization', `Bearer ${token}`);
    const status = res.statusCode;
    expect(status).toBe(200);
    expect(res.body).toMatchObject({
      client: mockData.client_default.client,
      product: mockData.client_default.product
    });
  })

  it('should return unauthorized - invalid client', async () => {
    const client_data = mockData.invalid_client;
    const jwt = jwtService.generate({
      name: client_data.client,
      product: client_data.product,
    });
    const res = await request(app)
            .post('/validate')
            .set('Content-type', 'application/json')
            .set('authorization', `Bearer ${jwt.token}`);
    const status = res.statusCode;
    expect(status).toBe(401);
    expect(res.body).toMatchObject({
      code: 401,
      status: 'error',
      message: 'Unauthorized: invalid client data'
    });
  })

  it('should return unauthorized - invalid product', async () => {
    const client_data = mockData.invalid_product;
    const jwt = jwtService.generate({
      name: client_data.client,
      product: client_data.product,
    });
    const res = await request(app)
            .post('/validate')
            .set('Content-type', 'application/json')
            .set('authorization', `Bearer ${jwt.token}`);
    const status = res.statusCode;
    expect(status).toBe(401);
    expect(res.body).toMatchObject({
      code: 401,
      status: 'error',
      message: 'Unauthorized: invalid client data'
    });
  })

  it('should return forbidden - token not found', async () => {
    const res = await request(app)
            .post('/validate')
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
            .post('/validate')
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
            .post('/validate')
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
})