
const db = require('../data/dbConfig.js');
const Users = require('../users/users-model');

/* // returns  all recipes in the system that utilize a single ingredient 
// TODO: Not working right now
function getUsersWithProjects(project_id) {
  const users = db('p.name as project_name', 'u.name  as user_name')
    .join('project as p')
    .select('p.name as project_name', 'u.name as user_name')

 
  return users.where({ project_id })
}
*/

// returns a list of messages for a user
/* SELECT r.id, s.message 
FROM [user] AS u
JOIN [reminder] AS r
ON u.id = r.id; */

function getMessages(user_id) {
  return db('user as u')
    .select('r.id', 'r.message')
    .join('reminders as r', 'u.id', 'r.id')
    .where({ 'u.id': user_id });
}

function getReminders() {
  return db('reminders')
}
// returns a list of reminder s and user information 
/* SELECT r.id, r.message, r.date, r.time 
FROM [reminder] AS r
JOIN [users] AS u
ON r.id = u.id; */

function getRemindersById(id) {
  return db('reminders as r').where({ 'r.user_id' : id }) 
}

function deleteReminder(id) {
  return db('reminders').where({ 'id': id }).first().del()
}


// CREATE REMINDER
async function addReminder(reminder) {
  await db('reminders').insert(reminder)
  .then(ids => {
    return Users.findById(ids[0]);
  });
}

// resolves to  Resolve to a single user object (or null)

function findById(id) {
  return db('reminders').where({ id }).first();
}
// UPDATE REMINDER
function updateReminder(data,id){
  return db('reminders').where({id}).first().update(data)
}


 /*  const { id } = req.body
  if (myReminder) {
    myReminder.user_id = id
    
  } */

module.exports = {
  addReminder,
  deleteReminder,
  getReminders,
  getRemindersById,
  getMessages,
  updateReminder,
  findById

}

