const database = require("../models");
const StockItem = database.stockItem;

module.exports = {
    create: async (req, res) => {
        try {
            const newStockItem = await StockItem.create(req.body);
            res.status(200).json(newStockItem);
        }catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const stockItems = await StockItem.getAll();
            res.status(200).json(stockItems);
        }catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findById: async (req, res) => {
        try {
            const stockItem = await StockItem.findById(req.params.id);

            if (!stockItem) {
                res.status(500).json({ message: "[!] Requested stock item not found" }); 
            }
            res.status(200).json(stockItem);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findBySKU: async (req, res) => {
        try {
            const stockItem = await StockItem.findBySKU(req.params.sku);

            if (!stockItem) {
                res.status(500).json({ message: "[!] Requested stock item not found" }); 
            }
            res.status(200).json(stockItem);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const rowsAffected = StockItem.updateById(req.params.id, req.body);
            if (rowsAffected === 0) return res.status(404).json({ message: '[!] Stock item not found' });
            res.status(200).json({ message: "[+] Stock item updated successfully" });
            
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const rowsAffected = StockItem.remove(req.params.id);
            if (rowsAffected == 0) return res.status(404).json({ message: "[!] Stock Item not found" });
            res.status(200).json({ message: "[+] Stock item removed successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}