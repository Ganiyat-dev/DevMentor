const crypto = require('crypto');
const Users = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/email');

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
  }

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

//@desc       Get logged in Users
//@route      GET api/v1/auth/me
//@access     private
exports.getMe = asyncHandler(async (req, res, next) => {
  // console.log(req.user)
  const user = await Users.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc       forget password
//@route      POST api/v1/auth/forgetpassword
//@access     public
exports.forgetpassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorResponse('email is required', 400));
  }

  const user = await Users.findOne({ email });

  if (!user) {
    return next(
      new ErrorResponse('this email is not registered on this platform', 404)
    );
  }

  const resetToken = user.sendResetToken();

  await user.save({ validateBeforeSave: false });

  const replyURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;
  const message = `You recieve the message because you requested that you have forgoten your password \n make a PUT request to ${replyURL} \n if you didn't forget your password, please ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your Password Reset Token',
      message
    });

    res.status(200).json({
      success: true,
      msg: 'reset password email sent successfully'
    });
  } catch (err) {
    console.log(`Email: ${err.message}`);
    user.forgetPasswordResetToken = undefined;
    user.forgetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new ErrorResponse('your email could not be sent. try again', 500)
    );
  }
});

//@desc       reset password
//@route      PATCH api/v1/auth/resetpassword/:token
//@access     public
exports.resetpassword = asyncHandler(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await Users.findOne({
    forgetPasswordResetToken: hashedToken,
    forgetPasswordExpires: { $gte: Date.now() }
  });

  if (!user) {
    return next('Invalid Token ', 400);
  }

  try {
    user.password = req.body.password;
    user.forgetPasswordResetToken = undefined;
    user.forgetPasswordExpires = undefined;
    await user.save();

    sendToken(user, 200, res);
  } catch (err) {
    console.log(err.message);
  }
});
