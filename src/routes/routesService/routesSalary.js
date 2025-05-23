const SalaryController = require('../../controllers/SalaryControllers');
const express = require('express');
const router = express.Router();
const protect = require('../../middleware/authMiddleware');
const reStrictTo = require('../../middleware/roleMiddleware');

// Lấy tất cả bảng lương
router.get('/', protect, reStrictTo('admin'), SalaryController.getAllSalaries);
// Lấy bảng lương theo ID
router.get('/:id', protect, reStrictTo('admin'), SalaryController.getSalaryById);
// lấy bảng lương theo managerId
router.get('/getByManager/:id', protect, reStrictTo('admin'), SalaryController.getSalariesByManagerId);
// Lấy bảng lương theo employeeId
router.get('/employee/:employeeId', protect, reStrictTo('admin'), SalaryController.getSalariesByEmployeeId);
// Tao bảng lương mới
router.post('/', protect, reStrictTo('admin'), SalaryController.createSalary);
// Cập nhật bảng lương
router.put('/:id', protect, reStrictTo('admin'), SalaryController.updateSalary);
// Xóa bảng lương
router.delete('/:id', protect, reStrictTo('admin'), SalaryController.deleteSalary);

module.exports = router;