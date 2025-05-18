const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const Product = database.location;
const controller = createCrudController(Product);

// Add custom handlers

module.exports = controller;
