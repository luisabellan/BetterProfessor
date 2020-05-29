require('dotenv').config()
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const projectsRouter = require("./projects/projects-router");
const remindersRouter = require("./reminders/reminders-router");
const restrict = require("./auth/authenticate-middleware");

//const jokesRouter = require('../jokes/jokes-router.js');

const port = process.env.PORT || 4000;
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
server.use("/api/users",restrict('mentor'), usersRouter);
server.use("/api/auth", authRouter); 
server.use("/api/projects",restrict('mentor'), projectsRouter);
server.use("/api/reminders",restrict('mentor'), remindersRouter);


server.get("/", (req, res, next) => {
console.log(req.body)

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
