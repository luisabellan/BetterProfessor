const db = require("../../data/db-config");

// // retrives a user by their username
// function findByUsername(username) {
//   return db('users').where({ username }).first();
// }

//  return a list of all users in the database.

function getProjectsUsers() {
  return db("projects_users").select("project_id", "user_id");
}

// resolves to  Resolve to a single user object (or null)

function findById(project_id) {
  return db("projects_users")
    .select("project_id", "user_id")
    .where({ project_id })
    .first();
}
async function validateProject(project_id) {
  findById(project_id)
    .then((project) => {
      if (!project) {
        console.log(user);
        return res.status(404).json({
          message: "The project with the specified project id does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// CREATE USER
async function add(project_user) {
  await db("projects_users")
    .insert(project_user)
    .then((ids) => {
      return findById(ids[0]);
    });
}

//UPDATE USER
async function update(project_id, data) {
  await db("projects_users").where({ project_id }).first().update(data);
  return findById(id);
}

// DELETE USER
function remove(project_id) {
  return db("projects_users").where({ project_id }).first().delete();
}

module.exports = {
  getProjectsUsers,
  findById,
  add,
  remove,
  update,
  validateProject,
};
