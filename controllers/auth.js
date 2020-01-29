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
