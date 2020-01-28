const express = require('express');
const {
  getBootcamps,
  getOneBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsByRadius
} = require('../controllers/bootcamps');

const router = express.Router();
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
