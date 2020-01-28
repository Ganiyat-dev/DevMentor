const express = require('express');
const {
  getBootcamps,
  getOneBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsByRadius
} = require('../controllers/bootcamps');

//include other resource router
const coursesRouter = require('./course');

const router = express.Router();
//re-route to course route
router.use('/:bootcampId/courses', coursesRouter);

router.route('/radius/:distance/:lng/:lat/:unit').get(getBootcampsByRadius);

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamps);
router
  .route('/:id')
  .get(getOneBootcamps)
  .patch(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;
