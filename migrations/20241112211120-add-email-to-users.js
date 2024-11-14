'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column already exists
    const tableInfo = await queryInterface.describeTable('Users');
    if (!tableInfo.email) {
      // Add the email column with a default value
      await queryInterface.addColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: 'default@example.com' // Provide a default value
      });

      // Update existing records to have a unique email
      await queryInterface.sequelize.query(
        `UPDATE "Users" SET "email" = CONCAT('user_', "id", '@example.com') WHERE "email" = 'default@example.com';`
      );

      // Remove the default value constraint
      await queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Check if the column exists before removing it
    const tableInfo = await queryInterface.describeTable('Users');
    if (tableInfo.email) {
      await queryInterface.removeColumn('Users', 'email');
    }
  }
};