const CustomError = require('./custom.error');

class UnauthorizedError extends CustomError {
  constructor(error) {
    super(401, 'Unauthorized', error);
  }
}

class CredentialsRequiredError extends UnauthorizedError {
  constructor() {
    super({message: 'credentials required'});
  }
}
class InvalidCredentialsError extends UnauthorizedError {
  constructor() {
    super({message: 'invalid credentials'});
  }
}
class InvalidProductError extends UnauthorizedError {
  constructor() {
    super({message: 'invalid product'})
  }
}
class InvalidScopeError extends UnauthorizedError {
  constructor() {
    super({message: 'invalid scope'})
  }
}
class InvalidClientDataError extends UnauthorizedError {
  constructor() {
    super({message: 'invalid client data'});
  }
}

module.exports = {
  UnauthorizedError,
  CredentialsRequiredError,
  InvalidCredentialsError,
  InvalidProductError,
  InvalidScopeError,
  InvalidClientDataError,
}