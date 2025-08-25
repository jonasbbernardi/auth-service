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

describe('Authorize with get token', () => {

  it('should return token - client default', async () => {
    const res = await request(app)
            .get('/token')
            .set('Content-type', 'application/json')
            .query(mockData.client_default)
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(success_obj);
  })

  it('should return token - scope all', async () => {
    const res = await request(app)
            .get('/token')
            .set('Content-type', 'application/json')
            .query(mockData.scope_all);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(success_obj);
  })

  it('should return token - client without secret', async () => {
    const res = await request(app)
            .get('/token')
            .set('Content-type', 'application/json')
            .query(mockData.client_without_secret);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(success_obj);
  })

  it('should return token - invalid secret', async () => {
    const res = await request(app)
            .get('/token')
            .set('Content-type', 'application/json')
            .query(mockData.invalid_secret);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(success_obj);
  })

  it('should return token - client data without secret', async () => {
    const res = await request(app)
            .get('/token')
            .set('Content-type', 'application/json')
            .query(mockData.client_data_without_secret);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(success_obj);
  })

  it('should return token 6', async () => {
    const res = await request(app)
            .get('/token')
            .set('Content-type', 'application/json')
            .query(mockData.invalid_scope);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(success_obj);
  })

  it('should return unauthorized - invalid product', async () => {
    const res = await request(app)
            .get('/token')
            .set('Content-type', 'application/json')
            .query(mockData.invalid_product);
    expect(res.statusCode).toBe(401);
    expect(res.body).toMatchObject({
      code: 401,
      status: 'error',
      message: 'Unauthorized: invalid product'
    });
  })

  it('should return unauthorized - invalid credentials', async () => {
    const res = await request(app)
            .get('/token')
            .set('Content-type', 'application/json')
            .query(mockData.invalid_client);
    expect(res.statusCode).toBe(401);
    expect(res.body).toMatchObject({
      code: 401,
      status: 'error',
      message: 'Unauthorized: invalid credentials'
    });
  })

});