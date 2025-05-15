const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const stockItemGroup = require("../controllers/stockItemGroup.controller");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, stockItemGroup);

    // Add custom route(s) below

    app.use("/api/stockItemGroup/", router);
}