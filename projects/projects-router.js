const express = require("express");

const Projects = require("./projects-model.js");

const router = express.Router();

// GET /api/projects
router.get("/projects", (req, res) => {
  console.log("/api/projects")
  Projects.getProjects()
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



  })


  // GET Projects by user id
  router.get("/users/:id/projects", async (req, res) => {
    const { id } = req.params;

     Projects.getProjectList(id)
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



  });

  // CREATE -  POST  -
router.post("/projects",  (req, res) => {
   if (!req.body.name || !req.body.due_date) {
    console.log(res.body)
     return res.status(400).json({
      errorMessage: "Please provide name and due_date for the project.",
    });
  } 
  

   Projects.create(req.body, req.params.id)
    .then((project) => {
    return  res.status(201).json(project);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "There was an error while saving the project to the database",
      });
    });
});











module.exports = router;
