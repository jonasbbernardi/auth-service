require('dotenv').config();

const loggerService = require('./services/logger.service');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const env = process.env.APP_ENV?.toLowerCase();
if(['local', 'sdx'].includes(env)) {
  loggerService.log('local environment');
  const pino = require('pino-http')
  app.use(pino());
  const swagger = require('./swagger');
  swagger(app);
}

app.use('/', (req, res, next) => {
  loggerService.log(`${req.method} ${req.path} received`);
  next();
})

const routes = require('./routes');
app.use('/', routes);

const errorHandler = require('./errorHandler');
app.use(errorHandler);

module.exports = app;