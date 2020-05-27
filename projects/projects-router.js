const express = require("express");

const Projects = require("./projects-model.js");

const router = express.Router();

// /api/projects
router.get("/projects", (req, res) => {
  console.log("/api/projects")
  Projects.getProjects()
    .then((projects) => {
      if (projects.length) {
        console.log("getProjects - if");

        res.status(200).json(projects);
      } else {
        console.log("getProjects - else");

        res
          .status(404)
          .json({ message: "Could not find project for given project" });
      }

    });
// GET Projects by user id
router.get("/users/:id/projects", (req, res) => {
  const { id } = req.params;

  Projects.getUsersWithProjects(id)
    .then((users) => {
      if (users.length) {
        console.log("getUsersWithProjects - if");

        res.status(200).json(users);
      } else {
        console.log("getUsersWithProjects - else");

        res
          .status(404)
          .json({ message: "Could not find project for given project" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get users's projects" });
    });
  


  });

/* 
// CREATE PROJECT
router.post('/projects', (req, res) => {
  const projectData = req.body;

  Projects.add(projectData)
  .then(project => {
  console.log("POST /api/projects - added")

    res.status(201).json(project);
  })
  .catch (err => {
  console.log("POST /api/projects - error")

    res.status(500).json({ message: 'Failed to create new project' });
  });
}); */





});

module.exports = router;
