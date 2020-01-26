const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDb = require('./config/db.js');

// handle uncaught exception
process.on('uncaughtException', err => {
  console.log(`uncaught exception: ${err.message}`);
  process.exit(1);
});

//routes
const bootcampsRoutes = require('./routes/bootcamps');

const app = express();

dotenv.config({ path: './config/config.env' });

//connect db
connectDb();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use('/api/v1/bootcamps', bootcampsRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `server is in ${process.env.NODE_ENV} mode & listening on port ${process.env.PORT}`
  );
});

//unhandled promise rejection
process.on('unhandledRejection', err => {
  console.log(`unhandled rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
