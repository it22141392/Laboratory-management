const PatientModel = require('../models/PatientModel');

const getPatients = async (req, res) => {
  try {
    const patients = await PatientModel.find();
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addPatient = async (req, res) => {
  try {
    const newPatient = new PatientModel(req.body);
    await newPatient.save();
    res.status(201).json({ message: 'Patient added successfully', newPatient });
  } catch (error) {
    console.error('Error adding patient:', error);
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPatient = await PatientModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient updated successfully', updatedPatient });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPatient = await PatientModel.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully', deletedPatient });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
};

module.exports = { getPatients, addPatient, updatePatient, deletePatient };
