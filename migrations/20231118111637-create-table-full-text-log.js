"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("full_text_logs", {
      logId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
        field: "log_id",
      },
      fullText: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT,
        field: "full_text",
      },
    });
    await queryInterface.addIndex("full_text_logs", ["full_text"], {
      type: "FULLTEXT",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("full_text_logs");
  },
};
