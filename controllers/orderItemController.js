const { OrderItem } = require('../models');

exports.createOrderItem = async (req, res) => {
  const orderItem = await OrderItem.create(req.body);
  res.status(201).json(orderItem);
};

exports.getOrderItems = async (req, res) => {
  const orderItems = await OrderItem.findAll();
  res.json(orderItems);
};

exports.getOrderItem = async (req, res) => {
  const orderItem = await OrderItem.findByPk(req.params.id);
  res.json(orderItem);
};

exports.updateOrderItem = async (req, res) => {
  const orderItem = await OrderItem.findByPk(req.params.id);
  await orderItem.update(req.body);
  res.json(orderItem);
};

exports.deleteOrderItem = async (req, res) => {
  const orderItem = await OrderItem.findByPk(req.params.id);
  await orderItem.destroy();
  res.status(204).send();
};