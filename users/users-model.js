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

// returns a list of reminder by reminder messages for preparing a user
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



async function add(user) {
    await db('users').insert(user)
    .then(ids => {
      return findById(ids[0]);
    });
}


function remove(id) {
    return db('users').where({id}).first().del()

}

module.exports = {
    getUsers,
    getProjectsList,
    getReminders,
    findById, 
    add,
    remove,
}