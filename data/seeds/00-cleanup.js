const cleaner = require("knex-cleaner");

exports.seed = function (knex) {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.NODE_ENV !== "staging"
  ) {
    return cleaner.clean(knex, {
      mode: "truncate", // resets ids
      ignoreTables: ["knex_migrations", "knex_migrations_lock"], // don't empty migration tables
    });
  }
};
