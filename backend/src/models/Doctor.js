const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: String,
    speciality: String,
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
    },
    experience: Number,
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
    qualifications: [String],
    languages: [String],
    consultationFee: Number,
    availability: {
      days: [String],
      startTime: String,
      endTime: String,
    },
    isAvailableToday: {
      type: Boolean,
      default: true,
    },
    phone: String,
    bio: String,
    awards: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);
