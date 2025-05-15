const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const UoM = database.uom;
const controller = createCrudController(UoM);

module.exports = controller;
