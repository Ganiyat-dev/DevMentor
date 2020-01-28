const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });
const connectDb = require('./config/db');
const Bootcamps = require('./models/Bootcamps');

const bootcampData = JSON.parse(
  fs.readFileSync(path.join(__dirname, './_data/bootcamps.json'), 'utf-8')
);

connectDb();


const importData = async () => {
  try {
    await Bootcamps.create(bootcampData);
    console.log('data imported successfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Bootcamps.deleteMany();
    console.log('data deleted successfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else if (process.argv[2] === '-i') {
  importData();
}
