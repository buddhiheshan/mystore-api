const tableName = "role";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id").primary();
    table.string("name", 45).notNullable();

    // timestamps
    table.timestamps(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
