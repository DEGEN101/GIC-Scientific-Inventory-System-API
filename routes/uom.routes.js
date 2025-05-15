const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const uom = require("../controllers/uom.controller");

    const router = require("express").Router();

    registerCrudRoutes(router, uom);

    app.use("/api/UoM/", router);
}