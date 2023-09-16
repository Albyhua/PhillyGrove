const router = require("express").Router();
const sequelize = require("../config/connection");
const { Event, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// localhost:3001/dashboard/


router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Event }],
    });

    const user = userData.get({ plain: true });

    res.render('userdashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




// router.get("/", withAuth, async (req, res) => {
//   Event.findAll({
//     where: {
//       user_id: req.session.user_id,
//     },
//     attributes: ["id", "title", "location", "date", "description"],
//     include: [
//       {
//         model: Comment,
//         attributes: ["id", "comment_text", "event_id", "user_id", "created_at"],
//         include: {
//           model: User,
//           attributes: ["name"],
//         },
//       },
//       {
//         model: User,
//         attributes: ["name"],
//       },
//     ],
//   })
//     .then((eventData) => {
//       const events = eventData.map((event) => event.get({ plain: true }));
//       res.render("userdashboard", {
//         events,
//         loggedIn: true,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get("/edit/:id", withAuth, (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "location", "date", "description"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((eventData) => {
      if (!eventData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const event = eventData.get({ plain: true });
      res.render("edit-event", {
        event,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/create/", withAuth, (req, res) => {
  res.render("create-event", {
    loggedIn: true,
  });
});

module.exports = router;
