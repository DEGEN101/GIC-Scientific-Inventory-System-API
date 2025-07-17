module.exports = function createCrudController(model, options = {}) {
    return {
        create: async (req, res) => {
            try {
                const result = await model.create(req.body);
                res.status(201).json(result);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        },

        findAll: async (req, res) => {
            try {
                const results = await model.getAll();
                res.status(200).json(results);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        },

        findById: async (req, res) => {
            try {
                const result = await model.findById(req.params.id);
                if (!result) return res.status(404).json({ message: "[!] Item not found" });
                res.status(200).json(result);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        },

        update: async (req, res) => {
            try {
                const rowsAffected = await model.updateById(req.params.id, req.body);
                if (rowsAffected === 0) return res.status(404).json({ message: '[!] Item not found' });
                res.status(200).json({ message: "[+] Item updated successfully" });
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        },

        delete: async (req, res) => {
            try {
                const rowsAffected = await model.remove(req.params.id);
                if (rowsAffected === 0) return res.status(404).json({ message: '[!] Item not found' });
                res.status(200).json({ message: "[+] Item deleted successfully" });
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        },
    };
};
