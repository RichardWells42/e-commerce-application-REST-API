'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column exists before removing it
    const tableInfo = await queryInterface.describeTable('Carts');
    if (tableInfo.quantity) {
      await queryInterface.removeColumn('Carts', 'quantity');
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Add the quantity column back if needed
    await queryInterface.addColumn('Carts', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};