const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const location = require("../controllers/location.controller");
    const router = require("express").Router();
    
    // Register generic CRUD routes
    registerCrudRoutes(router, location);

    // Add custom route(s) below
    router.get('/:id/shelves', location.getShelvesByLocationId);
    router.post('/:id/shelves', location.addShelfToLocation);


    app.use('/api/location', router);
}