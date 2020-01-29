const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  getCourse,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');

router
  .route('/')
  .get(getCourse)
  .post(createCourse);
router
  .route('/:id')
  .get(getOneCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

module.exports = router;
