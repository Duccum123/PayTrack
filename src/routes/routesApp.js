// Import your route of service here
const employeeRoutes = require('./routesService/routesEmployee');
const userRoutes = require('./routesService/routesUser');
console.log('typeof restrictTo:', typeof employeeRoutes);
function routeInit(app) {
    // route to employee
    app.use('/api/employee', employeeRoutes);
    // route to user
    app.use('/api/user', userRoutes);
}
module.exports = routeInit;
