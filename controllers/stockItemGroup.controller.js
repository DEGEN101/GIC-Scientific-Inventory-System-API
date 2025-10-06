const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const StockItemGroup = database.stockItemGroup;
const controller = createCrudController(StockItemGroup);

// Add custom handlers

controller.findByCategoryId = async (req, res) => {
    try {
        const result = await StockItemGroup.findByCategoryId(req.params.id);

        if (!result) res.status(404).json({ message:"[!] Stock item group not found" });

        res.status(202).json(result);

    } catch (err) {
        res.status(500).json({ message: err });
    }
}  

module.exports = controller;
