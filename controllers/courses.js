const Courses = require('../models/Courses');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc       Get All Courses
//@route      Get api/v1/courses
//@route      Get api/v1/bootcamps/:bootcampId/courses
//@access     public
exports.getCourse = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Courses.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Courses.find().populate({
      path: 'bootcamp',
      select: 'name, location'
    });
  }

  const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    courses
  });
});
