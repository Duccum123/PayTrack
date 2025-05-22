const express = require('express');
const router = express.Router();
const AttendanceController = require('../../controllers/Attendance_logControllers');
const protect = require('../../middleware/authMiddleware');
const reStrictTo = require('../../middleware/roleMiddleware');

// Lấy tất cả bảng chấm công
router.get('/', protect, reStrictTo('admin'), AttendanceController.getAllAttendanceLogs);
// Lấy bảng chấm công theo ID
router.get('/:id', protect, reStrictTo('admin'), AttendanceController.getAttendanceLogById);
// Lấy bảng chấm công theo employeeId
router.get('/employee/:employeeId', protect, reStrictTo('admin'), AttendanceController.getAttendanceLogsByEmployeeId);
// Lấy bảng chấm công theo ngày
router.post('/date', protect, reStrictTo('admin'), AttendanceController.getAttendanceLogsByDate);
// Tao bảng chấm công mới
router.post('/', protect, reStrictTo('admin'), AttendanceController.createAttendanceLog);
// Cập nhật bảng chấm công
router.put('/:id', protect, reStrictTo('admin'), AttendanceController.updateAttendanceLog);
// Xóa bảng chấm công
router.delete('/:id', protect, reStrictTo('admin'), AttendanceController.deleteAttendanceLog);

module.exports = router;