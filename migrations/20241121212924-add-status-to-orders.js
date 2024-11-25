'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Check if the column already exists
    const tableInfo = await queryInterface.describeTable('Orders');
    if (!tableInfo.status) {
      // Add the status column with a default value
      await queryInterface.addColumn('Orders', 'status', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending' // Provide a default value
      });
    }
  },

  async down (queryInterface, Sequelize) {
    // Check if the column exists before removing it
    const tableInfo = await queryInterface.describeTable('Orders');
    if (tableInfo.status) {
      await queryInterface.removeColumn('Orders', 'status');
    }
  }
};