const loggerService = require('../services/logger.service');

class CustomError extends Error {
  constructor(code, message, error){
    super(`${message}: ${error.message || error}`);
    this.code = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    loggerService.error(error)
  }
}

module.exports = CustomError