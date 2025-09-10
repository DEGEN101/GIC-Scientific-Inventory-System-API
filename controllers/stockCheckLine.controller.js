const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const StockCheckLine = database.stockCheckLine;
const controller = createCrudController(StockCheckLine);

// Add custom handlers
controller.getByStockCheck = async (req, res) => {
    try {
        const result = await StockCheckLine.getByStockCheck(req.params.id);
        if (!result) return res.status(404).json({ message: "[!] Stock check line not found" });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

controller.markAdjusted = async (req, res) => {
    try {
        const result = await StockCheckLine.markAdjusted(req.params.id);
        if (!result) return res.status(404).json({ message: "[!] Stock check line not found" });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = controller;
