const mongoose = require('mongoose');

const AttendanceLogSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  checkInTime: { type: Date, required: true },
  checkOutTime: { type: Date, required: true },
  date: { type: Date, required: true },
  workingHours: { type: Number, required: true },
  lateMinutes: { type: Number, default: 0 },
  earlyLeaveMinutes: { type: Number, default: 0 },
  status: { type: String, enum: ['Present', 'Late', 'Absent'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('AttendanceLog', AttendanceLogSchema);