const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const ProductionConsumption = database.productionConsumption;
const controller = createCrudController(ProductionConsumption);

// Add custom handlers
controller.findByOrderId = async (req, res) => {
    try {
        const result = await ProductionConsumption.findByOrderId(req.params.id);
        if (!result.length) return res.status(404).json({ message: "[!] No consumption records found for order" });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

controller.delete = async (req, res) => {
    try {
        const result = await ProductionConsumption.remove(req.params.orderId, req.params.inventoryId);
        if (!result.length) return res.status(404).json({ message: "[!] No consumption records found for order id and inventory id" });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = controller;
