const clientService = require('../services/client.service');
const jwtService = require('../services/jwt.service');
const { TokenNotFoundError } = require('../errors');

const validate = async (req, res) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader?.startsWith('Bearer ')) {
    throw new TokenNotFoundError();
  }
  const token = authHeader.replace('Bearer ', '');
  const client_data = jwtService.validate(token);
  const data = await clientService.validate(client_data);
  res.status(200).send(data);
}

const handler = async (req, res, next) => {
  try {
    await validate(req,res);
  } catch(error) {
    next(error);
  }
}

module.exports = handler