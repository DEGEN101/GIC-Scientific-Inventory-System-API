const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const stockItem = require("../controllers/stockItem.controller.js");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, stockItem);

    // Add custom route(s) below
    router.get("/sku/:sku", stockItem.findBySKU);

    app.use("/api/stockItem", router);
}