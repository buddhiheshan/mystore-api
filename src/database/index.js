const { Model, knexSnakeCaseMappers } = require("objection");
const env = require("../configs");
const Knex = require("knex");

class DatabaseService {
  static init() {
    const knex = Knex({
      client: "mysql2",
      connection: env.DB_URL,
      ...knexSnakeCaseMappers(),
    });

    // pass the knex object to Model.
    Model.knex(knex);
  }
}

module.exports = DatabaseService;
