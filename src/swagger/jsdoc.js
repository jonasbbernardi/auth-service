function jsdoc() {
  const swaggerJsdoc = require('swagger-jsdoc');

  const options = {
    failOnErrors: true,
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Auth Service',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost',
          description: 'Local'
        }
      ]
    },
    apis: ['./src/routes/*.js'],
  };

  return swaggerJsdoc(options);
}

module.exports = jsdoc;