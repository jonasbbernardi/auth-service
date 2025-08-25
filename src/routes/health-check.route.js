const handler = (req, res, next) => {
  console.log('>>> Header client:',req.headers['x-auth-client']);
  console.log('>>> Header product:',req.headers['x-auth-product']);
  res.json({ success: true });
  res.end();
}

module.exports = function postValidate(router) {
  /**
   * @openapi
   * components:
   *  schemas:
   *    health-check-success:
   *      type: object
   *      properties:
   *        success:
   *          type: boolean
   */

  /**
   * @openapi
   * /:
   *   get:
   *     description: Root endpoint (usado como probe)
   *     tags:
   *       - Default
   *     responses:
   *       200:
   *         description: Returns success object.
   *         content:
   *           "application/json":
   *             schema:
   *               $ref: "#/components/schemas/health-check-success"
   */
  router.get("/", handler);
  /**
   * @openapi
   * /health-check:
   *   get:
   *     description: Health check endpoint
   *     tags:
   *       - Default
   *     responses:
   *       200:
   *         description: Returns success object.
   *         content:
   *           "application/json":
   *             schema:
   *               $ref: "#/components/schemas/health-check-success"
   */
  router.get("/health-check", handler);
}