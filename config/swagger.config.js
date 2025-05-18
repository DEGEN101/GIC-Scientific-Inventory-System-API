const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GIC Inventory API',
      version: '1.0.0',
      description: 'API documentation for the GIC Inventory Management System',
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'], 
};

// Generate the swagger spec
const swaggerSpec = swaggerJsdoc(options);

const setupSwaggerDocs = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwaggerDocs;
