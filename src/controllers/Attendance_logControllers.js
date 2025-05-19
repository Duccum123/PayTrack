const AttendanceLog = require('../models/Attendance_logs');

class AttendanceLogController {
  // Lấy tất cả bản ghi chấm công
  static async getAllAttendanceLogs(req, res) {
    try {
      const attendanceLogs = await AttendanceLog.find().populate('employeeId');
      res.status(200).json(attendanceLogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching attendance logs', error });
    }
  }
  static async getAttendanceLogById(req, res) {
    const { id } = req.params;
    try {
      const attendanceLog = await AttendanceLog.findById(id).populate('employeeId');
      if (!attendanceLog) {
        return res.status(404).json({ message: 'Attendance log not found' });
      }
      res.status(200).json(attendanceLog);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching attendance log', error });
    }
  }
  static async getAttendanceLogsByEmployeeId(req, res) {
    const { employeeId } = req.params;
    try {
      const attendanceLogs = await AttendanceLog.find({ employeeId }).populate('employeeId');
      if (!attendanceLogs) {
        return res.status(404).json({ message: 'Attendance logs not found' });
      }
      res.status(200).json(attendanceLogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching attendance logs', error });
    }
  }
  static async createAttendanceLog(req, res) {
    const {
      employeeId, checkInTime, checkOutTime,
      date, workingHours, lateMinutes,
      earlyLeaveMinutes, status
    } = req.body;

    try {
      const newAttendanceLog = new AttendanceLog({
        employeeId, checkInTime, checkOutTime,
        date, workingHours, lateMinutes,
        earlyLeaveMinutes, status
      });
      await newAttendanceLog.save();
      res.status(201).json(newAttendanceLog);
    } catch (error) {
      res.status(500).json({ message: 'Error creating attendance log', error });
    }
  }
  static async updateAttendanceLog(req, res) {
    const { id } = req.params;

    try {
      const updatedAttendanceLog = await AttendanceLog.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!updatedAttendanceLog) {
        return res.status(404).json({ message: 'Attendance log not found' });
      }
      res.status(200).json(updatedAttendanceLog);
    } catch (error) {
      res.status(500).json({ message: 'Error updating attendance log', error });
    }
  }
  static async deleteAttendanceLog(req, res) {
    const { id } = req.params;

    try {
      const deletedAttendanceLog = await AttendanceLog.findByIdAndDelete(id);
      if (!deletedAttendanceLog) {
        return res.status(404).json({ message: 'Attendance log not found' });
      }
      res.status(200).json({ message: 'Attendance log deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting attendance log', error });
    }
  }
}

module.exports = AttendanceLogController;