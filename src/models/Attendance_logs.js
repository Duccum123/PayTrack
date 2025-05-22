const mongoose = require('mongoose');

const AttendanceLogSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  workingHours: { type: Number, required: true },
  status: { type: String, enum: ['Present', 'Half', 'Absent'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('AttendanceLog', AttendanceLogSchema);