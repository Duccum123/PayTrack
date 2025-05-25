const AttendanceLog = require('../models/Attendance_logs');
const Employee = require('../models/Employees');
const AppError = require('../utils/AppError');
class AttendanceLogController {
  // Lấy tất cả bản ghi chấm công
  static async getAllAttendanceLogs(req, res) {
    const attendanceLogs = await AttendanceLog.find().populate('employeeId');
    if (!attendanceLogs || attendanceLogs.length === 0) {
      throw new AppError("Không tìm thấy attendance log", 404);
    }
    res.status(200).json(attendanceLogs);
  }
  static async getAttendanceLogById(req, res) {
    const { id } = req.params;
    if(!id) {
      throw new AppError("Không cung cấp id attendance log", 400);
    }
    const attendanceLog = await AttendanceLog.findById(id).populate('employeeId');
    if (!attendanceLog) {
      throw new AppError("Không tìm thấy attendance log", 404);
    }
    res.status(200).json(attendanceLog);
  }
  static async getAttendanceLogsByEmployeeId(req, res) {
    const { employeeId } = req.params;
    if(!employeeId) {
      throw new AppError("Không cung cấp id attendance log", 400);
    }
    const attendanceLogs = await AttendanceLog.find({ employeeId }).populate('employeeId');
    if (!attendanceLogs || attendanceLogs.length === 0) {
      throw new AppError("Nhân viên này không có attendance log", 404);
    }
    res.status(200).json(attendanceLogs);
  }
  static async getAttendanceLogsByDate(req, res) {
    const { date, managerId } = req.body;
    if (!date || !managerId) {
      throw new AppError("Thiếu thông tin ngày hoặc managerId", 400);
    }
    const employees = await Employee.find({ managerId }).select('_id');
    if (!employees || employees.length === 0) {
      throw new AppError("Không tìm thấy nhân viên theo managerId", 404);
    }
    const employeeIds = employees.map(emp => emp._id);
    const attendanceLogs = await AttendanceLog.find({
      employeeId: { $in: employeeIds },
      date: new Date(date)
    }).populate('employeeId');
    if (!attendanceLogs || attendanceLogs.length === 0) {
      throw new AppError("Không tìm thấy attendance log theo ngày" + date, 404);
    }
    res.status(200).json(attendanceLogs);
  }
  static async createAttendanceLog(req, res) {
    const { employeeId, date, status } = req.body;
    if (!employeeId || !date || !status) {
      throw new AppError("Thiếu thông tin employeeId, date hoặc status", 400);
    }
    const logDate = new Date(date);
    const existingLog = await AttendanceLog.findOne({
        employeeId,
        date: logDate
    });
    if(existingLog) {
      throw new AppError("Đã tồn tại bản ghi chấm công cho nhân viên này vào ngày này", 409);
    }
    let workingHours = 0;
    if (status === 'Present') workingHours = 8;
    else if (status === 'Half') workingHours = 4;

    const newAttendanceLog = new AttendanceLog({
      employeeId,
      date: logDate,
      workingHours,
      status
    });
    await newAttendanceLog.save();
    res.status(201).json(newAttendanceLog);
  }
  static async updateAttendanceLog(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new AppError("Không cung cấp id attendance log", 400);
    }
    const { employeeId, date, status } = req.body;
    if (!employeeId || !date || !status) {
      throw new AppError("Thiếu thông tin employeeId, date hoặc status", 400);
    }
    const logDate = new Date(date);
    let workingHours = 0;
    if (status === 'Present') workingHours = 8;
    else if (status === 'Half') workingHours = 4;
    const uppdatedAttendanceLog = await AttendanceLog.findByIdAndUpdate(
      id,
      { employeeId, date: logDate, workingHours, status },
      { new: true }
    ).populate('employeeId');
    res.status(200).json(uppdatedAttendanceLog);
  }
  static async deleteAttendanceLog(req, res) {
    const { id } = req.params;
    if(!id) {
      throw new AppError("Không cung cấp id attendance log", 400);
    }
    const deletedAttendanceLog = await AttendanceLog.findByIdAndDelete(id);
    if (!deletedAttendanceLog) {
      throw new AppError("Không tìm thấy attendance log theo Id", 404);
    }
    res.status(200).json("Xóa attendance log thành công");
  }
}

module.exports = AttendanceLogController;