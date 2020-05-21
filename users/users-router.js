const express = require('express');

const Users = require('./users-model.js');

const router = express.Router();

// all users (without details about projects or reminders)
router.get('/',  (req, res) => {
  
  Users.getUsers()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Users.findById(id)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

// /api/users/:id/projects-list

router.get('/:id/projects-list', (req, res) => {
  const {id} = req.params

  Users.getProjectsList(id)
  .then(projects=>{
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }

  })
})

// /api/users/:id/reminders
router.get('/:id/reminders', (req, res) => {
  const {id} = req.params

  Users.getReminders(id)
  .then(reminders => {
    if (reminders) {
      res.status(200).json(reminders);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }

  })
})



router.post('/', (req, res) => {
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
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new reminder' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findById(id)
  .then(user => {
    if (user) {
      Users.update(changes, id)
      .then(updatedScheme => {
        res.json(updatedScheme);
      });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update user' });
  });
});

router.delete('/:id', (req, res) => {
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

module.exports = router;