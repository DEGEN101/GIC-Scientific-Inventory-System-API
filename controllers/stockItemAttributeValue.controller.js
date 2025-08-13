const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const StockItemAttributeValue = database.stockItemAttributeValue;
const controller = createCrudController(StockItemAttributeValue);

// Add custom handlers
controller.findById = async (req, res) => {
    res.status(404).json({ message:"[!] Item not found" }); 
}

controller.findByKey = async (req, res) => {
    try {
        const { stockItemId, attributeId } = req.params;
        const stockItemAttributeValue = await StockItemAttributeValue.findByKey(stockItemId, attributeId);

        if (!stockItemAttributeValue) res.status(404).json({ message:"[!] Stock item attribute value not found" });

        res.status(202).json(stockItemAttributeValue);

    } catch (err) {
        res.status(500).json({ message: err });
    }
}  

controller.update = async (req, res) => {
    try {
        const { stockItemId, attributeId } = req.params;
        const rowsAffected = await StockItemAttributeValue.updateByKey(stockItemId, attributeId, req.body.AttributeValue);

        if (rowsAffected === 0) res.status(404).json({ message:"[!] Stock item attribute value not found" });

        res.status(200).json({ message: "[+] Stock item attribute value updated successfully" });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}  

controller.delete = async (req, res) => {
    try {
        const { stockItemId, attributeId } = req.params;
        const rowsAffected = await StockItemAttributeValue.remove(stockItemId, attributeId);

        if (rowsAffected === 0) res.status(404).json({ message:"[!] Stock item attribute value not found" });

        res.status(200).json({ message: "[+] Stock item attribute value deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}

module.exports = controller;
