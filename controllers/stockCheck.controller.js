const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const StockCheck = database.stockCheck;
const controller = createCrudController(StockCheck);

// Add custom handlers
controller.updateStatus = async (req, res) => {
    try {
        const result = await StockItem.updateStatus(req.params.id, req.body);
        if (!result) return res.status(404).json({ message: "[!] Item not found" });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = controller;
