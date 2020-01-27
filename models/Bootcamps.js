const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const BootcampSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'name must no be more than 50 characters long']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'please add a description'],
    maxlength: [500, 'description must no be more than 500 characters long']
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'please use a valid URL with HTTP or HTTPS'
    ]
  },
  phone: {
    type: String,
    required: [20, 'phone number must not be longer than 20 characters']
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'please add a valid email']
  },
  address: {
    type: String,
    required: [true, 'please add an address']
  },
  // location: {
  //   //GEOJSON
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //     required: true
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true,
  //     index: '2dsphere'
  //   },
  //   formattedAddress: String,
  //   street: String,
  //   city: String,
  //   state: String,
  //   zipcode: String,
  //   country: String
  // },
  careers: {
    type: [String],
    required: true,
    enum: {
      values: [
        'Web Development',
        'Mobile Development',
        'UI/UX',
        'Data Science',
        'Business',
        'Others'
      ],
      message: 'please use the right keywords'
    }
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating cannot be more than  10']
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  housing: {
    type: Boolean,
    default: false
  },
  jobAssistance: {
    type: Boolean,
    default: false
  },
  jobGuarantee: {
    type: Boolean,
    default: false
  },
  acceptGi: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bootcamps', BootcampSchema);
