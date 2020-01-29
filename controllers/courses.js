const Courses = require('../models/Courses');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamps');

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
      select: 'name, description'
    });
  }

  const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
});

//@desc       Get Single Courses
//@route      Get api/v1/courses/:id
//@access     public
exports.getOneCourse = asyncHandler(async (req, res, next) => {
  const course = await Courses.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name, description'
  });

  if (!course) {
    return next(
      new ErrorResponse(`No Resource found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course
  });
});

//@desc       POST  Course
//@route      POST api/v1/bootcamp/:bootcampId/course
//@access     private
exports.createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No Resource found with this id: ${req.params.bootcampId}`,
        404
      )
    );
  }
  const course = await Courses.create(req.body);

  res.status(201).json({
    success: true,
    data: course
  });
});

//@desc       update  Course
//@route      POST api/v1/courses/:id
//@access     private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Courses.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No Resource found with this id: ${req.params.id}`, 404)
    );
  }
  course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: course
  });
});

//@desc       Delete  Course
//@route      Delete api/v1/courses/:id
//@access     private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Courses.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No Resource found with this id: ${req.params.id}`, 404)
    );
  }

  course.remove();
  res.status(204).json({
    success: true,
    data: null
  });
});
