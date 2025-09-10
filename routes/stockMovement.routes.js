/**
 * @swagger
 * tags:
 *   - name: StockMovement
 *     description: Stock movement tracking
 */

/**
 * @swagger
 * /api/stockMovement:
 *   get:
 *     summary: Get all stock movements
 *     tags: [StockMovement]
 *     responses:
 *       200:
 *         description: List of stock movements
 */

/**
 * @swagger
 * /api/stockMovement/{id}:
 *   get:
 *     summary: Get a stock movement by ID
 *     tags: [StockMovement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock movement found
 *       404:
 *         description: Stock movement not found
 */

/**
 * @swagger
 * /api/stockMovement:
 *   post:
 *     summary: Create a new stock movement
 *     tags: [StockMovement]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FromInventoryID:
 *                 type: integer
 *                 nullable: true
 *               ToInventoryID:
 *                 type: integer
 *                 nullable: true
 *               Quantity:
 *                 type: number
 *                 format: decimal
 *                 example: 10.50
 *               MovementType:
 *                 type: string
 *                 example: "Transfer"
 *               EmployeeID:
 *                 type: integer
 *               ReferenceID:
 *                 type: integer
 *                 nullable: true
 *               Notes:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Created
 */

const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const stockMovement = require("../controllers/stockMovement.controller.js");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, stockMovement);

    app.use('/api/stockMovement', router);
}