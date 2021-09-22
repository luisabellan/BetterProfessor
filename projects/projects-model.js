const db = require("../data/db-config");

//  return a list of all projects in the database.

function getProjects() {
  return db("projects");
}

// returns a list of all projects and due_dates for a given user

/* SELECT p.name as project_name, p.due_date, u.id as user_id, p.id as project_id
FROM  users as u
JOIN projects as p
on  project_id = p.id
JOIN users_projects as up
on  user_id = u.id

ORDER by project_name DESC */

function getProjectList() {
  return db("projects as p")
    .select(
      "p.name as project_name",
      "p.due_date",
      "up.project_id as project_id",
      "up.user_id as user_id"
    )
    .from("users as u")
    .join("projects as p", "project_id", "p.id")
    .join("users_projects as up", "user_id", "u.id")
    .orderBy("project_name", "desc");
}

// resolves to  Resolve to a single project object (or null)

// retrives a project by their id
function findById(id) {
  return db("projects").where({ id }).first();
}

// retrives a project by their name
function findByProjectName(name) {
  return db("projects").where({ name }).first();
}
function remove(id) {
  return db("projects").where({ id }).first().del();
}
// returns  all users in the system that utilize a single project
// TODO: Not working right now
function getUsersWithProjects(id) {
  const users = db("p.name as project_name", "u.name  as user_name")
    .join("project as p")
    .select("p.name as project_name", "u.name as user_name");

  return users.where({ "user.id": id });
}

// CREATE PROJECT
async function create(project) {
  await db("projects")
    .insert(project)
    .then((ids) => {
      return findById(ids[0]);
    });
}

module.exports = {
  getProjects,
  create,
  getProjectList,
  findById,
  remove,
  getUsersWithProjects,
  findByProjectName,
};
