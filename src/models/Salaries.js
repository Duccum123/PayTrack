const mongoose = require('mongoose');

const SalariesSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  salaryCoefficient: { type: Number, required: true }, // hệ số
  allowance: { type: Number, required: true }, // trợ cấp
  month: { type: Date, required: true },
  basicSalary: { type: Number, required: true }, // lương cơ bản
  bonus: { type: Number, required: true }, // thưởng
  penalty: { type: Number, required: true }, // phạt
  totalWorkingDays: { type: Number, required: true },
  totalWorkingHours: { type: Number, required: true },
  totalSalary: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Salaries', SalariesSchema);