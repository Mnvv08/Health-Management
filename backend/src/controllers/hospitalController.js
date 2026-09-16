const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');

const ALLOWED_SORTS = {
  rating: { rating: -1 },
  name: { name: 1 },
  newest: { createdAt: -1 },
};

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// @desc    Get all hospitals with search, filters, pagination
// @route   GET /api/hospitals
// @access  Public
const getAllHospitals = async (req, res, next) => {
  try {
    const {
      search,
      speciality,
      rating,
      isEmergency,
      sort = 'rating',
      page = 1,
      limit = 12,
    } = req.query;

    const query = {};

    if (search) {
      const safe = escapeRegex(search.trim());
      query.$or = [
        { name: { $regex: safe, $options: 'i' } },
        { location: { $regex: safe, $options: 'i' } },
      ];
    }

    if (speciality && speciality !== 'All') {
      query.specialities = { $in: [speciality] };
    }

    if (rating && rating !== 'All' && !isNaN(rating)) {
      query.rating = { $gte: Number(rating) };
    }

    if (isEmergency === 'true') {
      query.isEmergency = true;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const perPage = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (pageNum - 1) * perPage;

    const sortBy = ALLOWED_SORTS[sort] || ALLOWED_SORTS.rating;

    const [hospitals, total] = await Promise.all([
      Hospital.find(query).sort(sortBy).skip(skip).limit(perPage),
      Hospital.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: hospitals.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / perPage) || 1,
      data: hospitals,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single hospital with its doctors
// @route   GET /api/hospitals/:id
// @access  Public
const getHospitalById = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      res.status(404);
      throw new Error('Hospital not found');
    }

    const doctors = await Doctor.find({ hospital: hospital._id })
      .select('name photo speciality experience rating consultationFee')
      .sort({ rating: -1 });

    res.status(200).json({ success: true, data: hospital, doctors });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new hospital
// @route   POST /api/hospitals
// @access  Private/Admin
const createHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json({ success: true, data: hospital });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a hospital
// @route   PUT /api/hospitals/:id
// @access  Private/Admin
const updateHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hospital) {
      res.status(404);
      throw new Error('Hospital not found');
    }

    res.status(200).json({ success: true, data: hospital });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a hospital
// @route   DELETE /api/hospitals/:id
// @access  Private/Admin
const deleteHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      res.status(404);
      throw new Error('Hospital not found');
    }

    const doctorCount = await Doctor.countDocuments({ hospital: hospital._id });
    if (doctorCount > 0) {
      res.status(409);
      throw new Error(
        `This hospital has ${doctorCount} doctor(s) attached. Reassign or remove them first.`
      );
    }

    await hospital.deleteOne();
    res.status(200).json({ success: true, message: 'Hospital deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital,
};