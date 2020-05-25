const express = require('express');
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require('dotenv')

const server = express()
const port = process.env.PORT

server.use(helmet())
server.use(cookieParser())
server.use(express.json())

server.use(cors({
	credentials: true,
	origin: "http://localhost:3000",
}))

const UsersRouter = require('./users/users-router.js');
const WelcomeRouter = require('./welcome/welcome-router.js');

const ProjectsRouter = require('./projects/projects-router.js');
const RemindersRouter = require('./reminders/reminders-router.js');




server.use(express.json());

server.use('/', WelcomeRouter)
server.use('/api/users/', UsersRouter);
server.use('/api/users/', RemindersRouter);
server.use('/api/users/', ProjectsRouter);

/* TODO change and add these once /login and /register are done
 server.use("/auth", authRouter)
server.use("/users", usersRouter)
server.use("/jokes", jokesRouter) */

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
module.exports = server;