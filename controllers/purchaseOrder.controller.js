const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const PurchaseOrder = database.purchaseOrder;
const controller = createCrudController(PurchaseOrder);

// Add custom handlers

module.exports = controller;
