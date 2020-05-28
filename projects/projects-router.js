const express = require("express");

const Projects = require("./projects-model");

const router = express.Router();

// GET /api/projects
router.get("/projects/", async (req, res) => {
  console.log("/api/projects/")
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


// GET Projects and user information
router.get("/projects/users", async (req, res) => {
  try {
    Projects.getProjectList()
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
    console.log(error)

    return res.status(500).json({
      error: "There was an error while saving the comment to the database",
    })

  }


})


// DELETE PROJECT
router.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find reminder with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete reminder' });
  });
});

// CREATE PROJECT

router.post('/projects',  (req, res) => {

  let {name, due_date} = req.body 

  if (!name || !due_date) {
    res.status(400).json({ "message": "Please input a project name and a due date" })
  }
  const project = req.body
  project = {
    name: project.name, 
    due_date: project.due_date,
    user_id: project.user_id
  } 

   Projects.create(project)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new project' });
    });
});






module.exports = router;
