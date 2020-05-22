
const db = require('../data/db-config.js');

// returns  all recipes in the system that utilize a single ingredient 
// TODO: Not working right now
function getUsersWithProjects(project_id) {
    const users =  db('p.name as project_name', 'u.name  as user_name')
    .join('project as p')
    .select('p.name as project_name','u.name as user_name')
    
    
    return users.where({project_id})
}


  module.exports = {
    getUsersWithProjects
}

