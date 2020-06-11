const { Router } = require('express');
const path = require('path');

const apiRouter = Router();

apiRouter.get('/health', (req, res) => {
  res.send({
    message: 'Application is awake and healthy',
  });
});

apiRouter.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '../../products.json'));
});

module.exports = apiRouter;
