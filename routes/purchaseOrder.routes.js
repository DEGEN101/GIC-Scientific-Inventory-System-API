const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const purchaseOrder = require("../controllers/purchaseOrder.controller");
    const router = require("express").Router();
    
    // Register generic CRUD routes
    registerCrudRoutes(router, purchaseOrder);

    // Add custom route(s) below

    app.use('/api/purchaseOrder', router);
}