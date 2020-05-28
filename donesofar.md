# Done so far #

## Endpoints ##

### Users ###

[x] POST /api/auth/register (Create user) --> new
[x] GET /api/users
[x] GET /api/users/:id (found)
[x] GET /api/users/:id (not found)
[x] DELETE /api/users/:id
[x] UPDATE /api/users/:id

### Auth ###

[x] POST /api/auth/register (Register)
[] POST /api/auth/register (Login )
[] POST /api/auth/login (Login - invalid credentials)
[] POST /api/auth/login (Login - valid credentials)


### Projects ###

[] POST /api/projects
[x] GET /api/projects/ (Get projects)
[x] GET /api/projects/:id (Get projects by id)
[x] GET /api/projects/users (Get projects and user information)

### Reminders ###
[] POST /api/reminders
[x] GET /api/reminders/ (Get reminders)
[x] GET /api/users/:id/reminders/ (Get reminders by user id)
[x] DELETE /api/reminders/:id (Delete reminder by user id)
[x] UPDATE /api/users/:id/reminders (update reminder by reminder id)
