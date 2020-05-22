
const db = require('../data/db-config.js');

// returns  all recipes in the system that utilize a single ingredient 
// TODO: Not working right now
function getUsersWithProjects(project_id) {
    const users =  db('p.name as project_name', 'u.name  as user_name')
    .join('project as p')
    .select('p.name as project_name','u.name as user_name')
    
    
    return users.where({project_id})
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
// returns a list of step by step instructions for preparing a recipe
/* SELECT r.id, s.instructions 
FROM [recipe] AS r
JOIN [step] AS s
ON r.id = s.id; */

function getMessages(user_id) {
  return db('user as u')
  .select('u.id', 'r.messages')
  .join('reminder as r', 'u.id', 'r.id')
  .where({'u.id': user_id})
}

  module.exports = {
    addReminder,
    getReminders,
    getUsersWithProjects,
    getMessages
}

