const clientService = require('../services/client.service');
const jwtService = require('../services/jwt.service');

const authorize = async (req, res) => {
  const { client, product } = req.query;
  const data = await clientService.getData(client, product);
  const jwt_client = { id: data.id, ...data.client_data }
  const jwt_data = { ...jwt_client, product, scopes: ['*'] };
  return await jwtService.generate(jwt_data);
}

const handler = async (req, res, next) => {
  try {
    const token = await authorize(req, res);
    res.json({ code: 200, status: 'success', ...token });
  } catch(error) {
    next(error);
  }
}

module.exports = handler