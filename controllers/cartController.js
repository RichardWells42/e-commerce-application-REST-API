const { Cart, CartItem, Product } = require('../models');

exports.addToCart = async (req, res) => {
  console.log('Request Body:', req.body); // Log the request body
  const { userId, productId, quantity } = req.body;
  try {
    console.log(`Adding to cart: userId=${userId}, productId=${productId}, quantity=${quantity}`);
    const product = await Product.findByPk(productId);
    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      console.log('Cart not found, creating new cart');
      cart = await Cart.create({ userId });
      console.log('New cart created:', cart);
    } else {
      console.log('Cart found:', cart);
    }

    let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (cartItem) {
      console.log('Cart item found, updating quantity');
      cartItem.quantity += quantity;
      await cartItem.save();
      console.log('Cart item updated:', cartItem);
    } else {
      console.log('Cart item not found, creating new cart item');
      cartItem = await CartItem.create({ cartId: cart.id, productId, quantity });
      console.log('New cart item created:', cartItem);
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  console.log('Request Query:', req.query); // Log the request query parameters
  const { userId } = req.query; // Use req.query to get the userId from query parameters
  if (!userId) {
    return res.status(400).json({ message: 'userId query parameter is required' });
  }
  try {
    console.log(`Fetching cart for userId: ${userId}`);
    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: CartItem, include: [Product] }]
    });
    if (!cart) {
      console.log('Cart not found');
      return res.status(404).json({ message: 'Cart not found' });
    }
    console.log('Cart found:', cart);
    const cartItems = cart.CartItems.filter(cartItem => cartItem.Product);
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: error.message });
  }
};

// exports.getCart = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     console.log(`Fetching cart for userId: ${userId}`);
//     const cart = await Cart.findOne({
//       where: { userId },
//       include: [{ model: CartItem, include: [Product] }]
//     });
//     if (!cart) {
//       console.log('Cart not found');
//       return res.status(404).json({ message: 'Cart not found' });
//     }
//     console.log('Cart found:', cart);
//     const cartItems = cart.CartItems.filter(cartItem => cartItem.Product);
//     res.json(cartItems);
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    console.log(`Updating cart item: id=${id}, quantity=${quantity}`);
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      console.log('Cart item not found');
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Deleting cart item: id=${id}`);
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      console.log('Cart item not found');
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ message: error.message });
  }
};
