const SalaryController = require('../../controllers/SalaryControllers');
const express = require('express');
const router = express.Router();
const protect = require('../../middleware/authMiddleware');
const reStrictTo = require('../../middleware/roleMiddleware');
const asyncHandler = require('../../middleware/asyncHandler');

// Lấy tất cả bảng lương
router.get('/', protect, reStrictTo('admin'), asyncHandler(SalaryController.getAllSalaries));
// Lấy bảng lương theo ID
router.get('/:id', protect, reStrictTo('admin'), asyncHandler(SalaryController.getSalaryById));
// lấy bảng lương theo managerId
router.get('/getByManager/:id', protect, reStrictTo('admin'), asyncHandler(SalaryController.getSalariesByManagerId));
// Lấy bảng lương theo employeeId
router.get('/employee/:employeeId', protect, reStrictTo('admin'), asyncHandler(SalaryController.getSalariesByEmployeeId));
// lấy bảng lương theo tháng năm phòng ban
router.post('/getByMonthAndDepartment/:managerId', protect, reStrictTo('admin'), asyncHandler(SalaryController.getSalariesByMonthAndDepartment));
// Tao bảng lương mới
router.post('/', protect, reStrictTo('admin'), asyncHandler(SalaryController.createSalary));
// Cập nhật bảng lương
router.put('/:id', protect, reStrictTo('admin'), asyncHandler(SalaryController.updateSalary));
// Xóa bảng lương
router.delete('/:id', protect, reStrictTo('admin'), asyncHandler(SalaryController.deleteSalary));

module.exports = router;