const chalk = require('chalk');
const app = require('./server');
const { composeMiddleware, standardMiddleware } = require('./middleware');
const apiRouter = require('./api/index');

// Hooks in all of our standard middleware.
composeMiddleware(app, standardMiddleware);

// Hooks in a router for the /api route.
app.use('/api', apiRouter);

// TODO: You could write anything between here and start server.

// Promisifying starting the server - doesn't matter yet, but will when we get to databases so better to get used to.
const startServer = (port, prod = false) => {
  console.log(
    `Application is running in ${prod ? 'production' : 'development'} mode.`
  );

  return new Promise((res) => {
    app.listen(port, () => {
      console.log(chalk.green(`Application is now listening on PORT:${port}`));
      res();
    });
  });
};

module.exports = startServer;
