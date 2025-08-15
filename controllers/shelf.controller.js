const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const Shelf = database.shelf;
const controller = createCrudController(Shelf);

controller.findByLocationId = async (req, res) => {
    try {
        const shelves = await Shelf.findByLocationId(req.params.id);

        if (!shelves || shelves.length === 0) {
            return res.status(404).json({ message: "[!] No shelves found for this location" });
        }
        res.status(200).json(shelves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = controller;
