const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
    location: {
      address: String,
      city: String,
      state: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    specialities: [String],
    facilities: [String],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    phone: String,
    email: String,
    timings: String,
    isOpenNow: {
      type: Boolean,
      default: true,
    },
    isEmergency: {
      type: Boolean,
      default: false,
    },
    distance: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hospital', hospitalSchema);
