/**
 * @swagger
 * tags:
 *   - name: StockItemCategory
 *     description: Manage stock item categories
 */

/**
 * @swagger
 * /api/stockItemCategory:
 *   get:
 *     summary: Get all stock item categories
 *     tags: [StockItemCategory]
 *     responses:
 *       200:
 *         description: List of stock item categories
 */

/**
 * @swagger
 * /api/stockItemCategory/{id}:
 *   get:
 *     summary: Get a stock item category by ID
 *     tags: [StockItemCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock item category found
 *       404:
 *         description: Stock item category not found
 */

/**
 * @swagger
 * /api/stockItemCategory:
 *   post:
 *     summary: Create a new stock item category
 *     tags: [StockItemCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CategoryName:
 *                 type: string
 *               Description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/stockItemCategory/{id}:
 *   put:
 *     summary: Update a stock item category by ID
 *     tags: [StockItemCategory]
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
 *               CategoryName:
 *                 type: string
 *               Description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @swagger
 * /api/stockItemCategory/{id}:
 *   delete:
 *     summary: Delete a stock item category
 *     tags: [StockItemCategory]
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
    const stockItemCategory = require("../controllers/stockItemCategory.controller.js");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, stockItemCategory);

    // Add custom route(s) below

    app.use("/api/stockItemCategory", router);
}
