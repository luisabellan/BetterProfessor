var dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: { directory: "../data/migrations" },
    seeds: { directory: "../data/seeds" },
    pool: {
      min: 2,
      max: 10,
    },
  },

  test: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: { directory: "../data/migrations" },
    seeds: { directory: "../data/seeds" },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    },
    migrations: { directory: "../data/migrations" },
    seeds: { directory: "../data/seeds" },
  },
  // Define a knex.raw trigger helper
  onUpdateTrigger: (tableName) => `
  CREATE TRIGGER update_timestamp
  BEFORE UPDATE
  ON ${tableName}
  FOR EACH ROW
  EXECUTE PROCEDURE update_timestamp();
    `,
};
