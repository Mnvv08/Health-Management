const express = require('express');
const {
  getAllDoctors,
  getDoctorById,
  createDoctor,
} = require('../controllers/doctorController');

const router = express.Router();

router.route('/')
  .get(getAllDoctors)
  .post(createDoctor);

router.route('/:id')
  .get(getDoctorById);

module.exports = router;
