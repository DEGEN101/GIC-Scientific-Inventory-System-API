const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const BillOfMaterials = database.billOfMaterials;
const controller = createCrudController(BillOfMaterials);

// Custom methods
controller.findByProductID = async (req, res) => {
    try {
        const result = await BillOfMaterials.findByProductID(req.params.id);
        if (!result.length) return res.status(404).json({ message: "[!] No BOM found for product" });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = controller;
