"use strict";
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const User = require("./model_user_try");

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
