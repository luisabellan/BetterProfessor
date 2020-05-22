const express = require('express');

const Projects = require('./project-model.js');

const router = express.Router();

// /api/projects/:id/users
router.get('/:id/users', (req, res) => {
  const { id } = req.params;

  Projects.getUsersWithProjects(id)
  .then(users => {
    if (users.length) {
     // console.log(user)
      
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'Could not find user for given project' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});