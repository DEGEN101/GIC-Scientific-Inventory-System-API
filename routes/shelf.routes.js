const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const shelf = require("../controllers/shelf.controller.js");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, shelf);

    // Add custom route(s) below
    router.get('/:id/location', shelf.findByLocationId);

    app.use('/api/shelves', router);
}