const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModel = require("./auth-model");
const userModel = require("../users/users-model");
const restrict = require("./authenticate-middleware");
const db = require("../data/dbConfig");
// const dotenv = require('dotenv')

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    // const { username, password, role } = req.body;
    let credentials = req.body;
    let user = await userModel.findByUsername(credentials.username);

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }

    if (!credentials.username) {
      return res.status(400).json({
        errorMessage: "Please provide username for the user.",
      });
    }
    if (!credentials.password) {
      return res.status(400).json({
        errorMessage: "Please provide password for the user.",
      });
    }
    if (!credentials.role) {
      credentials.role = "student";
    }

    let hash = await bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;

    res.status(201).json(await userModel.add(credentials));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const authError = {
    message: "Invalid Credentials",
  };

  try {
    let credentials = req.body;
    let user = await userModel.findByUsername(req.body.username);
    //console.log(await userModel.findByUsername(credentials.username));

    // find the user in the database by it's username then
    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
      return res.status(401).json({ error: "Incorrect credentials" });
    }
    // console.log('req.body.password', password)
    // console.log('user.password', user.password)

    // create a new session in the database
    const session = await authModel.add({
      user_id: user.id,
      // a SQLite trick to set a date in the future
      expires: db.raw("DATETIME('now', 'localtime', '+1 hour')"),
    });

    // add the session details and other user details to the token payload
    const token = jwt.sign(
      {
        sessionId: session.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);
    res.json({
      message: `Welcome ${user.username}!`,
    });
  } catch (err) {
    next(err);
  }
});
// restrict()
router.get("/logout", restrict(), async (req, res, next) => {
  try {
    await authModel.deleteById(req.session.id);

    // instruct the client to delete the cookie (but it's  not required to)
    res.cookie("token", "", { maxAge: 0 });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
