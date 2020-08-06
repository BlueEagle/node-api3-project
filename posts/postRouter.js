const express = require("express");
const postDB = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  postDB
    .get()
    .then((dbRes) => {
      res.send(dbRes);
    })
    .catch((err) => res.status(500).end());
});

router.get("/:id", validatePostId, (req, res) => {
  res.send(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  postDB
    .remove(req.post.id)
    .then((dbRes) => {
      res.status(200).end();
    })
    .catch((err) => res.status(500).end());
});

router.put("/:id", validatePostId, validatePost, (req, res) => {
  postDB
    .update(req.post.id, req.body)
    .then((dbRes) => {
      console.log(dbRes);
      res.send(dbRes);
    })
    .catch((err) => res.status(500).end());
});

// custom middleware

function validatePostId(req, res, next) {
  postDB
    .getById(req.params.id)
    .then((dbRes) => {
      if (dbRes) {
        req.post = dbRes;
        next();
      } else {
        res.status(400).json({ message: "invalid post id" });
      }
    })
    .catch((err) => res.status(500).end());
}

function validatePost(req, res, next) {
  if (!req.body) res.status(400).json({ message: "missing post data" }).end();
  if (!req.body.text)
    res.status(400).json({ message: "missing required text field" }).end();
  next();
}

module.exports = router;
