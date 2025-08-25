const crypt = require('../services/crypt.service');

const handler = async (req, res, next) => {
  const password = req?.query?.password;
  const salt = crypt.genSaltSync(10);
  const encrypted = crypt.hashSync(password, salt);
  res.json({password: encrypted});
}

module.exports = function postValidate(router) {
  router.get("/generate", handler);
}