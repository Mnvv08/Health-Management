const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private
const bookAppointment = async (req, res, next) => {
  try {
    const { doctorId, hospitalId, date, timeSlot, notes } = req.body;

    // Check if slot is already booked for this doctor
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date,
      timeSlot,
      status: { $ne: 'cancelled' },
    });

    if (existingAppointment) {
      res.status(400);
      throw new Error('This slot is already booked');
    }

    // Get doctor to fetch consultation fee
    const doctor = await Doctor.findById(doctorId);
    const consultationFee = doctor ? doctor.consultationFee : 0;

    // Create appointment
    const appointment = await Appointment.create({
      user: req.user.id,
      doctor: doctorId,
      hospital: hospitalId,
      date,
      timeSlot,
      notes,
      consultationFee,
      status: 'confirmed', // as per instructions
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('doctor', 'name speciality')
      .populate('hospital', 'name');

    res.status(201).json({
      success: true,
      appointment: populatedAppointment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user appointments
// @route   GET /api/appointments/my
// @access  Private
const getMyAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id })
      .populate('doctor', 'name photo speciality')
      .populate('hospital', 'name location')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctor', 'name photo speciality')
      .populate('hospital', 'name location');

    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    // Make sure user owns appointment
    if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to access this appointment');
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel an appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
const cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    // Make sure user owns appointment
    if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to access this appointment');
    }

    if (appointment.status === 'cancelled') {
      res.status(400);
      throw new Error('Already cancelled');
    }

    if (appointment.status === 'completed') {
      res.status(400);
      throw new Error('Cannot cancel a completed appointment');
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booked slots for a doctor on a specific date
// @route   GET /api/appointments/slots
// @access  Public
const getBookedSlots = async (req, res, next) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      res.status(400);
      throw new Error('Please provide doctorId and date');
    }

    const appointments = await Appointment.find({
      doctor: doctorId,
      date,
      status: { $ne: 'cancelled' },
    });

    const bookedSlots = appointments.map((app) => app.timeSlot);

    res.status(200).json({
      success: true,
      bookedSlots,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  getAppointmentById,
  cancelAppointment,
  getBookedSlots,
};
