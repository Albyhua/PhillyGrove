const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: { len: [1] },
    },
    location: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      // allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      // allowNull:false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "event",
  }
);

module.exports = Event;
