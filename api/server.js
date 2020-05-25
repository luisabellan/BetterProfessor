const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router");
//const jokesRouter = require('../jokes/jokes-router.js');
const dotenv = require("dotenv");

const server = express();
const port = 3300;

server.use(helmet());
server.use(cookieParser());
server.use(express.json());

server.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
//server.use("/jokes", jokesRouter)

server.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to our API!",
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});

module.exports = server;
