const { Event } = require('../models');

const eventData = [
    {
        title: "Brendan's Garage Sale",
        location: "1101 Walnut St, Philadelphia Pa 19107",
        date: 2020-9-18,
        description: "Join us at Brendan's Garage Sale and find yourself some new tech gadgets!"

    },
];


const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;
