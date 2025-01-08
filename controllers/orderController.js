const { Order, OrderItem, Product, CartItem, Cart } = require('../models');

// Place a new order
exports.placeOrder = async (req, res) => {
  const { userId } = req.body;
  try {
    // Find the user's cart
    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: CartItem, include: [Product] }]
    });

    if (!cart || cart.CartItems.length === 0) {
      return res.status(400).json({ message: 'No items in the cart' });
    }

    // Calculate the total amount
    const totalAmount = cart.CartItems.reduce((total, item) => total + item.quantity * item.Product.price, 0);

    // Create a new order
    const order = await Order.create({ userId, totalAmount });

    // Create order items
    const orderItems = await Promise.all(
      cart.CartItems.map(item => {
        return OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.Product.price,
        });
      })
    );

    // Clear the cart
    await CartItem.destroy({ where: { cartId: cart.id } });

    res.status(201).json({ order, orderItems });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: error.message });
  }
};


// const { Order, OrderItem, Product, CartItem } = require('../models');

// // Place a new order
// exports.placeOrder = async (req, res) => {
//   const { userId } = req.body;
//   try {
//     // Find the user's cart items
//     const cartItems = await CartItem.findAll({ where: { userId }, include: [Product] });
//     if (cartItems.length === 0) {
//       return res.status(400).json({ message: 'No items in the cart' });
//     }

//     // Calculate the total amount
//     const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.Product.price, 0);

//     // Create a new order
//     const order = await Order.create({ userId, totalAmount });

//     // Create order items
//     const orderItems = await Promise.all(
//       cartItems.map(item => {
//         return OrderItem.create({
//           orderId: order.id,
//           productId: item.productId,
//           quantity: item.quantity,
//           price: item.Product.price,
//         });
//       })
//     );

//     // Clear the cart
//     await CartItem.destroy({ where: { userId } });

//     res.status(201).json({ order, orderItems });
//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get an order by ID
exports.getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, { include: [OrderItem] });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { userId, totalAmount, status } = req.body; // Ensure status is included
  try {
    // Find the order by ID
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order
    await order.update({ userId, totalAmount, status }); // Ensure status is updated

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: error.message });
  }
};

// // Update an order by ID
// exports.updateOrder = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   try {
//     const order = await Order.findByPk(id);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }
//     order.status = status;
//     await order.save();
//     res.json(order);
//   } catch (error) {
//     console.error('Error updating order:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: error.message });
  }
};
