const User = require("./User");
const Event = require("./event");
const Comment = require("./comment");

User.hasMany(Event,{
foreignKey:'user_id',
onDelete:'CASCADE'
});

Event.belongsTo(User,{
    foreignKey:'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User,{
foreignKey:'user_id',
onDelete:"CASCADE"
});

Comment.belongsTo(Event,{
    foreignKey:'event_id'
});

User.hasMany(Comment,{
    foreignKey:'user_id'
});

Event.hasMany(Comment,{
    foreignKey:'event_id',
    onDelete:"CASCADE"
});
module.exports = { User, Event, Comment };
