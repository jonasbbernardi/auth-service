const { validationResult } = require('express-validator');
const { CredentialsRequiredError } = require('../../errors');

const validateRequest = (req, res, next) => {
  const result = validationResult(req);
  if(result.isEmpty()) return next();
  throw new CredentialsRequiredError();
}

module.exports = validateRequest;