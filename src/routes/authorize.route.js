const { body } = require('express-validator');
const controller = require('../controllers/authorize.controller');
const validateRequest = require('./middleware/validate.request');

module.exports = function postAuthorize(router) {
  /**
   * @openapi
   * components:
   *  schemas:
   *    authorize-parameter:
   *      type: object
   *      properties:
   *        client:
   *          type: string
   *          example: "client1"
   *        product:
   *          type: string
   *          example: "service1"
   *        secret:
   *          type: string
   *          example: "myPa$$word123"
   *        scopes:
   *          type: array
   *          example: ["api1"]
   *          items:
   *            type: string
   *      required:
   *        - "client"
   *        - "product"
   *        - "secret"
   *        - "scopes"
   *    authorize-success:
   *      type: object
   *      properties:
   *        code:
   *          type: number
   *          enum: [200]
   *        token:
   *          type: string
   *        refresh_token:
   *          type: string
   *        ttl:
   *          type: number
   *    authorize-error:
   *      type: object
   *      properties:
   *        code:
   *          type: number
   *          enum: [401, 403]
   *        status:
   *          type: string
   *          default: "error"
   *        message:
   *          type: string
   */

  /**
   * @openapi
   * /authorize:
   *  post:
   *    description: Cria token autorizado para determinado escopo
   *    tags:
   *      - Authorize
   *    requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/authorize-parameter"
   *    responses:
   *      200:
   *        description: Returns success object.
   *        content:
   *          "application/json":
   *            schema:
   *              $ref: "#/components/schemas/authorize-success"
   *      401:
   *        description: Returns error
   *        content:
   *          "application/json":
   *            schema:
   *              $ref: "#/components/schemas/authorize-error"
   *      403:
   *        description: Returns error
   *        content:
   *          "application/json":
   *            schema:
   *              $ref: "#/components/schemas/authorize-error"
   */
  router.post(
    '/authorize',
    body('client').trim().notEmpty(),
    body('product').trim().notEmpty(),
    body('secret').trim().notEmpty(),
    body('scopes').notEmpty(),
    validateRequest,
    controller
  );
}