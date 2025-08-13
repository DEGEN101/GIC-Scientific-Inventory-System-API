/**
 * @swagger
 * tags:
 *   - name: StockItemAttributeValues
 *     description: Stock item attribute value management
 */

/**
 * @swagger
 * /api/stockItemAttributeValue:
 *  get:
 *    summary: Get all stock item attribute values
 *    tags: [StockItemAttributeValues]
 *    responses:
 *      200:
 *        description: List of stock item attribute values
 * 
 */

/**
 * @swagger
 * /api/stockItemAttributeValue/key/{stockItemId}/{attributeId}:
 *   get:
 *     summary: Get a stock item attribute value by key
 *     tags: [StockItemAttributeValues]
 *     parameters:
 *       - in: path
 *         name: stockItemId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: attributeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock item attribute value found
 *       404:
 *         description: Stock item attribute value not found
 */

/**
 * @swagger
 * /api/stockItemAttributeValue:
 *   post:
 *     summary: Create a stock item attribute value
 *     tags: [StockItemAttributeValues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               StockItemID:
 *                  type: integer
 *               AttributeID:
 *                  type: integer
 *               AttributeValue:
 *                  type: string
 *     responses:
 *       201:
 *         description: Stock item attribute value created
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/stockItemAttributeValue/key/{stockItemId}/{attributeId}:
 *   put:
 *     summary: Update a stock item attribute value by key
 *     tags: [StockItemAttributeValues]
 *     parameters:
 *       - in: path
 *         name: stockItemId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: attributeId
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
 *               Value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Stock item attribute value not found
 */

/**
 * @swagger
 * /api/stockItemAttributeValue/key/{stockItemId}/{attributeId}:
 *   delete:
 *     summary: Delete a stock item attribute value by key
 *     tags: [StockItemAttributeValues]
 *     parameters:
 *       - in: path
 *         name: stockItemId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: attributeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Stock item attribute value not found
 */

/**
 * Registers CRUD and custom routes for stock item attribute values.
 *
 * @module routes/stockItemAttributeValue
 * @param {import('express').Application} app - The Express application instance.
 *
 * @requires ../controllers/stockItemAttributeValue.controller
 * @requires ../utils/registerCrudRoutes
 *
 * @route GET /api/stockItemAttributeValue/key/:stockItemId/:attributeId - Find a stock item attribute value by key.
 * @route POST /api/stockItemAttributeValue/key/:stockItemId/:attributeId - Update a stock item attribute value by key.
 * @route DELETE /api/stockItemAttributeValue/key/:stockItemId/:attributeId - Delete a stock item attribute value by key.
 */
const registerCrudRoutes = require("../utils/registerCrudRoutes");

module.exports = (app) => {
    const stockItemAttributeValue = require("../controllers/stockItemAttributeValue.controller");
    const router = require("express").Router();
    
    // Register generic CRUD routes
    registerCrudRoutes(router, stockItemAttributeValue);

    // Add custom route(s) below
    router.get('/key/:stockItemId/:attributeId', stockItemAttributeValue.findByKey);
    router.put('/key/:stockItemId/:attributeId', stockItemAttributeValue.update);
    router.delete('/key/:stockItemId/:attributeId', stockItemAttributeValue.delete);

    app.use('/api/stockItemAttributeValue', router);
}