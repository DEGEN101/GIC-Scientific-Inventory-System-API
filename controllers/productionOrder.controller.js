const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const ProductionOrder = database.productionOrder;
const controller = createCrudController(ProductionOrder);

// Custom methods

module.exports = controller;
