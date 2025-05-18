const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const StockItemAttribute = database.stockItemAttribute;
const controller = createCrudController(StockItemAttribute);

// Add custom handlers

module.exports = controller;
