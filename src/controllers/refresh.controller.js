const jwtService = require('../services/jwt.service');
const { TokenNotFoundError } = require('../errors');

const refresh = (req, res) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader?.startsWith('Bearer ')) {
    throw new TokenNotFoundError();
  }
  const token = authHeader.replace('Bearer ', '');
  return jwtService.refresh(token);
}

const handler = (req, res, next) => {
  try {
    const token = refresh(req, res);
    res.json({ code: 200, status: 'success', ...token });
  } catch(error) {
    next(error);
  }
}

module.exports = handler