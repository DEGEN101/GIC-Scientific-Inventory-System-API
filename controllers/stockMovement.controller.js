const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const StockMovement = database.stockMovement;
const controller = createCrudController(StockMovement);

// Add custom handlers

module.exports = controller;
