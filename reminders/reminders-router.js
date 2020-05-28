const express = require('express');

const Reminders = require('../reminders/reminders-model');
const Users = require('../users/users-model');

const router = express.Router();

// Returns reminders for all users (ordered by user_id)
// GET REMINDERS
//GET /api/reminders
 router.get('/reminders', (req, res) => {
  Reminders.getReminders()
  .then(reminders => {
    res.status(200).json(reminders);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get reminders' });
  });
});
 
// Returns reminders by user id
// GET REMINDERS
//GET /api/users/:id/reminders
router.get('/users/:id/reminders', (req, res) => {
  const {id} = req.params

  Reminders.getRemindersById(id)
  .then(reminders => {
    res.status(200).json(reminders);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get reminders' });
  });
});




// CREATE REMINDER BY USER ID
//POST /api/users/:id/reminders

router.post('/users/:id/reminders', (req, res) => {
  
  
 
const reminderData  = {
  message:req.paramsmessage,
  send_date:req.paramssend_date,
  time:req.paramstime,
  user_id: req.params.id
}

  Users.findById(id)
  .then(user => {
    if (user) {
      Reminders.addReminder(reminderData)
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
// UPDATE REMINDER BY USER ID
//UPDATE /api/users/:id/reminders

router.put('/reminders/:id/', (req, res) => {
  
  const changes= {
    message: req.body.message,
    send_date: req.body.send_date,
    time:req.body.time,
    user_id:req.body.user_id

  }
 

  const {id} = req.params
  
    Reminders.findById(id)
    .then(reminder => {
      if (reminder) {
        Reminders.updateReminder(changes, id)
        .then(reminder => {
          res.status(201).json(reminder);
        })
      } else {
        res.status(404).json({ message: 'Could not find reminder with given id.' })
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new reminder' });
    });
  });

// DELETE REMINDER
router.delete('/reminders/:id/', (req, res) => {
  const { id } = req.params;

  Reminders.deleteReminder(id)
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

/* //TODO delete message
router.delete('/users/user_id/message/:message_id', (req, res) => {
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
}); */


module.exports = router;