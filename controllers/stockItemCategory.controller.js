const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const stockItemCategory = database.stockItemCategory;
const controller = createCrudController(stockItemCategory);

module.exports = controller;
