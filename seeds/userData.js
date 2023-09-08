
const {User} = require('../models')

const userData = [
    {
    name:"Angela",
    email: "angela@gmail.com",
    password: "password12345",
    event_id: 1

  },
  {
    name: "Brendan",
    email: "brendan@gmail.com",
    password: "password12345",
    event_id: 1
  },
  {
    name: "Albert",
    email: "albert0@hotmail.com",
    password: "password12345",
    event_id: 1
  },
  {
    name: "Antonio",
    email: "antonio@hotmail.com",
    password: "password12345",
    event_id: 1
  },
  {
    name: "Dimitry",
    email: "dimitry@yahoo.com",
    password: "password12345",
    event_id: 1
  }

]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;