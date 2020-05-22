const db = require('../data/db-config.js');

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
    return db('user as r')
    .join('project as i')
    .select('i.name as project_name', 'i.due_date')
    .where({'r.id': user_id})
    
}





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
    return db('users').where({id}).first().del()

}

module.exports = {
    getUsers,
    getProjectsList,
    findById, 
    add,
    remove,
    validateUser,
    update
}