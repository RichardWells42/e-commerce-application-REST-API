const express = require('express');
const { createCartItem, getCartItems, getCartItem, updateCartItem, deleteCartItem } = require('../controllers/cartItemController');
const router = express.Router();

/**
 * @swagger
 * /cart-items:
 *   post:
 *     summary: Create a new cart item
 *     tags: [CartItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cart item created successfully
 */
router.post('/', createCartItem);

/**
 * @swagger
 * /cart-items:
 *   get:
 *     summary: Get all cart items
 *     tags: [CartItems]
 *     responses:
 *       200:
 *         description: List of all cart items
 */
router.get('/', getCartItems);

/**
 * @swagger
 * /cart-items/{id}:
 *   get:
 *     summary: Get a cart item by ID
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart item details
 */
router.get('/:id', getCartItem);

/**
 * @swagger
 * /cart-items/{id}:
 *   put:
 *     summary: Update a cart item by ID
 *     tags: [CartItems]
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
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 */
router.put('/:id', updateCartItem);

/**
 * @swagger
 * /cart-items/{id}:
 *   delete:
 *     summary: Delete a cart item by ID
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cart item deleted successfully
 */
router.delete('/:id', deleteCartItem);

module.exports = router;