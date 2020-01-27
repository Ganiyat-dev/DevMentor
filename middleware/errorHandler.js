const chalk = require('chalk');

const errorHandler = (err, req, res, next) => {
  //log the error to the dev
  console.log(chalk.red(err.stack));

  res.status(err.statusCode || 500).json({
    success: 'fail',
    error: err.message || 'Server Error'
  });
};

module.exports = errorHandler;
