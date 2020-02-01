const express = require('express');

const router = express.Router({ mergeParams: true });

const { getReviews, getOneReview } = require('../controllers/reviews');

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

router.route('/:id').get(getOneReview);

module.exports = router;
