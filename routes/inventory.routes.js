module.exports = (app) => {
    const inventory = require("../controllers/inventory.controller.js");

    const router = require("express").Router();

    router.post("/", inventory.create);
    router.get("/", inventory.findAll);
    router.get("/:id", inventory.findById);
    router.put("/:id", inventory.update);
    router.delete("/:id", inventory.delete);

    app.use('/api/inventory', router);
}