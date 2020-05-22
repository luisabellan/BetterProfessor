# Better Professor App - BackEnd #

## API ##

*GET /api/* : Welcome to our API message.

### Users ###

*POST /api/users/*: Receives data from the backend to add a user. Constraints: usernames must be unique. Adding the role of a student to a user is not necessary as it defaults to students ( a toggle in the form on the front-end set to student by default would be appropriate here :smirk: ). For adding a mentor, the "role":"mentor" must be specified. No other roles are available.

*GET /api/users* : Returns the list of users (students and mentors alike). 

*GET /api/users/:id* : Returns a user by their ID.


*UPDATE /api/users* : Updates data for a  user by their ID (only mentors can update other users' details).

*DELETE /api/users* : Deletes users by their ID a long with their related data (projects and reminders).

### Reminders ###

*GET /api/users/:id/reminders* : Returns the list of reminders for a user (students and mentors) sorted by users' IDs.

### Projects ###

*GET /api/reminders* : Returns the list of reminders for users (students and mentors) sorted by users' IDs.

 ***............work in progress...........***

:hammer: :hammer: :hammer: :construction_worker: :construction_worker: :construction_worker: :hammer: :hammer: :hammer:

