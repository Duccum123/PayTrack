const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/UserControllers');
const  protect  = require('../../middleware/authMiddleware');
const  restrictTo  = require('../../middleware/roleMiddleware');

// Route to get all users
router.get('/', protect, restrictTo('admin'), UserController.getAllUsers);
// Route to get a user by ID
router.get('/:id', protect, restrictTo('admin'), UserController.getUserById);
router.get('/getByManager/:id', protect, restrictTo('admin'), UserController.getUsersByMangerId);
// Route to get a user by username
router.get('/username/:username', protect, restrictTo('admin'), UserController.getUserByUsername);
// Route to create a new user just for admin create user
router.post('/', protect, restrictTo('admin'), UserController.createUser);
// Route to update a user by ID
router.put('/:id', protect, restrictTo('admin'), UserController.updateUser);
// Route to delete a user by ID
router.delete('/:id', protect, restrictTo('admin'), UserController.deleteUser);
// Route to refresh token
router.post('/refresh-token', UserController.refreshToken);
// Route to login
router.post('/login', UserController.login);
// Route to logout
// router.post('/logout', UserController.logout);
// Route to register just for admin
router.post('/register', UserController.register);

module.exports = router;