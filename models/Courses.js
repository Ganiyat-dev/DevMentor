const mongoose = require('mongoose');
const {Schema} = mongoose;


const CourseSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'please add a title']
  },
  description: {
    type: String,
    required: [true, 'please add a description']
  },
  weeks: {
    type: String,
    required: [true, 'please add number of weeks']
  },
  tuition: {
    type: Number,
    required: [true, 'please add a tuition cost']
  },
  minimumSkill: {
    type: String,
    required: [true, 'please add your skill level'],
    enum: ['beginner', 'intermediate', 'advance']
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  }
});

module.exports = mongoose.model('Courses', CourseSchema);