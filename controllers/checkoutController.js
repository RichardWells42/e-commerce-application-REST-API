const { Cart, CartItem, Order, OrderItem, Product } = require('../models');

exports.checkout = async (req, res) => {
  const { cartId } = req.params;
  try {
    // Find the cart
    const cart = await Cart.findOne({
      where: { id: cartId },
      include: [{ model: CartItem, include: [Product] }]
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Calculate the total amount
    const totalAmount = cart.CartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.Product.price;
    }, 0);

    // Create a new order
    const order = await Order.create({ userId: cart.userId, totalAmount });

    // Create order items
    const orderItems = await Promise.all(
      cart.CartItems.map(cartItem => {
        return OrderItem.create({
          orderId: order.id,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: cartItem.Product.price,
        });
      })
    );

    // Clear the cart
    await CartItem.destroy({ where: { cartId: cart.id } });

    res.status(200).json({ order, orderItems });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: error.message });
  }
};


// const { Cart, CartItem, Order, OrderItem, Product } = require('../models');

// exports.checkout = async (req, res) => {
//   const { userId } = req.body;               
//   try {
//     // Find the user's cart
//     const cart = await Cart.findOne({
//       where: { userId },
//       include: [{ model: CartItem, include: [Product] }]
//     });

//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     // Calculate the total amount
//     const totalAmount = cart.CartItems.reduce((total, cartItem) => {
//       return total + cartItem.quantity * cartItem.Product.price;
//     }, 0);

//     // Create a new order
//     const order = await Order.create({ userId, totalAmount });

//     // Create order items
//     const orderItems = await Promise.all(
//       cart.CartItems.map(cartItem => {
//         return OrderItem.create({
//           orderId: order.id,
//           productId: cartItem.productId,
//           quantity: cartItem.quantity,
//           price: cartItem.Product.price,
//         });
//       })
//     );

//     // Clear the cart
//     await CartItem.destroy({ where: { cartId: cart.id } });

//     res.status(200).json({ order, orderItems });
//   } catch (error) {
//     console.error('Error during checkout:', error);
//     res.status(500).json({ message: error.message });
//   }
// };