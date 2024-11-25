'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column exists before removing it
    const tableInfo = await queryInterface.describeTable('Carts');
    if (tableInfo.productId) {
      await queryInterface.removeColumn('Carts', 'productId');
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Add the productId column back if needed
    await queryInterface.addColumn('Carts', 'productId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};