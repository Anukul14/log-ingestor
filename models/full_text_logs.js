"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FullTextLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.FullTextLogs.belongsTo(models.Logs, {
        foreignKey: "logId",
      });
    }
  }
  FullTextLogs.init(
    {
      logId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: "log_id",
      },
      fullText: {
        allowNull: false,
        type: DataTypes.TEXT,
        field: "full_text",
      },
    },
    {
      sequelize,
      modelName: "FullTextLogs",
      tableName: "full_text_logs",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return FullTextLogs;
};
