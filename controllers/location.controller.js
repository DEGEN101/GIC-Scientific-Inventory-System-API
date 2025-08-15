const database = require("../models");
const createCrudController = require("../utils/createCrudController");

const Location = database.location;
const Shelf = database.shelf;
const controller = createCrudController(Location);

// Add custom handlers
controller.getShelvesByLocationId = async (req, res) => {
    try {
        const shelves = await Shelf.findByLocationId(req.params.id);
        res.status(200).json(shelves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.addShelfToLocation = async (req, res) => {
    try {
        const newShelfData = {
            LocationID: req.params.id,
            ShelfName: req.body.shelfName,
            ShelfRow: req.body.shelfRow,
            ShelfColumn: req.body.shelfColumn
        };

        const createdShelf = await Shelf.create(newShelfData);
        res.status(201).json(createdShelf);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = controller;
