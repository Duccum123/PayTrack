const express = require('express');
const router = express.Router();
const EmployeeController = require('../../controllers/EmployeeControllers');
const  protect  = require('../../middleware/authMiddleware');
const  restrictTo  = require('../../middleware/roleMiddleware');

// Route to get all employees
router.get('/', protect, restrictTo('admin'), EmployeeController.getAllEmployees);
// Route to get all employess by managerId
router.get('/getByManager/:id', EmployeeController.getEmployeesByManagerId)
// Route to get an employee by ID
router.get('/:id', protect, restrictTo('admin'), EmployeeController.getEmployeeById);
// Route to create a new employee
router.post('/', protect, restrictTo('admin'), EmployeeController.createEmployee);
// Route to update an employee by ID
router.put('/:id', protect, restrictTo('admin'), EmployeeController.updateEmployee);
// Route to delete an employee by ID
router.delete('/:id', protect, restrictTo('admin'), EmployeeController.deleteEmployee);

module.exports = router;