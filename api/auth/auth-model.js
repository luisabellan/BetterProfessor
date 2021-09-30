const db = require("../../data/db-config");

async function add(data) {
  const [id] = await db("sessions").insert(data);
  return findById(id);
}

function findById(id) {
  return db("sessions").where("id", id).first();
}

function deleteById(id) {
  return db("sessions").where("id", id).del();
}

module.exports = {
  add,
  findById,
  deleteById,
};
