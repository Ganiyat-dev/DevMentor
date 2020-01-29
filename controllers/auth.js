const Users = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc       POST Create Users
//@route      POST api/v1/auth/register
//@access     public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await Users.create({
    name,
    email,
    password,
    role
  });

  const token = await user.getJwtToken();

  res.status(200).json({
    success: true,
    token
  });
});

//@desc       POST login Users
//@route      POST api/v1/auth/login
//@access     public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse('email and password fields are required', 400)
    );
  }

  const user = await Users.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(user.password, password))) {
    return next(new ErrorResponse('Invalid Credencials', 401));
  }

  const token = await user.getJwtToken();
  req.user = user;
  res.status(200).json({
    success: true,
    token
  });
});
