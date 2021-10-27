const tableName = "user_has_role";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.integer("user_id").unsigned();
    table.integer("role_id").unsigned();

    // timestamps
    table.timestamps(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
