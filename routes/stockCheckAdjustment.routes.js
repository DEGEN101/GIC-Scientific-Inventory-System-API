/**
 * @swagger
 * tags:
 *   - name: StockCheckAdjustment
 *     description: Stock check adjustment management
 */

/**
 * @swagger
 * /api/stockCheckAdjustment:
 *   post:
 *     summary: Create a new stock check adjustment
 *     tags: [StockCheckAdjustment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               StockCheckLineID:
 *                 type: integer
 *               AdjustmentQuantity:
 *                 type: number
 *                 format: decimal
 *                 example: 5.00
 *               EmployeeID:
 *                 type: integer
 *               Notes:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/stockCheckAdjustment/stockCheckLine/{id}:
 *   get:
 *     summary: Get all adjustments for a given stock check line
 *     tags: [StockCheckAdjustment]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: StockCheckLineID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of adjustments for the given line
 */


const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const stockCheckAdjustment = require("../controllers/stockCheckAdjustment.controller.js");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, stockCheckAdjustment);

    // Add custom route(s) below
    router.get("/stockCheckLine/:id", stockCheckAdjustment.getByLine);

    app.use('/api/stockCheckAdjustment', router);
}