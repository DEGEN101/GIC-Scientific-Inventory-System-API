/**
 * @swagger
 * tags:
 *   - name: StockCheck
 *     description: Stock check management
 */

/**
 * @swagger
 * /api/stockCheck:
 *   get:
 *     summary: Get all stock checks
 *     tags: [StockCheck]
 *     responses:
 *       200:
 *         description: List of stock checks
 */

/**
 * @swagger
 * /api/stockCheck/{id}:
 *   get:
 *     summary: Get a stock check by ID
 *     tags: [StockCheck]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock check found
 *       404:
 *         description: Stock check not found
 */

/**
 * @swagger
 * /api/stockCheck:
 *   post:
 *     summary: Create a new stock check
 *     tags: [StockCheck]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LocationID:
 *                 type: integer
 *               EmployeeID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/stockCheck/status/{id}:
 *   put:
 *     summary: Update the status of a stock check
 *     tags: [StockCheck]
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
 *               status:
 *                 type: string
 *                 example: "Completed"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 example: "2025-09-10T12:00:00Z"
 *     responses:
 *       200:
 *         description: Status updated
 *       404:
 *         description: Stock check not found
 */

const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const stockcheck = require("../controllers/stockCheck.controller.js");

    const router = require("express").Router();

    // Register generic CRUD routes
    registerCrudRoutes(router, stockcheck);

    // Add custom route(s) below
    router.put("/status/:id", stockcheck.updateStatus);

    app.use('/api/stockCheck', router);
}