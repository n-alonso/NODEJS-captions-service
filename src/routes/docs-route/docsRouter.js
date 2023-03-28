const express = require('express');
const path = require('path')
const docsRouter = express.Router();
const swaggerUi = require('swagger-ui-express');
const openApiSpec = require('../../../openapi.json')

docsRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec))
docsRouter.get('/openapi.json', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../openapi.json'))
});

module.exports = {
    docsRouter
}
