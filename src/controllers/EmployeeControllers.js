const Employee = require('../models/Employees');
const User = require('../models/Users');
const AppError = require('../utils/AppError')

class EmployeeController {
  // Lấy tất cả nhân viên
  static async getAllEmployees(req, res) {
      const employees = await Employee.find();
      if(employees.length === 0) throw new AppError("Không tìm thấy nhân viên", 404)
      res.status(200).json(employees);
  }
  static async getEmployeesByManagerId(req, res) {
  const { id } = req.params;
  if(!id) {
    throw new AppError("Không có managerId", 400)
  }
  const employees = await Employee.find({managerId : id});
    if (employees.length === 0) {
      throw new AppError("Không tìm thấy nhân viên theo managerId", 404)
    }
    res.status(200).json(employees);
  }

  // Lấy nhân viên theo ID
  static async getEmployeeById(req, res) {
    const { id } = req.params;
    if(!id) {
    throw new AppError("Không có employeeId", 400)
  }
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new AppError("Không tìm thấy nhân viên theo Id nhân viên", 404)
      }
      res.status(200).json(employee);
  }
  // Tạo nhân viên mới
  static async createEmployee(req, res) {
    const {
      name, email, phone, position, department,
      basicSalary, allowance, gender,
      dateOfBirth, startDate
    } = req.body;
    console.log(req.body);
    if(!name || !email || !phone || !position || !department || !basicSalary || !allowance || !gender || !dateOfBirth || !startDate) {
      throw new AppError("Thông tin không đủ để tạo nhân viên", 400)
    }
    const existingUserByEmail = await Employee.findOne({email})
    if(existingUserByEmail) {
      throw new AppError("Đã tồn tại email", 405)
    }
      // Tạo mới nhân viên
      const newEmployee = new Employee({
        name, email, phone, position, department,
        basicSalary, allowance, gender,
        dateOfBirth, startDate
      });
      await newEmployee.save();
      const emplyeeId = newEmployee._id;
      const username  = email;
      const newUser = new User({
        username, password: 'abc123', role: 'user', emplyeeId
      });
      await newUser.save();
      res.status(201).json(newUser.populate('emplyeeId'));
  }

  // Cập nhật nhân viên
  static async updateEmployee(req, res) {
    const { id } = req.params;
    if(!id) {
      throw new AppError("Không có employeeId", 400)
    }
    const {name, email, phone, position, department, basicSalary,
      allowance, gender, dateOfBirth, startDate
    } = req.body;
    if(!name || !email || !phone || !position || !department || !basicSalary || !allowance || !gender || !dateOfBirth || !startDate) {
      throw new AppError("Thông tin không đủ để cập nhật nhân viên", 400)
    }
    if(isNaN(dateOfBirth) || isNaN(startDate)) {
      throw new AppError("Thông tin ngày sinh hoặc ngày bắt đầu không hợp lệ", 400)
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, phone, position, department, basicSalary, allowance, gender, dateOfBirth, startDate },
      { new: true })
      if(!updatedEmployee) {
        throw new AppError("Không tìm thấy nhân viên theo Id nhân viên", 404)
      }
      res.status(200).json(updatedEmployee);
  }

  // Xóa nhân viên
  static async deleteEmployee(req, res) {
    const { id } = req.params;
    if(!id) {
      throw new AppError("Không có employeeId", 400)
    }
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      throw new AppError("Không tìm thấy nhân viên theo Id nhân viên", 404)
    }
    res.status(200).json({ message: 'Nhân viên đã được xóa thành công' });
  }
}

module.exports = EmployeeController;
