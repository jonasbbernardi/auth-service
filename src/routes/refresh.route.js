const controller = require('../controllers/refresh.controller');

module.exports = function getToken(router) {
  /**
  * @openapi
  * /refresh:
  *  post:
  *    description: Valida refresh token e gera novo token
  *    security:
  *      - bearerAuth: []
  *    tags:
  *      - Authorize
  *    responses:
  *      200:
  *        description: Return success
   *      403:
   *        description: Error Forbidden
   *      401:
   *        description: Error Unauthorized
  */
  router.post('/refresh', controller);
}