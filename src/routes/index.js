const express = require('express');

/**
 * @openapi
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
const router = express.Router();
require('./health-check.route' )(router);
require('./authorize.route')(router);
require('./token.route')(router);
require('./refresh.route')(router);
require('./validate.route' )(router);
require('./generate.route')(router);
router.all('*', (req, res) => {
  res.status(404).json({error: {location: req.path, msg: 'Not found'}});
})

module.exports = router