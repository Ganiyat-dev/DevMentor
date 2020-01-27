const chalk = require('chalk');
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //log the error to the dev
  // console.log(chalk.red(err));

  // 1) CAST ERROR
  if (error.name === 'CastError') {
    const message = `No Resource found with this id: ${error.value}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: 'fail',
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
