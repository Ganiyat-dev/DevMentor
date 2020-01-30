const Users = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//send token via cookie and response body
const sendToken = async function(user, statusCode, res) {
  const token = await user.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
     options.secure = true;
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};

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

  sendToken(user, 200, res);
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

  sendToken(user, 200, res);
});
