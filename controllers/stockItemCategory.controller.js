const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const StockItemCategory = database.stockItemCategory;
const controller = createCrudController(StockItemCategory);

module.exports = controller;
