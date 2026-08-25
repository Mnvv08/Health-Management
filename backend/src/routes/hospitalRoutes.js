const express = require('express');
const {
  getAllHospitals,
  getHospitalById,
  createHospital,
} = require('../controllers/hospitalController');

const router = express.Router();

router.route('/')
  .get(getAllHospitals)
  .post(createHospital);

router.route('/:id')
  .get(getHospitalById);

module.exports = router;
