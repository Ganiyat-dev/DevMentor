const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewsSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'please add a title'],
    maxlength: 500
  },
  text: {
    type: String,
    required: [true, 'please add a text']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'please add a rating']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: Schema.Types.ObjectId,
    ref: 'Bootcamps',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
});

const Reviews = mongoose.model('Reviews', ReviewsSchema);
module.exports = Reviews;
