const Salary = require('../models/Salaries');
const Attendance_logs = require('../models/Attendance_logs');
class SalaryController {
  // Lấy tất cả bảng lương
  static async getAllSalaries(req, res) {
    try {
      const salaries = await Salary.find().populate('employeeId');
      res.status(200).json(salaries);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching salaries', error });
    }
  }
  // Lấy bảng lương theo ID
  static async getSalaryById(req, res) {
    const { id } = req.params;
    try {
      const salary = await Salary.findById(id).populate('employeeId');
      if (!salary) {
        return res.status(404).json({ message: 'Salary not found' });
      }
      res.status(200).json(salary);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching salary', error });
    }
  }
  // Lấy bảng lương theo employeeId
  static async getSalariesByEmployeeId(req, res) {
    const { employeeId } = req.params;
    try {
      const salaries = await Salary.find({ employeeId }).populate('employeeId');
      if (!salaries) {
        return res.status(404).json({ message: 'Salaries not found' });
      }
      res.status(200).json(salaries);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching salaries', error });
    }
  }
  // Tao bảng lương mới
  static async createSalary(req, res) {
    const {
      employeeId,
      month,
      year,
      bonus,
      noteBonus,
      penalty,
      notePenalty,
      totalSalary,
    } = req.body;
    let totalWorkingDays = 0;
    let totalWorkingHours = 0;
    const startDate = new Date(year, month - 1, 1); // ngày đầu tháng
    const endDate = new Date(year, month, 1);       // ngày đầu tháng sau

    const attendances = await Attendance_logs.find({
      employeeId,
      date: { $gte: startDate, $lt: endDate }
    });
    attendances.forEach(attendance => {
      if(attendance.status == "Present") {
        totalWorkingDays += 1;
        totalWorkingHours += 8;
      } else if(attendance.status == "Half") {
        totalWorkingDays += 1;
        totalWorkingHours += 4;
      }
    });
    try {
      const newSalary = new Salary({
        employeeId,
        month,
        year,
        bonus,
        noteBonus,
        penalty,
        notePenalty,
        totalWorkingDays,
        totalWorkingHours,
        totalSalary,
      });
      await newSalary.save();
      res.status(201).json(newSalary);
    } catch (error) {
      res.status(500).json({ message: 'Error creating salary', error });
    }
  }
  // Cập nhật bảng lương
  static async updateSalary(req, res) {
    const { id } = req.params;

    try {
      const updatedSalary = await Salary.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!updatedSalary) {
        return res.status(404).json({ message: 'Salary not found' });
      }
      res.status(200).json(updatedSalary);
    } catch (error) {
      res.status(500).json({ message: 'Error updating salary', error });
    }
  }
  // Xóa bảng lương
  static async deleteSalary(req, res) {
    const { id } = req.params;

    try {
      const deletedSalary = await Salary.findByIdAndDelete(id);
      if (!deletedSalary) {
        return res.status(404).json({ message: 'Salary not found' });
      }
      res.status(200).json({ message: 'Salary deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting salary', error });
    }
  }
}

module.exports = SalaryController;