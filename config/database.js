const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;