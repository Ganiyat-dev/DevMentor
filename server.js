const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const chalk = require('chalk');
const connectDb = require('./config/db.js');
const errorHandler = require('./middleware/errorHandler');

// handle uncaught exception
process.on('uncaughtException', err => {
  console.log(chalk.red(`uncaught exception: ${err.message}`));
  process.exit(1);
});
dotenv.config({ path: './config/config.env' });
//routes
const bootcampsRoutes = require('./routes/bootcamps');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect db
connectDb();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use('/api/v1/bootcamps', bootcampsRoutes);

//errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    chalk.blue(
      `server is in ${process.env.NODE_ENV} mode & listening on port ${process.env.PORT}`
    )
  );
});

//unhandled promise rejection
process.on('unhandledRejection', err => {
  console.log(chalk.red(`unhandled rejection: ${err.message}`));
  server.close(() => {
    process.exit(1);
  });
});
