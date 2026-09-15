
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const { generateSlots, normalizeDate } = require('../utils/slots');

const POPULATE = [
  { path: 'doctor', select: 'name photo speciality consultationFee' },
  { path: 'hospital', select: 'name location' },
];

// Appointments can't be cancelled or moved within this window
const CUTOFF_HOURS = 2;

const slotToDate = (date, timeSlot) => {
  const [h, m] = timeSlot.split(':').map(Number);
  return new Date(date.getTime() + (h * 60 + m) * 60 * 1000);
};

// @desc    Book an appointment
// @route   POST /api/appointments
const bookAppointment = async (req, res, next) => {
  try {
    const { doctorId, hospitalId, date, timeSlot, notes } = req.body;

    if (!doctorId || !hospitalId || !date || !timeSlot) {
      res.status(400);
      throw new Error('doctorId, hospitalId, date and timeSlot are required');
    }

    const day = normalizeDate(date);
    if (!day) {
      res.status(400);
      throw new Error('Invalid date');
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.status(404);
      throw new Error('Doctor not found');
    }

    const validSlots = generateSlots(doctor, day);
    if (!validSlots.includes(timeSlot)) {
      res.status(400);
      throw new Error('This doctor is not available at that time');
    }

    if (slotToDate(day, timeSlot) <= new Date()) {
      res.status(400);
      throw new Error('Cannot book an appointment in the past');
    }

    const appointment = await Appointment.create({
      user: req.user.id,
      doctor: doctorId,
      hospital: hospitalId,
      date: day,
      timeSlot,
      notes,
      consultationFee: doctor.consultationFee || 0,
      status: 'confirmed',
    });

    const populated = await Appointment.findById(appointment._id).populate(POPULATE);
    res.status(201).json({ success: true, appointment: populated });
  } catch (error) {
    // Unique index rejected it - someone booked this slot microseconds earlier
    if (error.code === 11000) {
      res.status(409);
      return next(new Error('This slot was just booked. Please choose another time.'));
    }
    next(error);
  }
};

// @desc    Move an appointment to a new slot
// @route   PUT /api/appointments/:id/reschedule
const rescheduleAppointment = async (req, res, next) => {
  try {
    const { date, timeSlot } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to modify this appointment');
    }

    if (appointment.status !== 'confirmed' && appointment.status !== 'pending') {
      res.status(400);
      throw new Error(`Cannot reschedule a ${appointment.status} appointment`);
    }

    const existingStart = slotToDate(appointment.date, appointment.timeSlot);
    const hoursAway = (existingStart - Date.now()) / 36e5;
    if (hoursAway < CUTOFF_HOURS && req.user.role !== 'admin') {
      res.status(400);
      throw new Error(`Appointments cannot be changed within ${CUTOFF_HOURS} hours of the start time`);
    }

    const day = normalizeDate(date);
    if (!day || !timeSlot) {
      res.status(400);
      throw new Error('A valid date and timeSlot are required');
    }

    const doctor = await Doctor.findById(appointment.doctor);
    if (!doctor) {
      res.status(404);
      throw new Error('Doctor no longer available');
    }

    if (!generateSlots(doctor, day).includes(timeSlot)) {
      res.status(400);
      throw new Error('This doctor is not available at that time');
    }

    if (slotToDate(day, timeSlot) <= new Date()) {
      res.status(400);
      throw new Error('Cannot reschedule to a time in the past');
    }

    appointment.date = day;
    appointment.timeSlot = timeSlot;
    await appointment.save();

    const populated = await Appointment.findById(appointment._id).populate(POPULATE);
    res.status(200).json({ success: true, appointment: populated });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409);
      return next(new Error('That slot is already taken. Please choose another time.'));
    }
    next(error);
  }
};

// @desc    Get logged in user appointments
// @route   GET /api/appointments/my
const getMyAppointments = async (req, res, next) => {
  try {
    const { status, upcoming } = req.query;
    const filter = { user: req.user.id };

    if (status) filter.status = status;
    if (upcoming === 'true') {
      filter.date = { $gte: normalizeDate(new Date()) };
      filter.status = filter.status || { $in: ['pending', 'confirmed'] };
    }

    const appointments = await Appointment.find(filter)
      .populate(POPULATE)
      .sort(upcoming === 'true' ? { date: 1 } : { date: -1 });

    res.status(200).json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(POPULATE);

    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to access this appointment');
    }

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel an appointment
// @route   PUT /api/appointments/:id/cancel
const cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to modify this appointment');
    }

    if (appointment.status === 'cancelled') {
      res.status(400);
      throw new Error('Already cancelled');
    }

    if (appointment.status === 'completed') {
      res.status(400);
      throw new Error('Cannot cancel a completed appointment');
    }

    const start = slotToDate(appointment.date, appointment.timeSlot);
    const hoursAway = (start - Date.now()) / 36e5;
    if (hoursAway < CUTOFF_HOURS && req.user.role !== 'admin') {
      res.status(400);
      throw new Error(`Appointments cannot be cancelled within ${CUTOFF_HOURS} hours of the start time`);
    }

    appointment.status = 'cancelled';
    appointment.cancelledAt = new Date();
    appointment.cancelledBy = req.user.id;
    await appointment.save();

    res.status(200).json({ success: true, message: 'Appointment cancelled', appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark an appointment completed (admin)
// @route   PUT /api/appointments/:id/complete
const completeAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    if (appointment.status === 'cancelled') {
      res.status(400);
      throw new Error('Cannot complete a cancelled appointment');
    }

    appointment.status = 'completed';
    await appointment.save();

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Get available and booked slots for a doctor on a date
// @route   GET /api/appointments/slots
const getBookedSlots = async (req, res, next) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      res.status(400);
      throw new Error('Please provide doctorId and date');
    }

    const day = normalizeDate(date);
    if (!day) {
      res.status(400);
      throw new Error('Invalid date');
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.status(404);
      throw new Error('Doctor not found');
    }

    const allSlots = generateSlots(doctor, day);

    const appointments = await Appointment.find({
      doctor: doctorId,
      date: day,
      status: { $in: ['pending', 'confirmed'] },
    }).select('timeSlot');

    const bookedSlots = appointments.map((a) => a.timeSlot);
    const now = new Date();

    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot) && slotToDate(day, slot) > now
    );

    res.status(200).json({ success: true, allSlots, bookedSlots, availableSlots });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  bookAppointment,
  rescheduleAppointment,
  getMyAppointments,
  getAppointmentById,
  cancelAppointment,
  completeAppointment,
  getBookedSlots,
};