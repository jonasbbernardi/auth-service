const controller = require('../controllers/validate.controller');

module.exports = function postValidate(router) {
  /**
   * @openapi
   * /validate:
   *  post:
   *    description: Valida token em cabeçalho
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
  router.post("/validate", controller);
}