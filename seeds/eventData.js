const { Event } = require('../models');

const eventData = [
    {
        title: "Brendan's Garage Sale",
        location: "1101 Walnut St, Philadelphia Pa 19107",
        date: 2020-9-18,
        
        description: "Join us at Brendan's Garage Sale and find yourself some new tech gadgets!",
        user_id: 2
    },
    {
        title: "PARTY!",
        location: "1113 Market St, Philadelphia Pa 19107",
        date: 2020-9-18,
        description: "Spend time with friends in good place!",
        user_id: 3
    }
];


const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;
