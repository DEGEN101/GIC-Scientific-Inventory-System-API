const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const supplier = require("../controllers/supplier.controller");
    const router = require("express").Router();
    
    // Register generic CRUD routes
    registerCrudRoutes(router, supplier);

    // Add custom route(s) below

    app.use('/api/supplier', router);
}