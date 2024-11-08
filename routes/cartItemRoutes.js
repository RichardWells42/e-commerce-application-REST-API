const express = require('express');
const { createCartItem, getCartItems, getCartItem, updateCartItem, deleteCartItem } = require('../controllers/cartItemController');
const router = express.Router();

router.post('/', createCartItem);
router.get('/', getCartItems);
router.get('/:id', getCartItem);
router.put('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);

module.exports = router;