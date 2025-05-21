// Import your route of service here
const employeeRoutes = require('./routesService/routesEmployee');
const userRoutes = require('./routesService/routesUser');
const attendanceRoutes = require('./routesService/routesAttendance_log');
const salaryRoutes = require('./routesService/routesSalary');
const settingRoutes = require('./routesService/routesSetting');
console.log('typeof restrictTo:', typeof employeeRoutes);
function routeInit(app) {
    // route to employee
    app.use('/api/employee', employeeRoutes);
    // route to user
    app.use('/api/user', userRoutes);
    // route to Attendance
    app.use('/api/attendance', attendanceRoutes);
    // route to Salary
    app.use('/api/salary', salaryRoutes);
    // route to Setting
    app.use('/api/setting', settingRoutes);
}
module.exports = routeInit;
