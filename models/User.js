const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'please add a valid email'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'publisher'],
      message: 'role must be either user or publisher'
    },
    default: 'user'
  },
  forgetPasswordResetToken: String,
  forgetPasswordExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//encrypt password
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// create token
UserSchema.methods.getJwtToken = async function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN
  });
};

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;
