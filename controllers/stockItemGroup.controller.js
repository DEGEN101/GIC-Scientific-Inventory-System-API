const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const StockItemGroup = database.stockItemGroup;
const controller = createCrudController(StockItemGroup);

module.exports = controller;
