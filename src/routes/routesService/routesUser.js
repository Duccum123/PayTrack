const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/UserControllers');
const  protect  = require('../../middleware/authMiddleware');
const  restrictTo  = require('../../middleware/roleMiddleware');
const asyncHandler = require('../../middleware/asyncHandler');

// Route to get all users
router.get('/', protect, restrictTo('admin'), asyncHandler(UserController.getAllUsers));
// Route to get a user by ID
router.get('/:id', protect, restrictTo('admin'), asyncHandler(UserController.getUserById));
router.get('/getByManager/:id', protect, restrictTo('admin'), asyncHandler(UserController.getUsersByManagerId));
// Route to get a user by username
router.get('/username/:username', protect, restrictTo('admin'), asyncHandler(UserController.getUserByUsername));
// Route to create a new user just for admin create user
router.post('/', protect, restrictTo('admin'), asyncHandler(UserController.createUser));
// Route to update a user by ID
router.put('/:id', protect, restrictTo('admin'), asyncHandler(UserController.updateUser));
// Route to delete a user by ID
router.delete('/:id', protect, restrictTo('admin'), asyncHandler(UserController.deleteUser));
// Route to refresh token
router.post('/refresh-token', asyncHandler(UserController.refreshToken));
// Route to login
router.post('/login', asyncHandler(UserController.login));
// Route to logout
// router.post('/logout', UserController.logout);
// Route to register just for admin
router.post('/register', asyncHandler(UserController.register));

module.exports = router;