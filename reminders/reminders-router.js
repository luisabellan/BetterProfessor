const express = require('express');

const Reminders = require('../reminders/reminders-model');

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
 /* // /api/users/:id/messages
router.get('/:id/reminders', (req, res) => {
  const {id} = req.params
 */

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

    ders.findById(id)
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

// UPDATE USER
router.put("/:id", (req, res) => {
	if (!req.body.username) {
		return res.status(400).json({
			errorMessage: "Please provide username for the user.",
		});
	}
	if (!req.body.role) {
    
    req.body.role = "student"
		
	}

	Reminders.validateUser(req.params.id)

	Reminders.update(req.params.id, req.body)
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

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Reminders.remove(id)
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


module.exports = router;