'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column already exists
    const tableInfo = await queryInterface.describeTable('CartItems');
    if (!tableInfo.productId) {
      // Add the productId column
      await queryInterface.addColumn('CartItems', 'productId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Check if the column exists before removing it
    const tableInfo = await queryInterface.describeTable('CartItems');
    if (tableInfo.productId) {
      await queryInterface.removeColumn('CartItems', 'productId');
    }
  }
};