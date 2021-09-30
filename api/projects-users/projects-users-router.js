const express = require("express");

const projectsUsers = require("./projects-users-model.js");
const restrict = require("../auth/authenticate-middleware");

const router = express.Router();

// all users (without details about projects or reminders)
router.get("/", restrict("mentor"), (req, res) => {
  console.log(req.body);
  projectsUsers
    .getProjectsUsers()
    .then((users) => {
      console.log("/users");
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get project_id and user_id" });
    });
});

// /api/users/:id/
// GET /api/users/:id/ users by id
router.get("/:id", restrict("mentor"), (req, res) => {
  const { id } = req.params;

  projectsUsers
    .findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        console.log("get by id");
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

// UPDATE USER
// /api/users/:id/
// UPDATE /api/users/:id/ users by id
router.put("/:id", (req, res) => {
  projectsUsers
    .update(req.params.id, req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

// DELETE USER

// /api/users/:id/
// DELETE /api/users/:id/ users by id
router.delete("/:id", restrict(), (req, res, next) => {
  //projectsUsers.validateUser(req.params.id)
  projectsUsers
    .remove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

module.exports = router;
