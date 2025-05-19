const Setting = require('../models/Settings');

class SettingController {
  // Lấy tất cả cài đặt
  static async getAllSettings(req, res) {
    try {
      const settings = await Setting.find();
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching settings', error });
    }
  }
  // Lấy cài đặt theo ID
  static async getSettingById(req, res) {
    const { id } = req.params;
    try {
      const setting = await Setting.findById(id);
      if (!setting) {
        return res.status(404).json({ message: 'Setting not found' });
      }
      res.status(200).json(setting);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching setting', error });
    }
  }
  // Tao cài đặt mới
  static async createSetting(req, res) {
    const { baseSalary, standardWorkingHours, penaltyPerMinute, bonusPerGoodMonth } = req.body;

    try {
      const newSetting = new Setting({
        baseSalary,
        standardWorkingHours,
        penaltyPerMinute,
        bonusPerGoodMonth
      });
      await newSetting.save();
      res.status(201).json(newSetting);
    } catch (error) {
      res.status(500).json({ message: 'Error creating setting', error });
    }
  }
  // Cập nhật cài đặt
  static async updateSetting(req, res) {
    const { id } = req.params;

    try {
      const updatedSetting = await Setting.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!updatedSetting) {
        return res.status(404).json({ message: 'Setting not found' });
      }
      res.status(200).json(updatedSetting);
    } catch (error) {
      res.status(500).json({ message: 'Error updating setting', error });
    }
  }
  // Xóa cài đặt
  static async deleteSetting(req, res) {
    const { id } = req.params;

    try {
      const deletedSetting = await Setting.findByIdAndDelete(id);
      if (!deletedSetting) {
        return res.status(404).json({ message: 'Setting not found' });
      }
      res.status(200).json({ message: 'Setting deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting setting', error });
    }
  }
}
module.exports = SettingController;