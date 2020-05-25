
const db = require('../data/dbConfig.js');

// returns  all users in the system that are working on a single project 
// TODO: Not working right now

function getUsersWithProjects(project_id) {
    const users =  db('p.name as project_name', 'u.name  as user_name')
    .join('project as p')
    .select('p.name as project_name','u.name as user_name',)
    
    
    return users.where({project_id})

}


  module.exports = {

    getUsersWithProjects

}

