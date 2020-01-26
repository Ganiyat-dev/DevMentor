const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
//routes
const bootcampsRoutes = require('./routes/bootcamps');

const app = express();
dotenv.config({ path: './config/config.env' });

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use('/api/v1/bootcamps', bootcampsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `server is in ${process.env.NODE_ENV} mode & listening on port ${process.env.PORT}`
  );
});
