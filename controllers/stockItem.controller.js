const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const StockItem = database.stockItem;
const controller = createCrudController(StockItem);

// Add custom handlers
controller.findBySKU = async (req, res) => {
    try {
        const result = await StockItem.findBySKU(req.params.sku);
        if (!result) return res.status(404).json({ message: "[!] Item not found" });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = controller;
