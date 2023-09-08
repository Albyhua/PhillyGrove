const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
            allowNull: false,
          },
          location: {
            type:DataTypes.STRING,
            allowNull: false,
          },
          date: {
            type:DATETIME,
            allowNull:false,
          },
          description: {
            type:DataTypes.STRING,
            allowNull:false,
          }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'event',
    }
);

module.exports= Event;