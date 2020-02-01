const express = require('express');

const router = express.Router({ mergeParams: true });

const { getReviews } = require('../controllers/reviews');

// const { protect, authorize } = require('../middleware/protect');

//advance results
const Reviews = require('../models/Reviews');
const advanceResults = require('../middleware/advanceResults');

router.route('/').get(
  advanceResults(Reviews, {
    path: 'bootcamp',
    select: 'name, description'
  }),
  getReviews
);

module.exports = router;
