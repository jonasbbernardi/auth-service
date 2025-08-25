const controller = require('../controllers/token.controller');
const { query } = require('express-validator');
const validateRequest = require('./middleware/validate.request');

module.exports = function getToken(router) {
  /**
   * @openapi
   * /token:
   *  get:
   *    description: Cria token autorizado para cliente/produto
   *    tags:
   *      - Authorize
   *    parameters:
   *      - name: client
   *        in: query
   *        example: "client1"
   *        required: true
   *        schema:
   *          type: string
   *      - name: product
   *        in: query
   *        example: "service1"
   *        required: true
   *        schema:
   *          type: string
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
  router.get(
    '/token',
    query('client').trim().notEmpty(),
    query('product').trim().notEmpty(),
    validateRequest,
    controller
  );
}