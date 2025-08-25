const request = require("supertest");
const express = require('express');
const errorHandler = require('../src/errorHandler');
const { describe } = require("node:test");
require('dotenv').config();

describe('Errro Handler', () => {
  const defaultError = {
    code: 500, status: 'error', message: 'mocked error'
  };
  var app;

  beforeEach(() => {
    app = express();
  })

  it('should return default error', async () => {
    app.get('/', (req, res, next) => {
      next(defaultError.message);
    })
    app.use(errorHandler);

    const res = await request(app).get('/');
    expect(res.statusCode).toBe(500);
    expect(res.body).toMatchObject(defaultError);
  })

  it('should return default message error', async () => {
    app._router = null;
    app.get('/', (req, res, next) => {
      next({code: 500});
    })
    app.use(errorHandler);

    const res = await request(app).get('/');
    expect(res.statusCode).toBe(500);
    expect(res.body).toMatchObject({
      ...defaultError,
      message: {code: 500}
    });
  })
});
