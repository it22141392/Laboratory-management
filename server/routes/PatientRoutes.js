const express = require('express');
const router = express.Router();
const {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} = require('../controllers/PatientController');

router.get("/get-patients", getPatients);
router.post("/add-patients", addPatient);
router.put("/edit-patients/:id", updatePatient);
router.delete("/delete-patients/:id", deletePatient);

module.exports = router;
