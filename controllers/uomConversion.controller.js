const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const UoMConversion = database.uomConversion;
const controller = createCrudController(UoMConversion);

// Add custom handlers
controller.findById = null
controller.update = null

controller.findByKey = async (req, res) => {
    try {
        const { fromId, toId } = req.params;
        const uomConversion = await UoMConversion.findByKey(fromId, toId);

        if (!uomConversion) res.status(404).json({ message:"[!] Unit of measurement conversion not found" });

        res.status(202).json(uomConversion);

    } catch (err) {
        res.status(500).json({ message: err });
    }
}  

controller.update = async (req, res) => {
    try {
        const { fromId, toId } = req.params;
        const rowsAffected = await StockItemAttributeValue.updateByKey(fromId, toId, req.body);

        if (rowsAffected === 0) res.status(404).json({ message:"[!] Unit of measurement conversion not found" });

        res.status(200).json({ message: "[+] Stock item attribute value updated successfully" });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}  

controller.delete = async (req, res) => {
    try {
        const { fromId, toId } = req.params;
        const rowsAffected = await PurchaseOrderDetails.remove(fromId, toId);

        if (rowsAffected === 0) res.status(404).json({ message:"[!] Unit of measurement conversion not found" });

        res.status(200).json({ message: "[+] Stock item attribute value deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}

module.exports = controller;
