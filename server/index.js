const dotenv = require('dotenv');
const chalk = require('chalk');

// Load in any configuration keys from a .env file
dotenv.config();

const startServer = require('./http/index');

// Grab the env variables for PORT and NODE_ENV
const PORT = process.env.PORT || 3000;
const PROD = process.env.NODE_ENV === 'production';

startServer(PORT, PROD).then(() => {
  console.log(chalk.cyan(`Application started.`));
});
