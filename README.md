# Better Professor App - BackEnd #

## API ##

*GET /api/* : Welcome to our API message.

*POST /api/users/*: Receives data from the backend to add a user. Constraints: usernames must be unique. Adding the role of a student to a user is not necessary as it defaults to students ( a toggle in the form on the front-end set to student by default would be appropriate here :smirk: ). For adding a mentor, the "role":"mentor" must be specified. No other roles are available.

*GET /api/users* : Returns the list of users (students and mentors alike). 

*GET /api/users/:id* : Returns a user by their ID.

*GET /api/reminders* : Returns the list of reminders for users (students and mentors).

 ***............work in progress...........***

:hammer: :hammer: :hammer: :construction_worker: :construction_worker: :construction_worker: :hammer: :hammer: :hammer:

