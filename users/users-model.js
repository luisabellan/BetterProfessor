const db = require("../data/dbConfig.js");

// retrives a user by their username
function findByUsername(username) {
  return db("users").where({ username }).first();
}

//  return a list of all users in the database.

function getUsers() {
  return db("users").select("id", "username", "name", "email_address", "role");
}

// resolves to  Resolve to a single user object (or null)

function findById(id) {
  return db("users")
    .select("id", "username", "name", "email_address", "role")
    .where({ id })
    .first();
}

// CREATE USER
async function add(user) {
  await db("users")
    .returning({
      id: user.id,
      username:user.username,
      name: user.name,
      email_address=user.email_address,
      role: user.role
    })
    .insert(user)
    .then((ids) => {
      return findById(ids[0]);
    });
}

//UPDATE USER
async function update(id, data) {
  //validateUser(id)
  await db("users").where({ id }).first().returning("id").update(data);
  return findById(id);
}

async function validateUser(id) {
  findById(id)
    .then((user) => {
      if (!user) {
        console.log(user);
        return res.status(404).json({
          message: "The user with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
// DELETE USER
function remove(id) {
  return db("users").where({ id }).delete();
}

module.exports = {
  getUsers,
  findById,
  add,
  remove,
  validateUser,
  update,
  findByUsername,
};
