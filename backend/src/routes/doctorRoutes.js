const express = require('express');
const {
  getAllDoctors,
  getSpecialities,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Must come before /:id or "specialities" is treated as an ID
router.route('/specialities').get(getSpecialities);

router.route('/')
  .get(getAllDoctors)
  .post(protect, adminOnly, createDoctor);

router.route('/:id')
  .get(getDoctorById)
  .put(protect, adminOnly, updateDoctor)
  .delete(protect, adminOnly, deleteDoctor);

module.exports = router;