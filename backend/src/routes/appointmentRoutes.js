const express = require('express');
const {
  bookAppointment,
  getMyAppointments,
  getAppointmentById,
  cancelAppointment,
  getBookedSlots,
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, bookAppointment);

router.route('/slots')
  .get(getBookedSlots);

router.route('/my')
  .get(protect, getMyAppointments);

router.route('/:id')
  .get(protect, getAppointmentById);

router.route('/:id/cancel')
  .put(protect, cancelAppointment);

module.exports = router;
