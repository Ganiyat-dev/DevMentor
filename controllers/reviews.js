const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamps');
const Reviews = require('../models/Reviews');

//@desc  Get all reviews
//@route Get api/v1/bootcamp/:bootcampId/reviews
//@access public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Reviews.find({ bootcamp: req.params.bootcampId });
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advanceResults);
  }
});

//@desc  Get single review
//@route Get api/v1/reviews/:id
//@access public
exports.getOneReview = asyncHandler(async (req, res, next) => {
  const review = await Reviews.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name, description'
  });

  if (!review) {
    return next(
      new ErrorResponse(`No resource found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: true,
    data: review
  });
});

//@desc  Create review
//@route Get api/v1/bootcamp/:bootcampId/reviews
//@access private
exports.CreateReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No resource found with this id: ${req.params.bootcampId}`,
        404
      )
    );
  }

  const review = await Reviews.create(req.body);

  res.status(200).json({
    status: true,
    data: review
  });
});
