/**
 * @swagger
 * tags:
 *   - name: StockCheckLine
 *     description: Stock check line management
 */

/**
 * @swagger
 * /api/stockCheckLine:
 *   post:
 *     summary: Create a new stock check line
 *     tags: [StockCheckLine]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               StockCheckID:
 *                 type: integer
 *               InventoryID:
 *                 type: integer
 *               ExpectedQuantity:
 *                 type: number
 *                 format: decimal
 *                 example: 50.00
 *               CountedQuantity:
 *                 type: number
 *                 format: decimal
 *                 example: 48.00
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/stockCheckLine/stockCheck/{stockCheckId}:
 *   get:
 *     summary: Get all lines for a given stock check
 *     tags: [StockCheckLine]
 *     parameters:
 *       - in: path
 *         name: stockCheckId
 *         description: StockCheckID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of stock check lines
 */

/**
 * @swagger
 * /api/stockCheckLine/markAdjusted/{id}:
 *   put:
 *     summary: Mark a stock check line as adjusted
 *     tags: [StockCheckLine]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: StockCheckLineID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Line marked as adjusted
 *       404:
 *         description: Stock check line not found
 */

const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const stockCheckLine = require("../controllers/stockCheckLine.controller.js");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, stockCheckLine);

    // Add custom route(s) below
    router.get("/stockCheck/:id", stockCheckLine.getByStockCheck);
    router.put("/markAdjusted/:id", stockCheckLine.markAdjusted);

    app.use('/api/stockCheckLine', router);
}