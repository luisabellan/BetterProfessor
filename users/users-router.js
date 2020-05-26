const express = require('express');

const Users = require('./users-model.js');
const Projects = require('../projects/projects-model.js');

const router = express.Router();

// all users (without details about projects or reminders)
router.get('/users',  (req, res) => {
  
  Users.getUsers()
    .then(users => {
    console.log("/users")
    res.status(200).json(users);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

// /api/users/:id/projects

router.get('/users/:id', (req, res) => {
  const { id } = req.params;

  Users.findById(id)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      console.log("get by id")
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

// /api/users/:id/projects-list

router.get('/users/:id/projects-list', (req, res) => {
  const {id} = req.params

  Users.getProjectsList(id)
  .then(projects=>{
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }

  })
})




// CREATE USER
router.post('/users', (req, res) => {
  const userData = req.body;

  Users.add(userData)
  .then(user => {
    res.status(201).json(user);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new user' });
  });
});

router.post('/:id/reminders', (req, res) => {
  const reminderData = req.body;
  const { id } = req.params; 

  Users.findById(id)
  .then(user => {
    if (user) {
      Users.addReminder(reminderData, id)
      .then(reminder => {
        res.status(201).json(reminder);
      })
    } else {
      //console.log("here")
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new reminder' });
  });
});

// UPDATE USER
router.put("/users/:id", (req, res) => {
	if (!req.body.username) {
		return res.status(400).json({
			errorMessage: "Please provide username for the user.",
		});
	}
	if (!req.body.role) {
    
    req.body.role = "student"
		
	}

	Users.validateUser(req.params.id)

	Users.update(req.params.id, req.body)
		.then((user) => {
		//	console.log(res);

			return res.status(200).json(user);
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).json({
				error: "The user information could not be modified.",
			});
		});

router.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  Users.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});
})

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
module.exports = router;