const User = require("./User");
const Event = require("./event");

User.belongsToMany(Event, {
  foreignKey: "user_id",
  through: "user_event",
  onDelete: "CASCADE",
});
Event.belongsToMany(User, {
  foreignKey: "event_id",
  through: "user_event",
  onDelete: "CASCADE",
});

module.exports = { User, Event };
