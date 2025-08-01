const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const inventory = require("../controllers/inventory.controller.js");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, inventory);

    // Add custom route(s) below
    router.get("/location/:locationId", inventory.findByLocationID);

    app.use('/api/inventory', router);
}