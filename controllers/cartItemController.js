const { CartItem } = require('../models');

exports.createCartItem = async (req, res) => {
  const cartItem = await CartItem.create(req.body);
  res.status(201).json(cartItem);
};

exports.getCartItems = async (req, res) => {
  const cartItems = await CartItem.findAll();
  res.json(cartItems);
};

exports.getCartItem = async (req, res) => {
  const cartItem = await CartItem.findByPk(req.params.id);
  res.json(cartItem);
};

exports.updateCartItem = async (req, res) => {
  const cartItem = await CartItem.findByPk(req.params.id);
  await cartItem.update(req.body);
  res.json(cartItem);
};

exports.deleteCartItem = async (req, res) => {
  const cartItem = await CartItem.findByPk(req.params.id);
  await cartItem.destroy();
  res.status(204).send();
};