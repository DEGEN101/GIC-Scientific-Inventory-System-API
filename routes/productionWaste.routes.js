/**
 * @swagger
 * tags:
 *   - name: ProductionWaste
 *     description: Manage waste tracking during production
 */

/**
 * @swagger
 * /api/productionWaste:
 *   get:
 *     summary: Get all waste entries
 *     tags: [ProductionWaste]
 *     responses:
 *       200:
 *         description: List of waste entries
 */

/**
 * @swagger
 * /api/productionWaste/order/{productionOrderID}:
 *   get:
 *     summary: Get waste by production order
 *     tags: [ProductionWaste]
 *     parameters:
 *       - in: path
 *         name: productionOrderID
 *         required: true
 *     responses:
 *       200:
 *         description: Waste records found
 */

/**
 * @swagger
 * /api/productionWaste:
 *   post:
 *     summary: Create a new waste record
 *     tags: [ProductionWaste]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductionOrderID:
 *                 type: integer
 *               InventoryID:
 *                 type: integer
 *               QuantityWasted:
 *                 type: number
 *               Reason:
 *                 type: string
 *               UoMID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 */

const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const productionWaste = require("../controllers/productionWaste.controller.js");
    const router = require("express").Router();

    registerCrudRoutes(router, productionWaste);
    router.get("/order/:id", productionWaste.findByOrderId);

    app.use("/api/productionWaste", router);
};
