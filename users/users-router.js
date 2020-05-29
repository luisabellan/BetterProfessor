const express = require('express');

const Users = require('./users-model.js');

const router = express.Router();

// all users (without details about projects or reminders)
router.get('/', (req, res) => {
console.log(req.body)
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

router.get('/:id', (req, res) => {
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






 // CREATE USER - This is now done from /api/auth/register

router.post('/', (req, res) => {
  console.log(req.body)
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
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new reminder' });
    });
});

// UPDATE USER
router.put("/:id",   (req, res) => {
	Users.update(req.params.id, req.body)
	  .then((user) => {
		res.status(200).json(user);
	  })
	  .catch((error) => {
		next(error);
	  });
  });







// DELETE USER
router.delete('/:id', (req, res, next) => {
  Users.validateUser(req.params.id)
  Users.remove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err))
})



module.exports = router;