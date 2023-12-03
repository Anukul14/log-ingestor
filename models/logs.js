"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Logs.hasOne(models.FullTextLogs, {
        foreignKey: "logId",
        sourceKey: "id",
      });
    }
  }
  Logs.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      level: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING(500),
      },
      resourceId: {
        allowNull: false,
        type: DataTypes.STRING(500),
        field: "resource_id",
      },
      timestamp: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "timestamp",
      },
      traceId: {
        allowNull: true,
        type: DataTypes.STRING(500),
        field: "trace_id",
      },
      spanId: {
        allowNull: true,
        type: DataTypes.STRING(500),
        field: "span_id",
      },
      commit: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      parentResourceId: {
        allowNull: true,
        type: DataTypes.STRING,
        field: "parent_resource_id",
      },
    },
    {
      sequelize,
      modelName: "Logs",
      tableName: "logs",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Logs;
};
