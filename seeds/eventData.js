const { Event } = require('../models');

const eventData = [
    {
        title: "Brendan's Garage Sale",
        location: "1101 Walnut St, Philadelphia Pa 19107",
        date: 2023-9-18,
        description: "Join us at Brendan's Garage Sale and find yourself some new tech gadgets!",
        user_id: 2
    },
    {
        title: "PARTY!",
        location: "1113 Market St, Philadelphia Pa 19107",
        date: 2023-9-18,
        description: "Spend time with friends in good place!",
        user_id: 3
    },
    // {
    //     title: "Anarchist Reading Group",
    //     location:"704 South St, Philadelphia, PA 19147",
    //     date: 2023-10-17,
    //     description: "Join some anarchists at Wooden Shoe Books to discuss 'Anarchism and Other Essays' by Emma Goldman, one of the most important figures in the history of Anarchism.",
    //     user_id: 4
    // }
];


const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;
