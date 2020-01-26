const express = require('express');
const {
  getBootcamps,
  getOneBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps
} = require('../controllers/bootcamps');

const router = express.Router();

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
