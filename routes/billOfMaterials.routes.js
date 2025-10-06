/**
 * @swagger
 * tags:
 *   - name: BillOfMaterials
 *     description: Manage bill of materials
 */

/**
 * @swagger
 * /api/billOfMaterials:
 *   get:
 *     summary: Get all BOMs
 *     tags: [BillOfMaterials]
 *     responses:
 *       200:
 *         description: List of BOM entries
 */

/**
 * @swagger
 * /api/billOfMaterials/{id}:
 *   get:
 *     summary: Get BOM by ID
 *     tags: [BillOfMaterials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: BOM found
 */

/**
 * @swagger
 * /api/billOfMaterials/product/{productID}:
 *   get:
 *     summary: Get BOM for a product
 *     tags: [BillOfMaterials]
 *     parameters:
 *       - in: path
 *         name: productID
 *         required: true
 *     responses:
 *       200:
 *         description: BOM entries for product
 */

/**
 * @swagger
 * /api/billOfMaterials:
 *   post:
 *     summary: Create a new BOM
 *     tags: [BillOfMaterials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductID:
 *                 type: integer
 *               RawMaterialID:
 *                 type: integer
 *               QuantityRequired:
 *                 type: number
 *               UoMID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 */

const registerCrudRoutes = require("../utils/registerCrudRoutes.js");

module.exports = (app) => {
    const billOfMaterials = require("../controllers/billOfMaterials.controller.js");
    const router = require("express").Router();

    registerCrudRoutes(router, billOfMaterials);
    router.get("/product/:id", billOfMaterials.findByProductID);

    app.use("/api/billOfMaterials", router);
};
