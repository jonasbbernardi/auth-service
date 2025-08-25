const crypt = require('../services/crypt.service');
const {
  UnauthorizedError,
  InvalidCredentialsError,
  InvalidClientDataError
} = require("../errors");

async function authorize(client_data, secret_key) {
  try {
    const key = client_data.secret_key;
    if( !key ) throw new InvalidClientDataError();
    const valid = await crypt.compare(secret_key, key);
    if(!valid) throw new InvalidCredentialsError();
  } catch (error) {
    if(error instanceof InvalidClientDataError || error instanceof InvalidCredentialsError) throw error;
    throw new UnauthorizedError(error);
  }
}

module.exports = { authorize };