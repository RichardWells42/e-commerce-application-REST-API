const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize);
const Product = require('./product')(sequelize, Sequelize);
const Cart = require('./cart')(sequelize, Sequelize);
const Order = require('./order')(sequelize, Sequelize);

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  Order
};