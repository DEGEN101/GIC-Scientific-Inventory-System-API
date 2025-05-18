const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const Supplier = database.supplier;
const controller = createCrudController(Supplier);

// Add custom handlers

module.exports = controller;
