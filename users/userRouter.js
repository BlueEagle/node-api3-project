const express = require("express");
const userDB = require("./userDb");
const postDB = require("../posts/postDb");

const router = express.Router();

router.post("/", (req, res) => {
  res.send("users? Hello there.");
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  userDB
    .get()
    .then((dbRes) => {
      res.send(dbRes);
    })
    .catch((err) => res.status(500).end());
});

router.get("/:id", validateUserId, (req, res) => {
  res.send(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  postDB
    .get()
    .then((dbRes) => {
      res.send(dbRes.filter((post) => post.user_id === req.user.id));
    })
    .catch((err) => res.status(500).end());
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  userDB
    .getById(req.params.id)
    .then((dbRes) => {
      if (dbRes) {
        req.user = dbRes;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch((err) => res.status(500).end());
}

function validateUser(req, res, next) {
  // do your magic!
}

module.exports = router;
