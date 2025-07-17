const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const location = require("../controllers/location.controller");
    const router = require("express").Router();
    
    // Register generic CRUD routes
    registerCrudRoutes(router, location);

    // Add custom route(s) below

    app.use('/api/location', router);
}