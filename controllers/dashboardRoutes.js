const router = require("express").Router();
const sequelize = require("../config/connection");
const { Event, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// localhost:3001/dashboard/
router.get("/", (req, res) => {
  Event.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "location", "date", "description"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "event_id", "user_id", "created_at"],
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
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", {
        posts,
        logged_in: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
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
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render("edit-post", {
        post,
        logged_in: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/new", withAuth, (req, res) => {
  res.render("add-event", {
    logged_in: true,
  });
});

module.exports = router;
