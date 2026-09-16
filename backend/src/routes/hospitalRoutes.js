const express = require('express');
const {
  getAllHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital,
} = require('../controllers/hospitalController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getAllHospitals)
  .post(protect, adminOnly, createHospital);

router.route('/:id')
  .get(getHospitalById)
  .put(protect, adminOnly, updateHospital)
  .delete(protect, adminOnly, deleteHospital);

module.exports = router;