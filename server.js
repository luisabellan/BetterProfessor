const express = require('express');

const UsersRouter = require('./users/users-router.js');
//const ProjectsRouter = require('./projects/projects-router.js');

const server = express();

server.use(express.json());

server.use('/api/users', UsersRouter);
//server.use('/api/projects', ProjectsRouter);

module.exports = server;