const Hospital = require('../models/Hospital');

// @desc    Get all hospitals
// @route   GET /api/hospitals
// @access  Public
const getAllHospitals = async (req, res, next) => {
  try {
    const { search, speciality, rating } = req.query;
    
    // Build query object
    let query = {};
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    if (speciality && speciality !== 'All') {
      query.specialities = { $in: [speciality] };
    }
    
    if (rating && rating !== 'All') {
      query.rating = { $gte: Number(rating) };
    }

    const hospitals = await Hospital.find(query);
    
    res.status(200).json({
      success: true,
      count: hospitals.length,
      data: hospitals,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single hospital
// @route   GET /api/hospitals/:id
// @access  Public
const getHospitalById = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    
    if (!hospital) {
      res.status(404);
      throw new Error('Hospital not found');
    }
    
    res.status(200).json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new hospital
// @route   POST /api/hospitals
// @access  Public (Will be protected later)
const createHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.create(req.body);
    
    res.status(201).json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHospitals,
  getHospitalById,
  createHospital,
};
