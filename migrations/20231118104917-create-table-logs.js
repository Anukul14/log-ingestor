"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("logs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      level: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      message: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(500),
      },
      resourceId: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(500),
        field: "resource_id",
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: "timestamp",
      },
      traceId: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING(500),
        field: "trace_id",
      },
      spanId: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING(500),
        field: "span_id",
      },
      commit: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      parentResourceId: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
        field: "parent_resource_id",
      },
    });
    await queryInterface.addIndex("logs", ["level"]);
    await queryInterface.addIndex("logs", ["message"]);
    await queryInterface.addIndex("logs", ["resource_id"]);
    await queryInterface.addIndex("logs", ["timestamp"]);
    await queryInterface.addIndex("logs", ["trace_id"]);
    await queryInterface.addIndex("logs", ["span_id"]);
    await queryInterface.addIndex("logs", ["commit"]);
    await queryInterface.addIndex("logs", ["parent_resource_id"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("logs");
  },
};
