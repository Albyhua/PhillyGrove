const router = require("express").Router();
const sequelize = require("../config/connection");
const { Event, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// localhost:3001/dashboard/
router.get("/", (req, res) => {
  Event.findAll({
    // where: {
    //   user_id: req.session.user_id,
    // },
    // attributes: ["id", "title", "location", "date", "description"],
    // include: [
    //   {
    //     model: Comment,
    //     attributes: ["id", "comment_text", "event_id", "user_id", "created_at"],
    //     include: {
    //       model: User,
    //       attributes: ["username"],
    //     },
    //   },
    //   {
    //     model: User,
    //     attributes: ["username"],
    //   },
    // ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("userdashboard", {
        layout: "dashboard",
        posts,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/event", async(req, res) => {
  // find single Event by PK, inlude User
  // store in variable and pass to res.render after layout declaration

  res.render("event.handlebars", {layout: "dashboard"})
})

router.get("/edit/:id", withAuth, (req, res) => {
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
          model: User,
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
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render("edit-post", {
        post,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/create/", withAuth, (req, res) => {
  res.render("create-post", {
    loggedIn: true,
  });
});

module.exports = router;
