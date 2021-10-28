const tableName = "variant";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id").primary();
    table.string("name", 45).notNullable().unique();

    // timestamps
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
