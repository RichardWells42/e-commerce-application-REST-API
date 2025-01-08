const express = require('express');
const { addToCart, getCart, updateCart, deleteFromCart } = require('../controllers/cartController');
const { checkoutByCartId, checkoutByUserId } = require('../controllers/checkoutController'); // Import the checkout controller
const router = express.Router();

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 */
router.post('/', addToCart);

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Get all items in the cart
 *     tags: [Carts]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of all items in the cart
 */
router.get('/', getCart);

/**
 * @swagger
 * /carts/{id}:
 *   put:
 *     summary: Update a cart item by ID
 *     tags: [Carts]
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
router.put('/:id', updateCart);

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Delete a cart item by ID
 *     tags: [Carts]
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
router.delete('/:id', deleteFromCart);

/**
 * @swagger
 * /carts/{cartId}/checkout:
 *   post:
 *     summary: Checkout the cart by cartId
 *     tags: [Checkout]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Checkout successful
 */
router.post('/:cartId/checkout', checkoutByCartId);

/**
 * @swagger
 * /carts/checkout:  
 *   post:
 *     summary: Checkout the cart by userId
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
router.post('/checkout', (req, res, next) => {
    console.log('Received request for /carts/checkout');
    next();
  }, checkoutByUserId);       
// router.post('/checkout', checkoutByUserId);         

module.exports = router;



// const express = require('express');
// const { addToCart, getCart, updateCart, deleteFromCart } = require('../controllers/cartController');
// const { checkoutByCartId, checkoutByUserId } = require('../controllers/checkoutController'); // Import the checkout controller
// const router = express.Router();

// /**
//  * @swagger
//  * /carts:
//  *   post:
//  *     summary: Add a product to the cart
//  *     tags: [Carts]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               userId:
//  *                 type: integer
//  *               productId:
//  *                 type: integer
//  *               quantity:
//  *                 type: integer
//  *     responses:
//  *       201:
//  *         description: Product added to cart successfully
//  */
// router.post('/', addToCart);

// /**
//  * @swagger
//  * /carts:
//  *   get:
//  *     summary: Get all items in the cart
//  *     tags: [Carts]
//  *     parameters:
//  *       - in: query
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: List of all items in the cart
//  */
// router.get('/', getCart);

// /**
//  * @swagger
//  * /carts/{id}:
//  *   put:
//  *     summary: Update a cart item by ID
//  *     tags: [Carts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               quantity:
//  *                 type: integer
//  *     responses:
//  *       200:
//  *         description: Cart item updated successfully
//  */
// router.put('/:id', updateCart);

// /**
//  * @swagger
//  * /carts/{id}:
//  *   delete:
//  *     summary: Delete a cart item by ID
//  *     tags: [Carts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       204:
//  *         description: Cart item deleted successfully
//  */
// router.delete('/:id', deleteFromCart);

// /**
//  * @swagger
//  * /carts/{cartId}/checkout:
//  *   post:
//  *     summary: Checkout the cart by cartId
//  *     tags: [Checkout]
//  *     parameters:
//  *       - in: path
//  *         name: cartId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Checkout successful
//  */
// router.post('/:cartId/checkout', checkoutByCartId);

// /**
//  * @swagger
//  * /carts/{userId}/checkout:  
//  *   post:
//  *     summary: Checkout the cart by userId
//  *     tags: [Checkout]
//  *     parameters:
//  *       - in: path
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Checkout successful
//  */
// router.post('/:userId/checkout', checkoutByUserId);         

// module.exports = router;







































































// const express = require('express');
// const { addToCart, getCart, updateCart, deleteFromCart } = require('../controllers/cartController');
// const { checkoutByCartId, checkoutByUserId } = require('../controllers/checkoutController'); // Import the checkout controller
// const router = express.Router();

// /**
//  * @swagger
//  * /carts:
//  *   post:
//  *     summary: Add a product to the cart
//  *     tags: [Carts]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               userId:
//  *                 type: integer
//  *               productId:
//  *                 type: integer
//  *               quantity:
//  *                 type: integer
//  *     responses:
//  *       201:
//  *         description: Product added to cart successfully
//  */
// router.post('/', addToCart);

// /**
//  * @swagger
//  * /carts:
//  *   get:
//  *     summary: Get all items in the cart
//  *     tags: [Carts]
//  *     parameters:
//  *       - in: query
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: List of all items in the cart
//  */
// router.get('/', getCart);

// /**
//  * @swagger
//  * /carts/{id}:
//  *   put:
//  *     summary: Update a cart item by ID
//  *     tags: [Carts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               quantity:
//  *                 type: integer
//  *     responses:
//  *       200:
//  *         description: Cart item updated successfully
//  */
// router.put('/:id', updateCart);

// /**
//  * @swagger
//  * /carts/{id}:
//  *   delete:
//  *     summary: Delete a cart item by ID
//  *     tags: [Carts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       204:
//  *         description: Cart item deleted successfully
//  */
// router.delete('/:id', deleteFromCart);

// /**
//  * @swagger
//  * /carts/{cartId}/checkout:
//  *   post:
//  *     summary: Checkout the cart by cartId
//  *     tags: [Checkout]
//  *     parameters:
//  *       - in: path
//  *         name: cartId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Checkout successful
//  */
// router.post('/:cartId/checkout', checkoutByCartId);

// /**
//  * @swagger
//  * /checkout:  
//  *   post:
//  *     summary: Checkout the cart by userId
//  *     tags: [Checkout]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               userId:
//  *                 type: integer
//  *     responses:
//  *       200:
//  *         description: Checkout successful
//  */
// router.post('/checkout', checkoutByUserId);         

// module.exports = router;





// const express = require('express');
// const { addToCart, getCart, updateCart, deleteFromCart } = require('../controllers/cartController');
// const { checkout } = require('../controllers/checkoutController'); // Import the checkout controller
// const router = express.Router();

// /**
//  * @swagger
//  * /carts:
//  *   post:
//  *     summary: Add a product to the cart
//  *     tags: [Carts]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               userId:
//  *                 type: integer
//  *               productId:
//  *                 type: integer
//  *               quantity:
//  *                 type: integer
//  *     responses:
//  *       201:
//  *         description: Product added to cart successfully
//  */
// router.post('/', addToCart);

// /**
//  * @swagger
//  * /carts:
//  *   get:
//  *     summary: Get all items in the cart
//  *     tags: [Carts]
//  *     parameters:
//  *       - in: query
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: List of all items in the cart
//  */
// router.get('/', getCart);

// /**
//  * @swagger
//  * /carts/{id}:
//  *   put:
//  *     summary: Update a cart item by ID
//  *     tags: [Carts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               quantity:
//  *                 type: integer
//  *     responses:
//  *       200:
//  *         description: Cart item updated successfully
//  */
// router.put('/:id', updateCart);

// /**
//  * @swagger
//  * /carts/{id}:
//  *   delete:
//  *     summary: Delete a cart item by ID
//  *     tags: [Carts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       204:
//  *         description: Cart item deleted successfully
//  */
// router.delete('/:id', deleteFromCart);

// /**
//  * @swagger
//  * /carts/{cartId}/checkout:
//  *   post:
//  *     summary: Checkout the cart
//  *     tags: [Checkout]
//  *     parameters:
//  *       - in: path
//  *         name: cartId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Checkout successful
//  */
// router.post('/:cartId/checkout', checkout);

// module.exports = router;  