const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const jsdocConfig = require("./../config/jsdoc");
const dotenv = require("dotenv");
const swaggerSpec = swaggerJSDoc(jsdocConfig);
const swaggerUIOptions = {
  explorer: true,
};

const config_result = dotenv.config();
if (process.env.NODE_ENV != "production" && config_result.error) {
  throw config_result.error;
}

//###[  Routers ]###

const authRouter = require("./auth/auth-router");
const welcomeRouter = require("./welcome/welcome-router");
const usersRouter = require("./users/users-router");
const projectsUsersRouter = require("./projects-users/projects-users-router");
const projectsRouter = require("./projects/projects-router");
const remindersRouter = require("./reminders/reminders-router");
const restrict = require("./auth/authenticate-middleware");

const port = process.env.PORT;
const app = express();

/* app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
); */
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
//app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});
// docs would need to be built and committed
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
);
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

//application routes

app.use("/", welcomeRouter);
app.use("/api/users", restrict("mentor"), usersRouter);
app.use("/api/projects-users", restrict("mentor"), projectsUsersRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", restrict("mentor"), projectsRouter);
app.use("/api/", restrict("mentor"), remindersRouter);

/* app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
}); */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err instanceof createError.HttpError) {
    res.locals.message = err.message;
    res.locals.status = err.statusCode;
    if (process.env.NODE_ENV === "development") {
      res.locals.error = err;
    }
  }
  console.error(err);
  if (process.env.NODE_ENV === "production" && !res.locals.message) {
    res.locals.message = "ApplicationError";
    res.locals.status = 500;
  }
  if (res.locals.status) {
    res.status(res.locals.status || 500);
    const errObject = { error: res.locals.error, message: res.locals.message };
    return res.json(errObject);
  }
  next(err);
});

module.exports = app;
