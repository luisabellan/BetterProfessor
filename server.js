//require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./auth/auth-router");
const welcomeRouter = require("./welcome/welcome-router");
const usersRouter = require("./users/users-router");
const projectsUsersRouter = require("./projects-users/projects-users-router");
const projectsRouter = require("./projects/projects-router");
const remindersRouter = require("./reminders/reminders-router");
const restrict = require("./auth/authenticate-middleware");

const port = process.env.PORT;
const server = express();

server.use(helmet());
server.use(cookieParser());
server.use(express.json());

server.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
server.use("/", welcomeRouter);
server.use("/api/users", restrict("mentor"), usersRouter);
server.use("/api/projects-users", restrict("mentor"), projectsUsersRouter);
server.use("/api/auth", authRouter);
server.use("/api/projects", restrict("mentor"), projectsRouter);
server.use("/api/", restrict("mentor"), remindersRouter);

server.get("/", (req, res, next) => {
  console.log(req.body);

  res.status(200).json({
    message: "Welcome to our API!",
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;
