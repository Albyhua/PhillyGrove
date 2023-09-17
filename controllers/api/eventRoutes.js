const router = require("express").Router();
const { Event, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "location", "date", "description"],
    order: [["date", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a single post
router.get("/:id", (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "location", "date", "description"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No event found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Get all posts by a user
router.get("/user/:user_id", (req, res) => {
  Post.findAll({
    where: {
      user_id: req.params.user_id,
    },
    attributes: ["id", "title", "location", "date", "description"],
    order: [["date", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData.length === 0) {
        res.status(404).json({ message: "No events found for this user" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a post
router.post("/", withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post
router.put("/:id", withAuth, (req, res) => {
  Event.update(
    {
      title: req.body.title,
      location: req.body.location,
      date: req.body.date,
      description: req.body.description,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No event found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a post
router.delete("/:id", withAuth, (req, res) => {
  Event.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No event found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Export the router
module.exports = router;
