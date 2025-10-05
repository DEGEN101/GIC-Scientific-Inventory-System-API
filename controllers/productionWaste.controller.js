const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const ProductionWaste = database.productionWaste;
const controller = createCrudController(ProductionWaste);

// Add custom handlers
controller.findByOrderId = async (req, res) => {
    try {
        const result = await ProductionWaste.findByOrderId(req.params.id);
        if (!result.length) return res.status(404).json({ message: "[!] No waste records found for order" });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = controller;
