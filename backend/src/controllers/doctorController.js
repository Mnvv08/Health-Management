const Doctor = require('../models/Doctor');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getAllDoctors = async (req, res, next) => {
  try {
    const { search, speciality, experience } = req.query;
    
    let query = {};
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    if (speciality && speciality !== 'All') {
      query.speciality = speciality;
    }
    
    if (experience && experience !== 'All') {
      // Experience comes in as "10" or "0-5 years" etc depending on frontend implementation
      // We will handle basic numeric query if it's purely a number
      if (!isNaN(experience)) {
        query.experience = { $gte: Number(experience) };
      }
    }

    const doctors = await Doctor.find(query).populate('hospital', 'name location');
    
    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('hospital', 'name location isEmergency');
    
    if (!doctor) {
      res.status(404);
      throw new Error('Doctor not found');
    }
    
    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new doctor
// @route   POST /api/doctors
// @access  Public (Will be protected later)
const createDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);
    
    res.status(201).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
};
