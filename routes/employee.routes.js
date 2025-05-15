const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const employees = require("../controllers/employees.controller.js");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, employees);

    // Add custom route(s) below

    app.use('/api/employees', router);
}