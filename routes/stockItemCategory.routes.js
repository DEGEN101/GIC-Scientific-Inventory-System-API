const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const stockItemCategory = require("../controllers/stockItemCategory.controller.js");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, stockItemCategory);

    // Add custom route(s) below

    app.use("/api/stockItemCategory", router);
}
