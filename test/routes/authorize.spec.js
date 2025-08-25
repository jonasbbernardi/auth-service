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

describe('Authorize with post authorize', () => {

  it('should return token default', async () => {
    const res = await request(app)
            .post('/authorize')
            .set('Content-type', 'application/json')
            .send(mockData.client_default);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(success_obj);
  })

  it('should return token scope *', async () => {
    const res = await request(app)
            .post('/authorize')
            .set('Content-type', 'application/json')
            .send(mockData.scope_all);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(success_obj);
  })

  it('should return unauthorized - credentials required', async () => {
    const res = await request(app)
            .post('/authorize')
            .set('Content-type', 'application/json')
            .send(mockData.client_without_secret);
    expect(res.statusCode).toBe(401);
    expect(res.body).toMatchObject({
      code: 401,
      status: 'error',
      message: 'Unauthorized: credentials required'
    });
  })

  it('should return unauthorized - invalid credentials (secret)', async () => {
    const res = await request(app)
            .post('/authorize')
            .set('Content-type', 'application/json')
            .send(mockData.invalid_secret);
    expect(res.statusCode).toBe(401);
    expect(res.body).toMatchObject({
      code: 401,
      status: 'error',
      message: 'Unauthorized: invalid credentials'
    });
  })

  it('should return unauthorized - client data without secret', async () => {
    const res = await request(app)
            .post('/authorize')
            .set('Content-type', 'application/json')
            .send(mockData.client_data_without_secret);
    expect(res.statusCode).toBe(401);
    expect(res.body).toMatchObject({
      code: 401,
      status: 'error',
      message: 'Unauthorized: invalid client data'
    });
  })

  it('should return unauthorized - invalid scope', async () => {
    const res = await request(app)
            .post('/authorize')
            .set('Content-type', 'application/json')
            .send(mockData.invalid_scope);
    expect(res.statusCode).toBe(401);
    expect(res.body).toMatchObject({
      code: 401,
      status: 'error',
      message: 'Unauthorized: invalid scope'
    });
  })

  it('should return unauthorized - invalid scope', async () => {
    const res = await request(app)
            .post('/authorize')
            .set('Content-type', 'application/json')
            .send(mockData.invalid_product);
    expect(res.statusCode).toBe(401);
    expect(res.body).toMatchObject({
      code: 401,
      status: 'error',
      message: 'Unauthorized: invalid product'
    });
  })

  it('should return unauthorized - invalid credentials (client)', async () => {
    const res = await request(app)
            .post('/authorize')
            .set('Content-type', 'application/json')
            .send(mockData.invalid_client);
    expect(res.statusCode).toBe(401);
    expect(res.body).toMatchObject({
      code: 401,
      status: 'error',
      message: 'Unauthorized: invalid credentials'
    });
  })
  
});
