const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const Employee = database.employees;
const controller = createCrudController(Employee);

module.exports = controller;
