
module.exports = function swagger(app) {
  const jsdoc = require('./jsdoc');
  const swaggerUi = require('swagger-ui-express');

  const spec = jsdoc();

  const request_handler = swaggerUi.setup(spec, {
    explorer: true
  })

  app.use('/docs', swaggerUi.serve, request_handler);
  app.get('/docs-json', (req, res) => {
    res.json(jsdoc());
  });
}