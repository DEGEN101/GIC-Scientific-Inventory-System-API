const database = require("../models");
const Inventory = database.inventory;

module.exports = {
    create: async (req, res) => {
        try {
            const newInventoryItem = await Inventory.create(req.body);
            res.status(200).json(newInventoryItem);
        }catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const InventoryItems = await Inventory.getAll();
            res.status(200).json(InventoryItems);
        }catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const InventoryItem = await Inventory.findById(req.params.id);
            
            if (!InventoryItem) {
                res.status(404).json({ message: "[!] Requested inventory item not found" });
            }
            res.status(200).json(InventoryItem);

        }catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findByLocationID: async (req, res) => {
        try {
            const InventoryItems = await Inventory.findByLocationId(req.params.locationId);

            if (!InventoryItems) {
                res.status(404).json({ message: "[!] Requested inventory item(s) not found" });
            }
            res.status(200).json(InventoryItems);

        }catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const rowsAffected = Inventory.updateById(req.params.id, req.body);
            if (rowsAffected === 0) return res.status(404).json({ message: '[!] Inventory item not found' });
            res.status(200).json({ message: "[+] Inventory item updated successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const rowsAffected = Inventory.remove(req.params.id);
            if (rowsAffected == 0) return res.status(404).json({ message: "[!] Inventory Item not found" });
            res.status(200).json({ message: "[+] Inventory item removed successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}