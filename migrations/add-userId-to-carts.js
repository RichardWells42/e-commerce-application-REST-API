'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column already exists
    const tableInfo = await queryInterface.describeTable('Carts');
    if (!tableInfo.userId) {
      // Add the userId column
      await queryInterface.addColumn('Carts', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Check if the column exists before removing it
    const tableInfo = await queryInterface.describeTable('Carts');
    if (tableInfo.userId) {
      await queryInterface.removeColumn('Carts', 'userId');
    }
  }
};