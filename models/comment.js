const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Comment extends Model {
//   checkPassword(loginPw) {
//     return bcrypt.compareSync(loginPw, this.password);
//   }
};

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    comment_text: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    event_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'event',
          key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references:{
            model:'user',
            key:'id'
        }
    },
    created_at: {
        type: DataTypes.TIME,
        defaultValue:DataTypes.NOW,
        allowNull:false,
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "event",
    }
);

module.exports = Comment;