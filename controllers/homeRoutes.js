const router = require("express").Router();
const sequelize = require("../config/connection");
const { Event, User, Comment } = require("../models");
// base url localhost:3001/
router.get("/", async(req, res) => {
  const dbPostData =await Event.findAll({
    attributes: ["id", "title", "location", "date", "date_created","description"],
    // include: [
      // {
      //   model: Comment,
      //   attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
      //   include: {
      //     model: User,
      //     attributes: ["username"],
      //   },
      // },
    //   {
    //     mode: User,
    //     attributes: ["username"],
    //   },
    // ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        posts,
        // loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/event/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "location", "date", "description"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          mode: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No event found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render("single-event", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login", {layout: "main"});
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("*", (req, res) => {
  res.status(404).send("404 Error!");
});

module.exports = router;
