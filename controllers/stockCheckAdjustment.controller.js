const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const StockCheckAdjustment = database.stockCheckAdjustment;
const controller = createCrudController(StockCheckAdjustment);

// Add custom handlers
controller.getByLine = async (req, res) => {
    try {
        const result = await StockCheckAdjustment.getByLine(req.params.id);
        if (!result) return res.status(404).json({ message: "[!] Stock check adjustment not found" });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = controller;
