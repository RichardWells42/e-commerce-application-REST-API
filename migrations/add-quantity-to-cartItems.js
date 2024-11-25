'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column already exists
    const tableInfo = await queryInterface.describeTable('CartItems');
    if (!tableInfo.quantity) {
      // Add the quantity column
      await queryInterface.addColumn('CartItems', 'quantity', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Check if the column exists before removing it
    const tableInfo = await queryInterface.describeTable('CartItems');
    if (tableInfo.quantity) {
      await queryInterface.removeColumn('CartItems', 'quantity');
    }
  }
};