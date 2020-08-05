const express = require("express");
const userDB = require("./userDb");
const postDB = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  userDB
    .insert(req.body)
    .then((bdRes) => {
      res.status(201).send(bdRes);
    })
    .catch((err) => res.status(500).end());
});

router.post("/:id/posts", validatePost, (req, res) => {
  req.body.user_id = req.params.id;
  postDB
    .insert(req.body)
    .then((dbRes) => {
      res.status(201).send(dbRes).end();
    })
    .catch((err) => res.status(500).end());
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

router.delete("/:id", validateUserId, (req, res) => {
  userDB
    .remove(req.user.id)
    .then((dbRes) => {
      res.status(200).send("Deleted successfully!");
    })
    .catch((err) => res.status(500).end());
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
  if (!req.body) res.status(400).json({ message: "missing user data" }).end();
  if (!req.body.name)
    res.status(400).json({ message: "missing required name field" }).end();
  next();
}

function validatePost(req, res, next) {
  if (!req.body) res.status(400).json({ message: "missing post data" }).end();
  if (!req.body.text)
    res.status(400).json({ message: "missing required text field" }).end();
  // if (!req.body.user_id)
  //   res.status(400).json({ message: "missing required user_id field" }).end();
  next();
}

module.exports = router;
