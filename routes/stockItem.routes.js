/**
 * @swagger
 * tags:
 *   - name: StockItems
 *     description: Stock item management
 */

/**
 * @swagger
 * /api/stockItem:
 *   get:
 *     summary: Get all stock items
 *     tags: [StockItems]
 *     responses:
 *       200:
 *         description: List of stock items
 */

/**
 * @swagger
 * /api/stockItem/full:
 *   get:
 *     summary: Get all stock items with full details
 *     tags: [StockItems]
 *     responses:
 *       200:
 *         description: List of stock items
 */

/**
 * @swagger
 * /api/stockItem/{id}:
 *   get:
 *     summary: Get a stock item by ID
 *     tags: [StockItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock item found
 *       404:
 *         description: Stock item not found
 */

/**
 * @swagger
 * /api/stockItem/sku/{sku}:
 *   get:
 *     summary: Get a stock item by SKU
 *     tags: [StockItems]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stock item found
 *       404:
 *         description: Stock item not found
 */

/**
 * @swagger
 * /api/stockItem:
 *   post:
 *     summary: Create a new stock item
 *     tags: [StockItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               SKU:
 *                 type: string
 *               Description:
 *                 type: string
 *               MinimumQuantity:
 *                 type: integer
 *               StockItemGroupID:
 *                 type: integer
 *               BaseUoMID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/stockItem/{id}:
 *   put:
 *     summary: Update a stock item by ID
 *     tags: [StockItems]
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
 *             properties:
 *               Name:
 *                 type: string
 *               SKU:
 *                 type: string
 *               Description:
 *                 type: string
 *               MinimumQuantity:
 *                 type: integer
 *               StockItemGroupID:
 *                 type: integer
 *               BaseUoMID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @swagger
 * /api/stockItem/{id}:
 *   delete:
 *     summary: Delete a stock item
 *     tags: [StockItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 */

const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const stockItem = require("../controllers/stockItem.controller.js");

    const router = require("express").Router();

    router.get("/full", stockItem.findAllFull);

    // Register generic CRUD routes
    registerCrudRoutes(router, stockItem);

    // Add custom route(s) below
    router.get("/sku/:sku", stockItem.findBySKU);

    app.use("/api/stockItem", router);
}