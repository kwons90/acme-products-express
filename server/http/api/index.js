const { Router } = require('express');
const path = require('path');
const fs = require('fs');

const apiRouter = Router();
const DB_PATH = path.join(__dirname, '../../products.json');

const writeFileP = (path, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) rej(err);
      else res();
    });
  });
};

const readDataP = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        return rej(err);
      }
      try {
        res(JSON.parse(data));
      } catch (e) {
        rej(e);
      }
    });
  });
};

// An example route that the client requests to check if the app is healthy.
apiRouter.get('/health', (req, res) => {
  res.send({
    message: 'Application is awake and healthy',
  });
});

apiRouter.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '../../products.json'));
});

apiRouter.post('/products', async (req, res, next) => {
  try {
    const products = req.body;
    const newProduct = req.body;
    await writeFileP(DB_PATH, [...products, newProduct]);
    res.status(200).send({ message: `${product.name} posted` });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

apiRouter.delete('/products', async (req, res, next) => {
  try {
    const products = await readDataP(DB_PATH);
    const filteredProducts = products.filter(
      (product) => product.name !== req.params.name * 1
    );
    await writeFileP(DB_PATH, filteredProducts);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = apiRouter;
