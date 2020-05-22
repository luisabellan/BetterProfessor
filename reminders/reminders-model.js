
const db = require('../data/db-config.js');

// returns  all recipes in the system that utilize a single ingredient 
// TODO: Not working right now
function getUsersWithProjects(project_id) {
  const users = db('p.name as project_name', 'u.name  as user_name')
    .join('project as p')
    .select('p.name as project_name', 'u.name as user_name')


  return users.where({ project_id })
}
// returns a list of reminder by reminder messages for preparing a user
/* SELECT r.id, s.messages 
FROM [user] AS u
JOIN [reminder] AS r
ON r.id = u.id; */

function getReminders(user_id) {
  return db('reminders as r')
    .select('r.message', 'r.date', 'r.time')
    .join('reminders as r', 'u.id', 'r.id')
    .where({ 'u.id': user_id })
}

function deleteReminder(id) {
  return db('reminders as r')
    .select('r.message', 'r.date', 'r.time')
    .where({ 'r.id': r.id }).del()
}

async function add(user) {
  await db('users').insert(user)
  .then(ids => {
    return findById(ids[0]);
  });
}


// CREATE REMINDER
async function addReminder(reminder) {

  const { id } = req.body
  if (myReminder) {
    myReminder.user_id = id
    
  }
  const myReminder = await db('reminders').insert(reminder)
  .then(ids => {
    return findById(ids[0]); // TODO add crud operations functions for reminders like findById()
  });

}

module.exports = {
  addReminder,
  deleteReminder,
  getReminders,
  getUsersWithProjects,
}

