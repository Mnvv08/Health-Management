const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

const ALLOWED_SORTS = {
  rating: { rating: -1, totalReviews: -1 },
  experience: { experience: -1 },
  fee_low: { consultationFee: 1 },
  fee_high: { consultationFee: -1 },
  name: { name: 1 },
};

// Escapes user input before it goes into a regex
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// @desc    Get all doctors with search, filters, sorting, pagination
// @route   GET /api/doctors
// @access  Public
const getAllDoctors = async (req, res, next) => {
  try {
    const {
      search,
      speciality,
      hospital,
      experience,
      minRating,
      maxFee,
      availableToday,
      sort = 'rating',
      page = 1,
      limit = 12,
    } = req.query;

    const query = {};

    if (search) {
      const safe = escapeRegex(search.trim());
      query.$or = [
        { name: { $regex: safe, $options: 'i' } },
        { speciality: { $regex: safe, $options: 'i' } },
        { bio: { $regex: safe, $options: 'i' } },
      ];
    }

    if (speciality && speciality !== 'All') {
      query.speciality = speciality;
    }

    if (hospital) {
      query.hospital = hospital;
    }

    if (experience && !isNaN(experience)) {
      query.experience = { $gte: Number(experience) };
    }

    if (minRating && !isNaN(minRating)) {
      query.rating = { $gte: Number(minRating) };
    }

    if (maxFee && !isNaN(maxFee)) {
      query.consultationFee = { $lte: Number(maxFee) };
    }

    if (availableToday === 'true') {
      query.isAvailableToday = true;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const perPage = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (pageNum - 1) * perPage;

    const sortBy = ALLOWED_SORTS[sort] || ALLOWED_SORTS.rating;

    const [doctors, total] = await Promise.all([
      Doctor.find(query)
        .populate('hospital', 'name location')
        .sort(sortBy)
        .skip(skip)
        .limit(perPage),
      Doctor.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: doctors.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / perPage) || 1,
      data: doctors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get the list of specialities that actually have doctors
// @route   GET /api/doctors/specialities
// @access  Public
const getSpecialities = async (req, res, next) => {
  try {
    const specialities = await Doctor.distinct('speciality', {
      speciality: { $nin: [null, ''] },
    });
    res.status(200).json({ success: true, data: specialities.sort() });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('hospital', 'name location isEmergency');

    if (!doctor) {
      res.status(404);
      throw new Error('Doctor not found');
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new doctor
// @route   POST /api/doctors
// @access  Private/Admin
const createDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin
const updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doctor) {
      res.status(404);
      throw new Error('Doctor not found');
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      res.status(404);
      throw new Error('Doctor not found');
    }

    // Don't orphan upcoming appointments
    const upcoming = await Appointment.countDocuments({
      doctor: doctor._id,
      status: { $in: ['pending', 'confirmed'] },
      date: { $gte: new Date() },
    });

    if (upcoming > 0) {
      res.status(409);
      throw new Error(
        `This doctor has ${upcoming} upcoming appointment(s). Cancel them before deleting.`
      );
    }

    await doctor.deleteOne();
    res.status(200).json({ success: true, message: 'Doctor deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDoctors,
  getSpecialities,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};