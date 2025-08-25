const loggerService = require('./services/logger.service');

module.exports = function errorHandler(error, req, res, next) {
  loggerService.error(error);

  const code = error.code || 500;
  const status = 'error';
  const message = error.message || error;
  const body = { code, status, message };
  res.status(code);
  res.json(body);
}
