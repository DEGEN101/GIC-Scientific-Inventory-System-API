/**
 * @swagger
 * tags:
 *   - name: ProductionConsumption
 *     description: Manage raw material usage in production
 */

/**
 * @swagger
 * /api/productionConsumption:
 *   get:
 *     summary: Get all consumption entries
 *     tags: [ProductionConsumption]
 *     responses:
 *       200:
 *         description: List of consumption entries
 */

/**
 * @swagger
 * /api/productionConsumption:
 *   post:
 *     summary: Record material consumption for a production order
 *     description: Creates a new production consumption record that logs the amount of each material used in production.
 *     tags: [ProductionConsumption]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ProductionOrderID
 *               - InventoryID
 *               - QuantityUsed
 *             properties:
 *               ProductionOrderID:
 *                 type: integer
 *                 description: ID of the production order the consumption belongs to
 *                 example: 15
 *               InventoryID:
 *                 type: integer
 *                 description: ID of the item (e.g. filter paper) consumed
 *                 example: 102
 *               QuantityUsed:
 *                 type: number
 *                 description: Quantity of the item used during production
 *                 example: 25.5
 *     responses:
 *       201:
 *         description: Production consumption recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ProductionConsumptionId:
 *                   type: integer
 *                   description: Newly created record ID
 *                   example: 45
 *                 ProductionOrderID:
 *                   type: integer
 *                   example: 15
 *                 InventoryID:
 *                   type: integer
 *                   example: 102
 *                 QuantityUsed:
 *                   type: number
 *                   example: 25.5
 *       400:
 *         description: Bad request — missing or invalid parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/productionConsumption/order/{productionOrderID}:
 *   get:
 *     summary: Get consumption by production order
 *     tags: [ProductionConsumption]
 *     parameters:
 *       - in: path
 *         name: productionOrderID
 *         required: true
 *     responses:
 *       200:
 *         description: Consumption records found
 */

const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const productionConsumption = require("../controllers/productionConsumption.controller.js");
    const router = require("express").Router();

    registerCrudRoutes(router, productionConsumption);
    router.get("/order/:id", productionConsumption.findByOrderId);
    router.delete("/:orderId/:inventoryId", productionConsumption.delete)

    app.use("/api/productionConsumption", router);
};
