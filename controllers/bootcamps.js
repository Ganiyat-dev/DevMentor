const Bootcamps = require('../models/Bootcamps');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc       Get All Bootcamps
//@route      Get api/v1/bootcamps
//@access     public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.find();

  res.status(200).json({
    success: true,
    count: bootcamp.length,
    data: bootcamp
  });
});

//@desc       Get One Bootcamps
//@route      Get api/v1/bootcamps/:id
//@access     public
exports.getOneBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Resource found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp
  });
});

//@desc       Create  Bootcamps
//@route      POST api/v1/bootcamps/
//@access     private
exports.createBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp
  });
});

//@desc       Update Bootcamps
//@route      PUT api/v1/bootcamps/:id
//@access     private
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Resource found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp
  });
});

//@desc       Delete Bootcamps
//@route      Delete api/v1/bootcamps/:id
//@access     private
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Resource found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    success: true,
    data: null
  });
});
