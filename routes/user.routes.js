const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const user = require("../controllers/users.controller.js");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, user, {
        create: true,
        update: true,
        delete: true,
        findAll: true,
        findById: true
    });

    // Add custom route(s) below

    app.use('/api/users', router);
}