"use strict";
const { Model, DataTypes } = require("sequelize");
const User = require("./user");

module.exports = (sequelize) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(User, {
        foreignKey: "userId",
      });
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
