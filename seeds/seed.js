const sequelize = require("../config/connection");
const { User, Event, Comment } = require("../models");
// const User = require("../models/User");
// const Event = require("../models/Event");
// const Comment = require("../models/Comment");

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate([
      {
        name: "Angela",
        email: "angela@gmail.com",
        password: "password12345",
      },
      {
        name: "Brendan",
        email: "brendan@gmail.com",
        password: "password12345",
      },
      {
        name: "Albert",
        email: "albert0@hotmail.com",
        password: "password12345",
      },
      {
        name: "Antonio",
        email: "antonio@hotmail.com",
        password: "password12345",
      },
      {
        name: "Dimitry",
        email: "dimitry@yahoo.com",
        password: "password12345",
      },
    ]);
    const event = await Event.bulkCreate([
      {
        title: "Brendan's Garage Sale",
        location: "1101 Walnut St, Philadelphia Pa 19107",
        description:
          "Join us at Brendan's Garage Sale and find yourself some new tech gadgets!",
        date: 2020 - 9 - 18,
        userId: users[2].id,
      },
      {
        title: "PARTY!",
        location: "1113 Market St, Philadelphia Pa 19107",
        description: "Spend time with friends in good place!",
        date: 2020 - 9 - 18,
        userId: users[3].id,
      },
    ]);
    await Comment.bulkCreate([
      {
        comment_text: "Skynet is coming!",
        userId: users[0].id,
        eventId: event[0].id,
      },
      {
        comment_text: "I for one welcome our new robot overlords.",
        userId: users[1].id,
        eventId: event[0].id,
      },
      {
        comment_text: "I think AI is a great tool for businesses.",
        userId: users[2].id,
        eventId: event[1].id,
      },
      {
        comment_text: "Humans are obsolete.",
        userId: users[0].id,
        eventId: event[1].id,
      },
    ]);
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
  }
};

seedData();

//   console.log("Seeding complete!");
// } catch (error) {
//   console.error("Seeding error:", error);
// } finally {
//   process.exit(0);
// }
// })();
