const express = require('express');
const { createOrderItem, getOrderItems, getOrderItem, updateOrderItem, deleteOrderItem } = require('../controllers/orderItemController');
const router = express.Router();

router.post('/', createOrderItem);
router.get('/', getOrderItems);
router.get('/:id', getOrderItem);
router.put('/:id', updateOrderItem);
router.delete('/:id', deleteOrderItem);

module.exports = router;