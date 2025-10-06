/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Manage produced items
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/product/order/{productionOrderID}:
 *   get:
 *     summary: Get all products under a production order
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productionOrderID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Products found
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               BatchNumber:
 *                 type: string
 *               Quantity:
 *                 type: number
 *               Size:
 *                 type: string
 *               ProductionOrderID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
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
    const product = require("../controllers/product.controller.js");

    const router = require("express").Router();

    registerCrudRoutes(router, product);
    router.get("/order/:id", product.findByOrderId);

    app.use("/api/product", router);
};
