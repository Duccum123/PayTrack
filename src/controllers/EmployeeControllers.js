const Employee = require('../models/Employees');
const User = require('../models/Users');

class EmployeeController {
  // Lấy tất cả nhân viên
  static async getAllEmployees(req, res) {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employees', error });
    }
  }

  // Lấy nhân viên theo ID
  static async getEmployeeById(req, res) {
    const { id } = req.params;
    try {
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employee', error });
    }
  }
  // Tạo nhân viên mới
  static async createEmployee(req, res) {
    const {
      name, email, phone, position, department,
      basicSalary, allowance, gender,
      dateOfBirth, startDate
    } = req.body;
    console.log(req.body);
    
      // Tạo mới nhân viên
    try {
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
    } catch (error) {
      console.error('Error creating employee:', error);
      res.status(500).json({ message: 'Error creating employee', error });
    }
  }

  // Cập nhật nhân viên
  static async updateEmployee(req, res) {
    const { id } = req.params;
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ message: 'Error updating employee', error });
    }
  }

  // Xóa nhân viên
  static async deleteEmployee(req, res) {
    const { id } = req.params;
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting employee', error });
    }
  }
}

module.exports = EmployeeController;
