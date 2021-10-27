const { knexSnakeCaseMappers } = require("objection");
const env = require("./src/configs");

module.exports = {
  development: {
    client: "mysql2",
    connection: env.DB_URL,
    seeds: {
      directory: "./src/database/seeds",
    },
    migrations: {
      directory: "./src/database/migrations",
      stub: "./src/database/stubs/migration.stub",
    },
    ...knexSnakeCaseMappers,
  },
};
