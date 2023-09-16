const router = require("express").Router();
const sequelize = require("../config/connection");
const { Event, User, Comment } = require("../models");
const withAuth = require("../utils/auth");
// base url localhost:3001/
router.get("/", async (req, res) => {
  const dbPostData = await Event.findAll({
    attributes: [
      "id",
      "title",
      "location",
      "date",
      "date_created",
      "description",
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["name"],
        },
             },
             { model: User}
    ],
  })
    .then((dbPostData) => {
      const events = dbPostData.map((event) => event.get({ plain: true }));
      res.render("homepage", {
        events,
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/event/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {model: Comment}
      ],
    });

    const event = eventData.get({ plain: true });

    res.render('event', {
      ...event,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login", { layout: "main" });
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("*", (req, res) => {
  res.status(404).send("404 Error!");
});


module.exports = router;

