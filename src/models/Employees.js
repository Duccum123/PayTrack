const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  salaryCoefficient: { type: Number, required: true },
  allowance: { type: Number, required: true },
  gender: { type: String, enum:['Nam', 'Nữ'], required: true },
  dateOfBirth: { type: Date, required: true },
  startDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);