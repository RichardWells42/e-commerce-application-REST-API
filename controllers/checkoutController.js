const { Cart, CartItem, Order, OrderItem, Product } = require('../models');

exports.checkoutByCartId = async (req, res) => {
  console.log('Request Params:', req.params); // Log the request params
  const { cartId } = req.params;
  console.log('cartId from params:', cartId); // Log the cartId

  if (!cartId) {
    return res.status(400).json({ message: 'cartId is required' });
  }

  try {
    console.log(`Checking out for cartId: ${cartId}`);
    // Find the cart
    const cart = await Cart.findOne({
      where: { id: cartId },
      include: [{ model: CartItem, include: [Product] }]
    });

    if (!cart) {
      console.log('Cart not found');
      return res.status(404).json({ message: 'Cart not found' });
    }

    console.log('Cart found:', cart);
    console.log('Cart userId:', cart.userId); // Log the userId

    if (!cart.CartItems || cart.CartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate the total amount
    const totalAmount = cart.CartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.Product.price;
    }, 0);

    console.log('Total amount:', totalAmount);

    // Create a new order
    const order = await Order.create({ userId: cart.userId, totalAmount });
    console.log('Order created:', order);

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

    console.log('Order items created:', orderItems);

    // // Clear the cart
    // await CartItem.destroy({ where: { cartId: cart.id } });
    // console.log('Cart cleared');

    // Clear the cart
    await CartItem.destroy({ where: { cartId: cart.id } });
    console.log('Cart cleared. Creating a new cart for the user...');
    await Cart.create({ userId: cart.userId }); // Create a new cart for the user

    res.status(200).json({ order, orderItems });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.checkoutByUserId = async (req, res) => {
  console.log('Request Body:', req.body); // Log the request body
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }
  try {
    console.log(`Checking out for userId: ${userId}`);
    // Find the user's cart
    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: CartItem, include: [Product] }]
    });

    if (!cart) {
      console.log('Cart not found');
      return res.status(404).json({ message: 'Cart not found' });
    }

    console.log('Cart found:', cart);
    console.log('Cart items:', cart.CartItems); // Log the cart items

    if (!cart.CartItems || cart.CartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate the total amount
    const totalAmount = cart.CartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.Product.price;
    }, 0);

    console.log('Total amount:', totalAmount);

    // Create a new order
    const order = await Order.create({ userId, totalAmount });
    console.log('Order created:', order);

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

    console.log('Order items created:', orderItems);

    // // Clear the cart
    // await CartItem.destroy({ where: { cartId: cart.id } });
    // console.log('Cart cleared');

    // // Clear the cart
    // await CartItem.destroy({ where: { cartId: cart.id } });
    // console.log('Cart cleared. Creating a new cart for the user...');
    // await Cart.create({ userId: cart.userId }); // Create a new cart for the user

     // Clear the cart
    await CartItem.destroy({ where: { cartId: cart.id } });
    console.log('Cart cleared. Creating a new cart for the user...');
    const newCart = await Cart.create({ userId: cart.userId }); // Create a new cart for the user
 
    // Add the items back to the new cart
    await Promise.all(
      cart.CartItems.map(cartItem => {
        return CartItem.create({
          cartId: newCart.id,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
        });
      })
    );
 
    console.log('New cart created with items:', newCart);


    res.status(200).json({ order, orderItems });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: error.message });
  }
};



// const { Cart, CartItem, Order, OrderItem, Product } = require('../models');

// exports.checkoutByCartId = async (req, res) => {
//   console.log('Request Params:', req.params); // Log the request params
//   const { cartId } = req.params;
//   console.log('cartId from params:', cartId); // Log the cartId
//   try {
//     console.log(`Checking out for cartId: ${cartId}`);
//     // Find the cart
//     const cart = await Cart.findOne({
//       where: { id: cartId },
//       include: [{ model: CartItem, include: [Product] }]
//     });

//     if (!cart) {
//       console.log('Cart not found');
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     console.log('Cart found:', cart);
//     console.log('Cart userId:', cart.userId); // Log the userId

//     // Calculate the total amount
//     const totalAmount = cart.CartItems.reduce((total, cartItem) => {
//       return total + cartItem.quantity * cartItem.Product.price;
//     }, 0);

//     console.log('Total amount:', totalAmount);

