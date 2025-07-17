const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const User = database.users;
const controller = createCrudController(User);

// Add custom handlers

module.exports = controller;
