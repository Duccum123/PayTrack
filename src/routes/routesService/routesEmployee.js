const express = require('express');
const router = express.Router();
const EmployeeController = require('../../controllers/EmployeeControllers');
const  protect  = require('../../middleware/authMiddleware');
const  restrictTo  = require('../../middleware/roleMiddleware');
const asyncHandler = require('../../middleware/asyncHandler')

// Route to get all employees
router.get('/', protect, restrictTo('admin'), asyncHandler(EmployeeController.getAllEmployees));
// Route to get all employess by managerId
router.get('/getByManager/:id', asyncHandler(EmployeeController.getEmployeesByManagerId));
// Route to get an employee by ID
router.get('/:id', protect, restrictTo('admin'), asyncHandler(EmployeeController.getEmployeeById));
// Route to create a new employee
router.post('/', protect, restrictTo('admin'), asyncHandler(EmployeeController.createEmployee));
// Route to update an employee by ID
router.put('/:id', protect, restrictTo('admin'), asyncHandler(EmployeeController.updateEmployee));
// Route to delete an employee by ID
router.delete('/:id', protect, restrictTo('admin'), asyncHandler(EmployeeController.deleteEmployee));

module.exports = router;