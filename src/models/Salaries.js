const mongoose = require('mongoose');

const SalariesSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  salaryCoefficient: { type: Number, required: true },
  allowance: { type: Number, required: true },
  month: { type: Date, required: true },
  basicSalary: { type: Number, required: true },
  allowanceSalary: { type: Number, required: true },
  bonus: { type: Number, required: true },
  penalty: { type: Number, required: true },
  totalWorkingDays: { type: Number, required: true },
  totalWorkingHours: { type: Number, required: true },
  totalSalary: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Salaries', SalariesSchema);