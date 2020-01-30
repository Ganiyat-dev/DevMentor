const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  getCourse,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');

const protect = require('../middleware/protect');

//advance results
const Courses = require('../models/Courses');
const advanceResults = require('../middleware/advanceResults');

router
  .route('/')
  .get(
    advanceResults(Courses, {
      path: 'bootcamp',
      select: 'name, description'
    }),
    getCourse
  )
  .post(protect, createCourse);
router
  .route('/:id')
  .get(getOneCourse)
  .patch(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
