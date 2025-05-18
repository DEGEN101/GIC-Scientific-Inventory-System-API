const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const AuditLog = database.auditLog;
const controller = createCrudController(AuditLog);

// AuditLog model has no updateById key
controller.update = async (req, res) => {}

module.exports = controller;
