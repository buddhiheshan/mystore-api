const { Model } = require("objection");
const env = require("../configs");
const Knex = require("knex");

class DatabaseService {
  static init() {
    const knex = Knex({
      client: "mysql",
      connection: env.DB_URL,
    });

    // pass the knex object to Model.
    Model.knex(knex);
  }
}

module.exports = DatabaseService;
