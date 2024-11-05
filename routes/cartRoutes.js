const express = require('express');
const { addToCart, getCart, updateCart, deleteFromCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/', addToCart);
router.get('/', getCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteFromCart);

module.exports = router;