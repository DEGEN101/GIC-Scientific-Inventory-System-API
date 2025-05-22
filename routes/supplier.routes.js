/**
 * @swagger
 * tags:
 *   - name: Suppliers
 *     description: Supplier management
 */

/**
 * @swagger
 * /api/supplier:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: List of suppliers
 */

/**
 * @swagger
 * /api/supplier/{id}:
 *   get:
 *     summary: Get a supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Supplier found
 *       404:
 *         description: Supplier not found
 */

/**
 * @swagger
 * /api/supplier:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Email:
 *                 type: string
 *               PhoneNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/supplier/{id}:
 *   put:
 *     summary: Update a supplier by ID
 *     tags: [Suppliers]
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
 *               Name:
 *                 type: string
 *               Email:
 *                 type: string
 *               PhoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @swagger
 * /api/supplier/{id}:
 *   delete:
 *     summary: Delete a supplier
 *     tags: [Suppliers]
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
    const supplier = require("../controllers/supplier.controller");
    const router = require("express").Router();
    
    // Register generic CRUD routes
    registerCrudRoutes(router, supplier);

    // Add custom route(s) below

    app.use('/api/supplier', router);
}