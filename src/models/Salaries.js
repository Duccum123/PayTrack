const mongoose = require('mongoose');

const SalariesSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  bonus: { type: Number, required: true }, // thưởng
  penalty: { type: Number, required: true }, // phạt
  noteBonus: {type: String, required: true}, // ghi chú thưởng
  notePenalty: {type: String, required: true}, // ghi chú phạt
  totalWorkingDays: { type: Number, required: true },
  totalWorkingHours: { type: Number, required: true },
  totalSalary: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Salaries', SalariesSchema);