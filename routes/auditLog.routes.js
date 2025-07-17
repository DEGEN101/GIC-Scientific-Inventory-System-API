const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const auditLog = require("../controllers/auditLog.controller.js");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, auditLog);

    // Add custom route(s) below

    app.use('/api/auditLog', router);
}