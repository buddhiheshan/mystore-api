const env = require("./src/configs");

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "admin",
      password: "password",
      database: "mystore",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
    migrations: {
      directory: "./src/database/migrations",
      stub: "./src/database/stubs/migration.stub",
    },
  },
};
