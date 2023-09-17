const User = require("./User");
const Event = require("./Event");
const Comment = require("./comment");

User.hasMany(Event, {
  foreignKey: "user_id",
});
Event.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Event.hasMany(Comment, {
  foreignKey: "event_id",
});
Comment.belongsTo(Event, {
  foreignKey: "event_id",
});

module.exports = { User, Event, Comment };
