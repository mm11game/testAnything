"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Reviews",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
        },
        content: {
          type: Sequelize.STRING,
        },
      },
      {
        timestamps: false,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Reviews");
  },
};
