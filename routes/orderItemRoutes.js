const express = require('express');
const { createOrderItem, getOrderItems, getOrderItem, updateOrderItem, deleteOrderItem } = require('../controllers/orderItemController');
const router = express.Router();

/**
 * @swagger
 * /order-items:
 *   post:
 *     summary: Create a new order item
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order item created successfully
 */
router.post('/', createOrderItem);

/**
 * @swagger
 * /order-items:
 *   get:
 *     summary: Get all order items
 *     tags: [OrderItems]
 *     responses:
 *       200:
 *         description: List of all order items
 */
router.get('/', getOrderItems);

/**
 * @swagger
 * /order-items/{id}:
 *   get:
 *     summary: Get an order item by ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order item details
 */
router.get('/:id', getOrderItem);

/**
 * @swagger
 * /order-items/{id}:
 *   put:
 *     summary: Update an order item by ID
 *     tags: [OrderItems]
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
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order item updated successfully
 */
router.put('/:id', updateOrderItem);

/**
 * @swagger
 * /order-items/{id}:
 *   delete:
 *     summary: Delete an order item by ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Order item deleted successfully
 */
router.delete('/:id', deleteOrderItem);

module.exports = router;