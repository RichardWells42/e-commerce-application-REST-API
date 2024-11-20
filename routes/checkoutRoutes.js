const express = require('express');
const { checkout } = require('../controllers/checkoutController');
const router = express.Router();

/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Checkout the cart
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Checkout successful
 */
router.post('/', checkout);

module.exports = router;