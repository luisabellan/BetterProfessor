
const db = require('../data/dbConfig.js');

// returns  all users in the system that utilize a single project 
// TODO: Not working right now
function getUsersWithProjects(projects_id) {
    const users =  db('p.name as project_name', 'u.name  as user_name')
    .join('project as i')
    .select('p.name as project_name','u.name as user_name')
    
    
    return users.where({project_id})
}


  module.exports = {
    getUsersWithProjects
}



  module.exports = {

    getUsersWithProjects

}

