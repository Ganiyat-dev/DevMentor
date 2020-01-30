const express = require('express');
const {
  getBootcamps,
  getOneBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsByRadius,
  fileupload
} = require('../controllers/bootcamps');

const protect = require('../middleware/protect');
//advance results
const Bootcamps = require('../models/Bootcamps');
const advanceResults = require('../middleware/advanceResults');

//include other resource router
const coursesRouter = require('./course');

const router = express.Router();
//re-route to course route
router.use('/:bootcampId/courses', coursesRouter);

router.route('/radius/:distance/:lng/:lat/:unit').get(getBootcampsByRadius);
router.route('/:id/photo').patch(fileupload);
router
  .route('/')
  .get(advanceResults(Bootcamps, 'courses'), getBootcamps)
  .post(protect, createBootcamps);
router
  .route('/:id')
  .get(getOneBootcamps)
  .patch(protect, updateBootcamps)
  .delete(protect, deleteBootcamps);

module.exports = router;
