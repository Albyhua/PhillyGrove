const User = require("./User");
const Event = require("./Event");
const Comment = require("./comment");

User.hasMany(Event);
Event.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Event.hasMany(Comment);
Comment.belongsTo(Event);

module.exports = { User, Event, Comment };
