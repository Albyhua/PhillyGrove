const User = require('./User');
const Event = require('./event')

User.belongsToMany(Event);
Event.belongsToMany(User);


module.exports = { User, Event };