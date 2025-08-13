const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const StockItemSupplier = database.stockItemSupplier;
const controller = createCrudController(StockItemSupplier);

// Add custom handlers
controller.findById = async (req, res) => {
    res.status(404).json({ message:"[!] Item not found" }); 
}

controller.findByKey = async (req, res) => {
    try {
        const { stockItemId, supplierId } = req.params;
        const stockItemSupplier = await StockItemSupplier.findByKey(stockItemId, supplierId);

        if (!stockItemSupplier) res.status(404).json({ message:"[!] Stock item supplier not found" });

        res.status(202).json(stockItemSupplier);

    } catch (err) {
        res.status(500).json({ message: err });
    }
}  

controller.update = async (req, res) => {
    try {
        const { stockItemId, supplierId } = req.params;
        const rowsAffected = await StockItemSupplier.updateByKey(stockItemId, supplierId, req.body.isPreferred);

        if (rowsAffected === 0) res.status(404).json({ message:"[!] Stock item supplier not found" });

        res.status(200).json({ message: "[+] Stock item supplier updated successfully" });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}  

controller.delete = async (req, res) => {
    try {
        const { stockItemId, supplierId } = req.params;
        const rowsAffected = await StockItemSupplier.remove(stockItemId, supplierId);

        if (rowsAffected === 0) res.status(404).json({ message:"[!] Stock item supplier not found" });

        res.status(200).json({ message: "[+] Stock item supplier deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}

module.exports = controller;
