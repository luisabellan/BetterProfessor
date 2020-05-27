const db = require('../data/dbConfig.js');

// retrives a user by their username
function findByUsername(username) { 
  return db('users').where({ username }).first();
}


//  return a list of all users in the database.

function getUsers() {
    return db('users')
}

// resolves to  Resolve to a single user object (or null)

function findById(id) {
    return db('users').where({ id }).first();
}

// returns a list of all projects and quantities for a given user

/* SELECT  i.name as project_name, i.quantity 
FROM [user] AS r
JOIN [project] AS i; */

function getProjectsList(user_id) {
    return db('users as u')
    .join('projects as p')
    .select('p.name as project_name', 'p.due_date', 'p.users_ids')
    .where({'u.id': user_id})
    
}

// returns a list of reminders by reminder messages for preparing a user
/* SELECT r.id, s.messages 
FROM [user] AS r
JOIN [reminder] AS s
ON r.id = s.id; */

function getReminders(user_id) {
    return db('users as u')
    .select('r.message', 'r.date', 'r.time')
    .join('reminder as r', 'u.id', 'r.id')
    .where({'u.id': user_id})
}


// CREATE USER
async function add(user) {
    await db('users').insert(user)
    .then(ids => {
      return findById(ids[0]);
    });
}

//UPDATE USER
async function update(id, data) {
    await db("users").where({ id }).first().update(data);
    return findById(id);
  }
  
async function validateUser(id) {
    findById(id)
      .then((user) => {
        if (user.length === 0) {
          return res.status(404).json({
            message: "The user with the specified ID does not exist.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function remove(id) {
    return db("users").where({ id }).delete()
  }

module.exports = {
    getUsers,
    getProjectsList,
    findById, 
    add,
    remove,
    validateUser,
    update,
    findByUsername
}