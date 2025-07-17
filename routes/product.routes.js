const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const product = require("../controllers/product.controller");
    const router = require("express").Router();
    
    // Register generic CRUD routes
    registerCrudRoutes(router, product);

    // Add custom route(s) below

    app.use('/api/product', router);
}