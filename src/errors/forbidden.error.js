const CustomError = require('./custom.error');

class ForbiddenError extends CustomError {
  constructor(error) {
    super(403, 'Forbidden', error);
  }
}

class TokenNotFoundError extends ForbiddenError {
  constructor() {
    super({message: 'token not found'});
  }
}

module.exports = {
  ForbiddenError,
  TokenNotFoundError
}