const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  getCourse,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');

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
  .post(createCourse);
router
  .route('/:id')
  .get(getOneCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

module.exports = router;
