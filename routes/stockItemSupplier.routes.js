/**
 * @swagger
 * tags:
 *   - name: StockItemSupplier
 *     description: Stock item supplier management
 */

/**
 * @swagger
 * /api/stockItemSupplier:
 *  get:
 *    summary: Get all stock item suppliers
 *    tags: [StockItemSupplier]
 *    responses:
 *      200:
 *        description: List of stock item suppliers
 * 
 */

/**
 * @swagger
 * /api/stockItemSupplier/key/{stockItemId}/{supplierId}:
 *   get:
 *     summary: Get a stock item supplier by key
 *     tags: [StockItemSupplier]
 *     parameters:
 *       - in: path
 *         name: stockItemId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: supplierId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock item supplier found
 *       404:
 *         description: Stock item supplier not found
 */

/**
 * @swagger
 * /api/stockItemSupplier:
 *   post:
 *     summary: Create a stock item supplier
 *     tags: [StockItemSupplier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               StockItemID:
 *                  type: integer
 *               SupplierID:
 *                  type: integer
 *               isPreferred:
 *                  type: boolean
 *     responses:
 *       201:
 *         description: Stock item supplier created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/stockItemSupplier/key/{stockItemId}/{supplierId}:
 *   put:
 *     summary: Update a stock item supplier by key
 *     tags: [StockItemSupplier]
 *     parameters:
 *       - in: path
 *         name: stockItemId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: supplierId
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
 *               isPreferred:
 *                 type: boolean
 *                 description: Indicates if the supplier is preferred for the stock item
 *     responses:
 *       200:
 *         description: Stock item supplier updated successfully
 *       404:
 *         description: Stock item supplier not found
 */

/**
 * @swagger
 * /api/stockItemSupplier/key/{stockItemId}/{supplierId}:
 *   delete:
 *     summary: Delete a stock item supplier by key
 *     tags: [StockItemSupplier]
 *     parameters:
 *       - in: path
 *         name: stockItemId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: supplierId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock item supplier deleted successfully
 *       404:
 *         description: Stock item supplier not found
 */ 
const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const stockItemSupplier = require("../controllers/stockItemSupplier.controller");
    const router = require("express").Router();
    
    // Register generic CRUD routes
    registerCrudRoutes(router, stockItemSupplier);

    // Add custom route(s) below
    router.get('/key/:stockItemId/:supplierId', stockItemSupplier.findByKey);
    router.put('/key/:stockItemId/:supplierId', stockItemSupplier.update);
    router.delete('/key/:stockItemId/:supplierId', stockItemSupplier.delete);

    app.use('/api/stockItemSupplier', router);
}