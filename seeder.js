const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });
const connectDb = require('./config/db');

const Bootcamps = require('./models/Bootcamps');
const Courses = require('./models/Courses');
const Users = require('./models/User');

const bootcampData = JSON.parse(
  fs.readFileSync(path.join(__dirname, './_data/bootcamps.json'), 'utf-8')
);
const coursesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, './_data/courses.json'), 'utf-8')
);
const UsersData = JSON.parse(
  fs.readFileSync(path.join(__dirname, './_data/users.json'), 'utf-8')
);

connectDb();

const importData = async () => {
  try {
    await Bootcamps.create(bootcampData);
    await Courses.create(coursesData);
    await Users.create(UsersData);
    console.log('data imported successfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Bootcamps.deleteMany();
    await Courses.deleteMany();
    await Users.deleteMany();
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
