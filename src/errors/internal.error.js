const CustomError = require('./custom.error');

class InternalError extends CustomError {
  constructor(error) {
    super(500, 'InternalError', error);
  }
}

class CollectionNotReachableError extends InternalError {
  constructor() {
    super({message: 'Collection not reachable.'})
  }
}

class DatabaseConnectError extends InternalError {
  constructor() {
    super({message: 'Database connect error.'})
  }
}

class DatabaseNotFoundError extends InternalError {
  constructor() {
    super({message: 'Database not found.'})
  }
}

class InvalidCloudCredentialsError extends InternalError {
  constructor() {
    super({message: 'Invalid cloud credentials.'})
  }
}

class ErrorGettingSecret extends InternalError {
  constructor() {
    super({message: 'Error getting secret.'})
  }
}

module.exports = {
  InternalError,
  CollectionNotReachableError,
  DatabaseConnectError,
  DatabaseNotFoundError,
  ErrorGettingSecret,
  InvalidCloudCredentialsError
}
