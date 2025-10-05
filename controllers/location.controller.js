const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const Location = database.location;
const controller = createCrudController(Location);

// Add custom handlers


module.exports = controller;
