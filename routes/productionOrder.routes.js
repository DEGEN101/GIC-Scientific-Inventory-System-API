/**
 * @swagger
 * tags:
 *   - name: ProductionOrders
 *     description: Manage production orders
 */

/**
 * @swagger
 * /api/productionOrder:
 *   get:
 *     summary: Get all production orders
 *     tags: [ProductionOrders]
 *     responses:
 *       200:
 *         description: List of production orders
 */

/**
 * @swagger
 * /api/productionOrder/{id}:
 *   get:
 *     summary: Get a production order by ID
 *     tags: [ProductionOrders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Production order found
 *       404:
 *         description: Production order not found
 */

/**
 * @swagger
 * /api/productionOrder:
 *   post:
 *     summary: Create a new production order
 *     tags: [ProductionOrders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               QuantityToProduce:
 *                 type: number
 *               ProductionDate:
 *                 type: string
 *                 format: date-time
 *               Status:
 *                 type: string
 *               ProducedBy:
 *                 type: integer
 *               Notes:
 *                 type: string
 *               InvoiceNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/productionOrder/{id}:
 *   put:
 *     summary: Update a production order
 *     tags: [ProductionOrders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @swagger
 * /api/productionOrder/{id}:
 *   delete:
 *     summary: Delete a production order
 *     tags: [ProductionOrders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted
 */

const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const productionOrder = require("../controllers/productionOrder.controller.js");
    const router = require("express").Router();

    registerCrudRoutes(router, productionOrder);

    app.use("/api/productionOrder", router);
};
