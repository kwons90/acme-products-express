const { Router } = require('express');
const path = require('path');

const apiRouter = Router();

// An example route that the client requests to check if the app is healthy.
apiRouter.get('/health', (req, res) => {
  res.send({
    message: 'Application is awake and healthy',
  });
});

<<<<<<< HEAD
apiRouter.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '../../products.json'));
});
=======
// TODO: Does your api want more routes? Why not here?
>>>>>>> fe36df0579aebe45e9faf65df6bf76052dc16d9a

module.exports = apiRouter;
