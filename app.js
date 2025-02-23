const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const cartItemRoutes = require('./routes/cartItemRoutes');
const { sequelize } = require('./models');

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API documentation for the E-commerce application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/order-items', orderItemRoutes);
app.use('/cart-items', cartItemRoutes);

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

// Add logging to ensure routes are registered
console.log('Registering routes...');
console.log('Auth routes:', authRoutes);
console.log('Product routes:', productRoutes);
console.log('User routes:', userRoutes);
console.log('Cart routes:', cartRoutes);
console.log('Order routes:', orderRoutes);
console.log('Order item routes:', orderItemRoutes);
console.log('Cart item routes:', cartItemRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});



// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const userRoutes = require('./routes/userRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const orderItemRoutes = require('./routes/orderItemRoutes');
// const cartItemRoutes = require('./routes/cartItemRoutes');
// const checkoutRoutes = require('./routes/checkoutRoutes'); 
// const { sequelize } = require('./models');

// const app = express();

// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS

// // Swagger setup
// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'E-commerce API',
//       version: '1.0.0',
//       description: 'API documentation for the E-commerce application',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',
//       },
//     ],
//   },
//   apis: ['./routes/*.js'], // Path to the API docs
// };

// const swaggerDocs = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// app.use('/auth', authRoutes);
// app.use('/products', productRoutes);
// app.use('/users', userRoutes);
// app.use('/carts', cartRoutes);
// app.use('/orders', orderRoutes);
// app.use('/order-items', orderItemRoutes);
// app.use('/cart-items', cartItemRoutes);
// app.use('/checkout', checkoutRoutes); 

// // Define a root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the E-commerce API');
// });

// sequelize.sync().then(() => {
//   app.listen(3000, () => {
//     console.log('Server is running on port 3000');
//   });
// });