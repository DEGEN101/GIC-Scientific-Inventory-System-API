const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const stockItemAttribute = require("../controllers/stockItemAttribute.controller");
    const router = require("express").Router();
    
    // Register generic CRUD routes
    registerCrudRoutes(router, stockItemAttribute);

    // Add custom route(s) below

    app.use('/api/stockItemAttribute', router);
}