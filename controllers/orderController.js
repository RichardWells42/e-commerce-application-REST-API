const { Order, Cart, Product } = require('../models');

exports.placeOrder = async (req, res) => {
  const userId = req.userId;
  const cartItems = await Cart.findAll({ where: { userId } });
  let totalAmount = 0;

  for (const item of cartItems) {
    const product = await Product.findByPk(item.productId);
    totalAmount += product.price * item.quantity;
  }

  const order = await Order.create({ userId, totalAmount });
  await Cart.destroy({ where: { userId } });

  res.status(201).json(order);
};