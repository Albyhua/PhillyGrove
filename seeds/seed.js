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
        date: "2020-9-18",
        userId: users[2].id,
      },
      {
        title: "PARTY!",
        location: "1113 Market St, Philadelphia Pa 19107",
        description: "Spend time with friends in good place!",
        date: "2020-9-18",
        userId: users[3].id,
      },
      {
        title: "Anarchist Reading Group",
        location:"704 South St, Philadelphia, PA 19147",
        date: "2023-10-17",
        description: "Join some anarchists at Wooden Shoe Books at 7:00pm to discuss 'Anarchism and Other Essays' by Emma Goldman, one of the most important figures in the history of Anarchism.",
        user_id: users[0].id,
      },
      {
        title: "Knitting Circle",
        location: "1020 Pine St, Philadelphia, PA 19107",
        date: "2023-9-27",
        description: "Would you like some help and inspiration? You are welcome to attend a knitting group at Yarnphoria at 5:30pm! Bring your project and you will have access to a wide array of tools. Tea and coffee will be served. ",
        user_id: users[4].id,
      },
      {
        title: "Open Mic Night",
        location:"2031 Sansom St, Philadelphia, PA 19103",
        date:"2023-9-30",
        description:"Test out those jokes your partner loves in front of a crowd and see if you really got it! Stop by the Helium Comedy club for an open mic night starting at 8:00pm",
        user_id: users[0].id,
      },
      {
        title:"Wine Tasting",
        location:"1137 Spruce St, Philadelphia, PA 19107",
        date: "2023-10-21",
        description:"Come taste some delicious white, red, and bubbly wines at Tria and help our business decide what is next to join our drink menu!",
        user_id:users[1].id,
      }
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
