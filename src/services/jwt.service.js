const jwt = require("jsonwebtoken");
const {
  ForbiddenError,
  UnauthorizedError,
  InvalidTokenError
} = require("../errors");

function getEnvs() {
  const private_key = process.env.PRIVATE_KEY;
  const token_ttl    = `${process.env.TOKEN_TTL_SEC}s`;
  const refresh_ttl  = `${process.env.REFRESH_TTL_SEC}s`;
  return {private_key, token_ttl, refresh_ttl}
}

/**
 * Generate token JWT to Bearer auth
 * @param {object} payload Payload to save in token
 * @returns {object}
 */
function generateTokens(payload) {
  const envs = getEnvs();
  const pkey = envs.private_key;

  const token_options = {expiresIn: envs.token_ttl}
  const token = jwt.sign(payload, pkey, token_options);
  
  const refresh_token_options = {expiresIn: envs.refresh_ttl}
  const refresh_token = jwt.sign({token}, pkey, refresh_token_options);

  return {token, refresh_token, ttl: envs.token_ttl};
}

/**
 * Generate token inserting client data on payload
 * 
 * @param {object} client_data 
 * @returns 
 */
function generate(client_data) {
  try {
    if(!!client_data?.domains) delete client_data.domains;
    if(!!client_data?.products) delete client_data.products;
    return generateTokens(client_data);
  } catch (error) {
    throw new UnauthorizedError(error);
  }
}

/**
 * Validate refresh token and re-generate token with initial payload
 * 
 * @param {string} refresh_token
 */
function refresh(refresh_token) {
  const {token} = validate(refresh_token);
  if(!token) throw new InvalidTokenError()
  const client_data = jwt.decode(token);
  if(!!client_data?.iat) delete client_data.iat;
  if(!!client_data?.exp) delete client_data.exp;
  return generateTokens(client_data);
}

/**
 * Validate token and return payload data
 * 
 * @param {string} token 
 * @returns {any} payload data
 */
function validate(token) {
  try{
    const private_key = process.env.PRIVATE_KEY;
    return jwt.verify(token, private_key);
  } catch(error) {
    throw new ForbiddenError(error);
  }
}

module.exports = {
  generate,
  refresh,
  validate
};