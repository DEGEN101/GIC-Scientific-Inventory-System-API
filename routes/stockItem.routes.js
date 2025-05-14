module.exports = (app) => {
    const stockItem = require("../controllers/stockItem.controller.js");

    const router = require("express").Router();

    router.post("/", stockItem.create);
    router.get("/", stockItem.findAll);
    router.get("/:id", stockItem.findById);
    router.get("/sku/:sku", stockItem.findBySKU);
    router.put("/:id", stockItem.update);
    router.delete("/:id", stockItem.delete);

    app.use("/api/stockItem", router);
}