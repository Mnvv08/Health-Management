const express = require('express');
const {
  bookAppointment,
  rescheduleAppointment,
  getMyAppointments,
  getAppointmentById,
  cancelAppointment,
  completeAppointment,
  getBookedSlots,
} = require('../controllers/appointmentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, bookAppointment);
router.route('/slots').get(getBookedSlots);
router.route('/my').get(protect, getMyAppointments);
router.route('/:id').get(protect, getAppointmentById);
router.route('/:id/cancel').put(protect, cancelAppointment);
router.route('/:id/reschedule').put(protect, rescheduleAppointment);
router.route('/:id/complete').put(protect, adminOnly, completeAppointment);

module.exports = router;