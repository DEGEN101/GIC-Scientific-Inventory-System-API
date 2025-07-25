const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const Inventory = database.inventory;
const controller = createCrudController(Inventory);

// Add custom handlers
controller.findByLocationID = async (req, res) => {
    try {
        const InventoryItems = await Inventory.findByLocationId(req.params.locationId);

        if (!InventoryItems) {
            res.status(404).json({ message: "[!] Requested inventory item(s) not found" });
        }
        res.status(200).json(InventoryItems);

    }catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = controller;
