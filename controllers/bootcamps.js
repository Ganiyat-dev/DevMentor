const Bootcamps = require('../models/Bootcamps');
const ErrorResponse = require('../utils/errorResponse');

//@desc       Get All Bootcamps
//@route      Get api/v1/bootcamps
//@access     public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.find();

    res.status(200).json({
      success: true,
      count: bootcamp.length,
      data: bootcamp
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      msg: err
    });
  }
};

//@desc       Get One Bootcamps
//@route      Get api/v1/bootcamps/:id
//@access     public
exports.getOneBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `No Resource found with this id: ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    next(err);
  }
};

//@desc       Create  Bootcamps
//@route      POST api/v1/bootcamps/
//@access     private
exports.createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      msg: err
    });
  }
};

//@desc       Update Bootcamps
//@route      PUT api/v1/bootcamps/:id
//@access     private
exports.updateBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!bootcamp) {
      return res.status(404).json({ msg: 'resource not found' });
    }

    res.status(200).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      msg: err
    });
  }
};

//@desc       Delete Bootcamps
//@route      Delete api/v1/bootcamps/:id
//@access     private
exports.deleteBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(404).json({ msg: 'resource not found' });
    }

    res.status(204).json({
      success: true,
      data: null
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      msg: err
    });
  }
};
