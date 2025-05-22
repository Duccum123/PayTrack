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
  static async getAttendanceLogsByDate(req, res) {
    const { date } = req.body;
    try {
      const attendanceLogs = await AttendanceLog.find({ date }).populate('employeeId');
      if (!attendanceLogs) {
        return res.status(404).json({ message: 'Attendance logs not found' });
      }
      res.status(200).json(attendanceLogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching attendance logs', error });
    }
  }
  static async createAttendanceLog(req, res) {
    try {
      const { employeeId, date, status } = req.body;

      // Chuẩn hóa date về 00:00:00
      const logDate = new Date(date);

      // Kiểm tra đã tồn tại chấm công cho employeeId và ngày này chưa
      const existingLog = await AttendanceLog.findOne({
        employeeId,
        date: logDate
      });
      if (existingLog) {
        return res.status(999).json({ message: 'Attendance already exists' });
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
        return res.status(999).json({ message: 'Attendance log not found' });
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