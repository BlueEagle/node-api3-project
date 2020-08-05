const express = require("express");
const helmet = require("helmet");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use("/posts", postRouter);
server.use("/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `Client: ${req.ip} has made a ${req.method} request to ${req.path}`
  );
  next();
}

module.exports = server;
