const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModel = require("./auth-model");
const userModel = require("../users/users-model");
const restrict = require("./authenticate-middleware");
const db = require("../data/dbConfig");
const dotenv = require('dotenv')


const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await userModel.findByUsername(username);

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }
    if (!req.body.username) {
      return res.status(400).json({
        errorMessage: "Please provide username for the user.",
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
        errorMessage: "Please provide password for the user.",
      });
    }
    if (!req.body.role) {
  
      req.body.role = "student"
  
    }
    res.status(201).json(await userModel.add(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const authError = {
    message: "Invalid Credentials",
  };

  try {
    const { username } = req.body;

    const user = await userModel.findByUsername(username);
  
    if (!user) {
      console.log('no user', user)
      return res.status(401).json(authError);
    }

    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log('password valid', passwordValid)
    console.log('req.body.password', req.body.password)
    console.log('user.password', user.password)

    if (!passwordValid) {
      return res.status(401).json(authError);
    }

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
