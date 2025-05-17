const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    baseSalary: { type: Number, required: true },
    standardWorkingHours: { type: Number, required: true },
    penaltyPerMinute: { type: Number, required: true },
    bonusPerGoodMonth: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Setting', SettingSchema);