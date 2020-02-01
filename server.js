const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const chalk = require('chalk');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db.js');
const errorHandler = require('./middleware/errorHandler');

// handle uncaught exception
process.on('uncaughtException', err => {
  console.log(chalk.red(`uncaught exception: ${err.stack}`));
  process.exit(1);
});
dotenv.config({ path: './config/config.env' });

//routes
const bootcampsRoutes = require('./routes/bootcamps');
const coursesRoutes = require('./routes/course');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const reviewsRoutes = require('./routes/reviews');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

//connect db
connectDb();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

//file upload
app.use(fileupload());

app.use('/api/v1/bootcamps', bootcampsRoutes);
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/auth/users', usersRoutes);
app.use('/api/v1/reviews', reviewsRoutes);

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
  console.log(chalk.red(`unhandled rejection: ${err.stack}`));
  server.close(() => {
    process.exit(1);
  });
});
