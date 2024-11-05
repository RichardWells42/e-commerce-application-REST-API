const express = require('express');
const { placeOrder, getOrders, getOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

console.log('placeOrder:', placeOrder);
console.log('getOrders:', getOrders);
console.log('getOrder:', getOrder);
console.log('updateOrder:', updateOrder);
console.log('deleteOrder:', deleteOrder);

router.post('/', placeOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;