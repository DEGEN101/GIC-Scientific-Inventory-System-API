const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const Product = database.product;
const controller = createCrudController(Product);

// Add custom handlers

module.exports = controller;
