const express = require('express');
const router = express.Router();
const SettingController = require('../../controllers/SettingControllers');
const protect = require('../../middleware/authMiddleware');
const reStrictTo = require('../../middleware/roleMiddleware');

// Lấy tất cả settings
router.get('/', protect, reStrictTo('admin'), SettingController.getAllSettings);
// Lấy setting theo ID
router.get('/:id', protect, reStrictTo('admin'), SettingController.getSettingById);
// Tao setting mới
router.post('/', protect, reStrictTo('admin'), SettingController.createSetting);
// Cập nhật setting
router.put('/:id', protect, reStrictTo('admin'), SettingController.updateSetting);
// Xóa setting
router.delete('/:id', protect, reStrictTo('admin'), SettingController.deleteSetting);

module.exports = router;