/**
 * @swagger
 * tags:
 *   - name: Inventory
 *     description: Inventory item management
 */

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of inventory items
 */

/**
 * @swagger
 * /api/inventory/full:
 *   get:
 *     summary: Get all inventory items with full details
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of inventory items with full details
 *       500:
 *         description: Database error
 */

/**
 * @swagger
 * /api/inventory/{id}:
 *   get:
 *     summary: Get an inventory item by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory item found
 *       404:
 *         description: Inventory item not found
 */

/**
 * @swagger
 * /api/inventory/location/{locationId}:
 *   get:
 *     summary: Get all inventory items for a specific location
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of inventory items in the specified location
 */

/**
 * @swagger
 * /api/inventory/shelf/{shelfId}:
 *   get:
 *     summary: Get all inventory items for a specific shelf
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: shelfId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of inventory items on the specified shelf
 */

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Create a new inventory item
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - StockItemID
 *               - Quantity
 *               - MinimumQuantity
 *               - LocationID
 *               - ShelfID
 *             properties:
 *               StockItemID:
 *                 type: integer
 *               Quantity:
 *                 type: number
 *               MinimumQuantity:
 *                 type: number
 *               BatchNumber:
 *                 type: string
 *               isPartial:
 *                 type: boolean
 *                 default: false
 *               LocationID:
 *                 type: integer
 *               ShelfID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/inventory/{id}:
 *   put:
 *     summary: Update an inventory item by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - StockItemID
 *               - Quantity
 *               - MinimumQuantity
 *               - LocationID
 *               - ShelfID
 *             properties:
 *               StockItemID:
 *                 type: integer
 *               Quantity:
 *                 type: number
 *               MinimumQuantity:
 *                 type: number
 *               BatchNumber:
 *                 type: string
 *               isPartial:
 *                 type: boolean
 *                 default: false
 *               LocationID:
 *                 type: integer
 *               ShelfID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Inventory item not found
 */

/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     summary: Delete an inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Inventory item not found
 */

const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const inventory = require("../controllers/inventory.controller.js");

    const router = require("express").Router();

    router.get("/full", inventory.findAllFull);

    // Register generic CRUD routes
    registerCrudRoutes(router, inventory);

    // Add custom route(s) below
    router.get("/location/:locationId", inventory.findByLocationID);
    router.get("/shelf/:shelfId", inventory.findByShelfID);

    app.use('/api/inventory', router);
}