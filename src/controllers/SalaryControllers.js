const Salary = require('../models/Salaries');
const Attendance_logs = require('../models/Attendance_logs');
const Employee = require('../models/Employees')
const AppError = require('../utils/AppError');
class SalaryController {
  // Lấy tất cả bảng lương
  static async getAllSalaries(req, res) {
    const salaries = await Salary.find().populate('employeeId');
    if (!salaries || salaries.length === 0) {
      throw new AppError("Không tìm thấy bảng lương", 404);
    }
    res.status(200).json(salaries);
  }
  // Lấy bảng lương theo ID
  static async getSalaryById(req, res) {
    const { id } = req.params;
    if(!id) {
      throw new AppError("Không có id bảng lương", 400);
    }
    const salary = await Salary.findById(id).populate('employeeId');
    if (!salary) {
      throw new AppError("Không tìm thấy bảng lương theo Id", 404);
    }
    res.status(200).json(salary);
  }
  static async getSalariesByManagerId(req, res) {
    const { id } = req.params;
    if(!id) {
      throw new AppError("Không có managerId", 400);
    }
    const employees = await Employee.find({ managerId: id }).select('_id');
    if (!employees || employees.length === 0) {
      throw new AppError("Không tìm thấy nhân viên theo managerId", 404);
    }
    const employeeIds = employees.map(emp => emp._id);
    const salaries = await Salary.find({ employeeId: { $in: employeeIds } }).populate('employeeId');
    if (!salaries || salaries.length === 0) {
      throw new AppError("Không tìm thấy bảng lương theo managerId", 404);
    }
    res.status(200).json(salaries);
  }
  // Lấy bảng lương theo employeeId
  static async getSalariesByEmployeeId(req, res) {
    const { employeeId } = req.params;
    if(!employeeId) {
      throw new AppError("Không có employeeId", 400);
    }
    const salaries = await Salary.find({ employeeId }).populate('employeeId');
    if (!salaries || salaries.length === 0) {
      throw new AppError("Nhân viên này không có bảng lương", 404);
    }
    res.status(200).json(salaries);
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
    if (!employeeId || !month || !year || !totalSalary || !bonus || !noteBonus || !penalty || !notePenalty) {
      throw new AppError("Thiếu thông tin để tạo bảng lương", 400);
    }
    let totalWorkingDays = 0;
    let totalWorkingHours = 0;
    const startDate = new Date(year, month - 1, 1); // ngày đầu tháng
    const endDate = new Date(year, month, 1);       // ngày đầu tháng sau

    const attendances = await Attendance_logs.find({
      employeeId,
      date: { $gte: startDate, $lt: endDate }
    });
    if (!attendances || attendances.length === 0) {
      totalWorkingDays = 0;
      totalWorkingHours = 0;
    } else {
      attendances.forEach(attendance => {
        if(attendance.status == "Present") {
          totalWorkingDays += 1;
          totalWorkingHours += 8;
        } else if(attendance.status == "Half") {
          totalWorkingDays += 1;
          totalWorkingHours += 4;
        }
      });
    }
    const newSalary = new Salary({
      employeeId,
      month,
      year,
      bonus,
      noteBonus,
      penalty,
      notePenalty,
      totalSalary,
      totalWorkingDays,
      totalWorkingHours
    });
    await newSalary.save();
    res.status(201).json(newSalary);
  }
  // Cập nhật bảng lương
  static async updateSalary(req, res) {
    const { id } = req.params;
    if(!id) {
      throw new AppError("Không có id bảng lương", 400);
    }
    const {
      employeeId,
      month,
      year,
      bonus,
      noteBonus,
      penalty,
      notePenalty,
      totalSalary,
      totalWorkingDays,
      totalWorkingHours
    } = req.body;
    if (!employeeId || !month || !year || !totalSalary || !bonus || !noteBonus || !penalty || !notePenalty || !totalWorkingDays || !totalWorkingHours) {
      throw new AppError("Thiếu thông tin cần cập nhật bảng lương", 400);
    }
    const updatedSalary = await Salary.findByIdAndUpdate(id, {
      employeeId,
      month,
      year,
      bonus,
      noteBonus,
      penalty,
      notePenalty,
      totalSalary,
      totalWorkingDays,
      totalWorkingHours
    }, { new: true }).populate('employeeId');
    if (!updatedSalary) {
      throw new AppError("Không tìm thấy bảng lương theo Id", 404);
    }
    res.status(200).json(updatedSalary);

  }
  // Xóa bảng lương
  static async deleteSalary(req, res) {
    const { id } = req.params;
    if(!id) {
      throw new AppError("Không có id bảng lương", 400);
    }
    const deletedSalary = await Salary.findByIdAndDelete(id);
    if (!deletedSalary) {
      throw new AppError("Không tìm thấy bảng lương theo Id", 404);
    }
    res.status(200).json("Bảng lương đã được xóa thành công");
  }
}

module.exports = SalaryController;