const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const PurchaseOrderDetails = database.purchaseOrderDetails;
const controller = createCrudController(PurchaseOrderDetails);

// Add custom handlers
controller.findById = async (req, res) => {
    res.status(404).json({ message:"[!] Item not found" });
}

controller.findByKey = async (req, res) => {
    try {
        const { poid, stockItemId } = req.params;
        const purchaseOrderDetails = await PurchaseOrderDetails.findByKey(poid, stockItemId);

        if (!purchaseOrderDetails) res.status(404).json({ message:"[!] Purchase order details not found" });

        res.status(202).json(purchaseOrderDetails);

    } catch (err) {
        res.status(500).json({ message: err });
    }
}  

controller.update = async (req, res) => {
    try {
        const { poid, stockItemId } = req.params;
        const rowsAffected = await PurchaseOrderDetails.updateByKey(poid, stockItemId, req.body);

        if (rowsAffected == 0) res.status(404).json({ message:"[!] Purchase order details not found" });

        res.status(200).json({ message: "[+] Purchase order details updated successfully" });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}  

controller.delete = async (req, res) => {
    try {
        const { poid, stockItemId } = req.params;
        const rowsAffected = await PurchaseOrderDetails.remove(poid, stockItemId);

        if (rowsAffected == 0) res.status(404).json({ message:"[!] Purchase order details not found" });

        res.status(200).json({ message: "[+] Purchase order details deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}

module.exports = controller;
