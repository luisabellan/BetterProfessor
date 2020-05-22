const express = require('express');

const Reminders = require('../reminders/reminders-model');
const Users = require('../users/userseminders-model');

const router = express.Router();

// Returns reminders for all users (ordered by user_id)
 router.get('/',  (req, res) => {
  
  Reminders.getReminders()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});
 


// GET REMINDERS
// /api/users/:id/reminders
router.get('/:id/reminders', (req, res) => {
  const {id} = req.params

  Reminders.getReminders(id)
  .then(reminders => {
    if (reminders) {
      res.status(200).json(reminders);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }

  })
})


//UPDATE REMINDER
router.post('/', (req, res) => {
  const reminderData = req.body;

  Reminders.add(reminderData)
  .then(user => {
    res.status(201).json(user);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new user' });
  });
});

// CREATE REMINDER FOR USER
router.post('/:id/reminders', (req, res) => {
  const reminderData = req.body;
  const { id } = req.params; 

  Users.findById(id)
  .then(user => {
    if (user) {
      Reminders.addReminder(reminderData, id)
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

// DELETE REMINDER
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Reminders.remove(id)
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

//TODO delete message
router.delete('/:user_id/message/:message_id', (req, res) => {
  const { user_id, message_id } = req.params;

  Users.deleteMessage(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find message with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete message' });
  });
});


module.exports = router;