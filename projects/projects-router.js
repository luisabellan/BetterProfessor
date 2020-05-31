const express = require("express");
// const dotenv = require("dotenv");
const Projects = require("./projects-model");
const restrict = require("../auth/authenticate-middleware");
const db = require("../data/dbConfig");

const router = express.Router();

// GET /api/projects
router.get("/", restrict(), async (req, res) => {
  console.log("/api/projects/");
  await Projects.getProjects()
    .then((projects) => {
      if (projects) {
        console.log("getProjects - if");

        res.status(200).json(projects);
      } else {
        console.log("getProjects - else");

        res
          .status(404)
          .json({ message: "Could not find project for given project" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to get users's projects" });
    });
});

//  GET projects by id

router.get("/:id", restrict(), (req, res) => {
  console.log("/api/projects/1");
  Projects.findById(req.params.id)
    .then((project) => {
      if (project) {
        console.log("getProjects - if");

        res.status(200).json(project);
      } else {
        console.log("getProjects - else");

        res
          .status(404)
          .json({ message: "Could not find project for given project" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to get users's projects" });
    });
});

// GET Projects and user information
router.get("/users", async (req, res) => {
  try {
    await Projects.getProjectList()
      .then((users) => {
        if (users) {
          console.log("getProjectList - if");

          return res.status(200).json(users);
        } else {
          console.log("getProjectList - else");

          return res
            .status(404)
            .json({ message: "Could not find project for given user" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Failed to get users's projects" });
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "There was an error while saving the comment to the database",
    });
  }
});

// DELETE PROJECT
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find reminder with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete reminder" });
    });
});

// CREATE PROJECT
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { name } = req.body;
    const project = await Projects.findByProjectName(name);

    if (project) {
      return res.status(409).json({
        message: "That project name is already taken",
      });
    }
    if (!req.body.name) {
      return res.status(400).json({
        errorMessage: "Please provide name for the project.",
      });
    }
    if (!req.body.due_date) {
      return res.status(400).json({
        errorMessage: "Please provide due_date for the project.",
      });
    }

    res.status(201).json(await Projects.create(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