//     // Create a new order
//     const order = await Order.create({ userId: cart.userId, totalAmount });
//     console.log('Order created:', order);

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

//     console.log('Order items created:', orderItems);

//     // Clear the cart
//     await CartItem.destroy({ where: { cartId: cart.id } });
//     console.log('Cart cleared');

//     res.status(200).json({ order, orderItems });
//   } catch (error) {
//     console.error('Error during checkout:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.checkoutByUserId = async (req, res) => {
//   console.log('Request Body:', req.body); // Log the request body
//   const { userId } = req.body;
//   if (!userId) {
//     return res.status(400).json({ message: 'userId is required' });
//   }
//   try {
//     console.log(`Checking out for userId: ${userId}`);
//     // Find the user's cart
//     const cart = await Cart.findOne({
//       where: { userId },
//       include: [{ model: CartItem, include: [Product] }]
//     });

//     if (!cart) {
//       console.log('Cart not found');
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     console.log('Cart found:', cart);

//     // Calculate the total amount
//     const totalAmount = cart.CartItems.reduce((total, cartItem) => {
//       return total + cartItem.quantity * cartItem.Product.price;
//     }, 0);

//     console.log('Total amount:', totalAmount);

//     // Create a new order
//     const order = await Order.create({ userId, totalAmount });
//     console.log('Order created:', order);

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

//     console.log('Order items created:', orderItems);

//     // Clear the cart
//     await CartItem.destroy({ where: { cartId: cart.id } });
//     console.log('Cart cleared');

//     res.status(200).json({ order, orderItems });
//   } catch (error) {
//     console.error('Error during checkout:', error);
//     res.status(500).json({ message: error.message });
//   }
// };












// const { Cart, CartItem, Order, OrderItem, Product } = require('../models');

// exports.checkout = async (req, res) => {
//   console.log('Request Params:', req.params); // Log the request params
//   const { cartId } = req.params;
//   console.log('cartId from params:', cartId); // Log the cartId
//   try {
//     console.log(`Checking out for cartId: ${cartId}`);
//     // Find the cart
//     const cart = await Cart.findOne({
//       where: { id: cartId },
//       include: [{ model: CartItem, include: [Product] }]
//     });

//     if (!cart) {
//       console.log('Cart not found');
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     console.log('Cart found:', cart);
//     console.log('Cart userId:', cart.userId); // Log the userId
    
//     // Calculate the total amount
//     const totalAmount = cart.CartItems.reduce((total, cartItem) => {
//       return total + cartItem.quantity * cartItem.Product.price;
//     }, 0);

//     console.log('Total amount:', totalAmount);

//     // Create a new order
//     const order = await Order.create({ userId: cart.userId, totalAmount });
//     console.log('Order created:', order);

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

//     console.log('Order items created:', orderItems);

//     // Clear the cart
//     await CartItem.destroy({ where: { cartId: cart.id } });
//     console.log('Cart cleared');

//     res.status(200).json({ order, orderItems });
//   } catch (error) {
//     console.error('Error during checkout:', error);
//     res.status(500).json({ message: error.message });
//   }
// };















// const { Cart, CartItem, Order, OrderItem, Product } = require('../models');

// exports.checkout = async (req, res) => {
//   console.log('Request Body:', req.body); // Log the request body
//   const { userId } = req.body;
//   if (!userId) {
//     return res.status(400).json({ message: 'userId is required' });
//   }
//   try {
//     console.log(`Checking out for userId: ${userId}`);
//     // Find the user's cart
//     const cart = await Cart.findOne({
//       where: { userId },
//       include: [{ model: CartItem, include: [Product] }]
//     });

//     if (!cart) {
//       console.log('Cart not found');
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     console.log('Cart found:', cart);

//     // Calculate the total amount
//     const totalAmount = cart.CartItems.reduce((total, cartItem) => {
//       return total + cartItem.quantity * cartItem.Product.price;
//     }, 0);

//     console.log('Total amount:', totalAmount);

//     // Create a new order
//     const order = await Order.create({ userId, totalAmount });
//     console.log('Order created:', order);

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

//     console.log('Order items created:', orderItems);

//     // Clear the cart
//     await CartItem.destroy({ where: { cartId: cart.id } });
//     console.log('Cart cleared');

//     res.status(200).json({ order, orderItems });
//   } catch (error) {
//     console.error('Error during checkout:', error);
//     res.status(500).json({ message: error.message });
//   }
// };
 