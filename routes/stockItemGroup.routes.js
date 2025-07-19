/**
 * @swagger
 * tags:
 *   - name: StockItemGroup
 *     description: Manage stock item groups
 */

/**
 * @swagger
 * /api/StockItemGroup:
 *   get:
 *     summary: Get all stock item groups
 *     tags: [StockItemGroup]
 *     responses:
 *       200:
 *         description: List of stock item groups
 */

/**
 * @swagger
 * /api/StockItemGroup/{id}:
 *   get:
 *     summary: Get a stock item group by ID
 *     tags: [StockItemGroup]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock item group found
 *       404:
 *         description: Stock item group not found
 */

/**
 * @swagger
 * /api/StockItemGroup:
 *   post:
 *     summary: Create a new stock item group
 *     tags: [StockItemGroup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
*             properties:
 *               GroupName:
 *                 type: string
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
 * /api/StockItemGroup/{id}:
 *   put:
 *     summary: Update a stock item group by ID
 *     tags: [StockItemGroup]
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
 *               GroupName:
 *                 type: string
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
 * /api/StockItemGroup/{id}:
 *   delete:
 *     summary: Delete a stock item group
 *     tags: [StockItemGroup]
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

const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const stockItemGroup = require("../controllers/stockItemGroup.controller");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, stockItemGroup);

    // Add custom route(s) below

    app.use("/api/stockItemGroup/", router);
}