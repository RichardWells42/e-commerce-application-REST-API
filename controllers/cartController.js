const { Cart, CartItem, Product } = require('../models');

exports.addToCart = async (req, res) => {
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
    }

    let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (cartItem) {
      console.log('Cart item found, updating quantity');
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      console.log('Cart item not found, creating new cart item');
      cartItem = await CartItem.create({ cartId: cart.id, productId, quantity });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;
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


// const { Cart, CartItem, Product } = require('../models');

// exports.addToCart = async (req, res) => {
//   const { userId, productId, quantity } = req.body;
//   try {
//     console.log(`Adding to cart: userId=${userId}, productId=${productId}, quantity=${quantity}`);
//     const product = await Product.findByPk(productId);
//     if (!product) {
//       console.log('Product not found');
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     let cart = await Cart.findOne({ where: { userId } });
//     if (!cart) {
//       console.log('Cart not found, creating new cart');
//       cart = await Cart.create({ userId });
//     }

//     let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
//     if (cartItem) {
//       console.log('Cart item found, updating quantity');
//       cartItem.quantity += quantity;
//       await cartItem.save();
//     } else {
//       console.log('Cart item not found, creating new cart item');
//       cartItem = await CartItem.create({ cartId: cart.id, productId, quantity });
//     }

//     res.status(201).json(cartItem);
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

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
//     res.json(cart.CartItems);
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateCart = async (req, res) => {
//   const { id } = req.params;
//   const { quantity } = req.body;
//   try {
//     console.log(`Updating cart item: id=${id}, quantity=${quantity}`);
//     const cartItem = await CartItem.findByPk(id);
//     if (!cartItem) {
//       console.log('Cart item not found');
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     cartItem.quantity = quantity;
//     await cartItem.save();
//     res.json(cartItem);
//   } catch (error) {
//     console.error('Error updating cart item:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.deleteFromCart = async (req, res) => {
//   const { id } = req.params;
//   try {
//     console.log(`Deleting cart item: id=${id}`);
//     const cartItem = await CartItem.findByPk(id);
//     if (!cartItem) {
//       console.log('Cart item not found');
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     await cartItem.destroy();
//     res.status(204).send();
//   } catch (error) {
//     console.error('Error deleting cart item:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const { Cart, CartItem, Product } = require('../models');

// exports.addToCart = async (req, res) => {
//   const { userId, productId, quantity } = req.body;
//   try {
//     const product = await Product.findByPk(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     let cart = await Cart.findOne({ where: { userId } });
//     if (!cart) {
//       cart = await Cart.create({ userId });
//     }

//     let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
//     if (cartItem) {
//       cartItem.quantity += quantity;
//       await cartItem.save();
//     } else {
//       cartItem = await CartItem.create({ cartId: cart.id, productId, quantity });
//     }

//     res.status(201).json(cartItem);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getCart = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const cart = await Cart.findOne({ where: { userId }, include: [{ model: CartItem, include: [Product] }] });
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
//     res.json(cart.CartItems);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateCart = async (req, res) => {
//   const { id } = req.params;
//   const { quantity } = req.body;
//   try {
//     const cartItem = await CartItem.findByPk(id);
//     if (!cartItem) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     cartItem.quantity = quantity;
//     await cartItem.save();
//     res.json(cartItem);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.deleteFromCart = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const cartItem = await CartItem.findByPk(id);
//     if (!cartItem) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     await cartItem.destroy();
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const { Cart, Product } = require('../models');

// exports.addToCart = async (req, res) => {
//   const { userId, productId, quantity } = req.body;
//   try {
//     const product = await Product.findByPk(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     let cartItem = await Cart.findOne({ where: { userId, productId } });
//     if (cartItem) {
//       cartItem.quantity += quantity;
//       await cartItem.save();
//     } else {
//       cartItem = await Cart.create({ userId, productId, quantity });
//     }

//     res.status(201).json(cartItem);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getCart = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const cartItems = await Cart.findAll({ where: { userId }, include: [Product] });
//     res.json(cartItems);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateCart = async (req, res) => {
//   const { id } = req.params;
//   const { quantity } = req.body;
//   try {
//     const cartItem = await Cart.findByPk(id);
//     if (!cartItem) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     cartItem.quantity = quantity;
//     await cartItem.save();
//     res.json(cartItem);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.deleteFromCart = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const cartItem = await Cart.findByPk(id);
//     if (!cartItem) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     await cartItem.destroy();
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };