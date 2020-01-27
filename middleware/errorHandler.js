const chalk = require('chalk');

const errorHandler = (err, req, res, next) => {
  //log the error to the dev
  console.log(chalk.red(err.stack));
  res.status(500).json({
    success: 'fail',
    error: err.message
  });
};

module.exports = errorHandler;
