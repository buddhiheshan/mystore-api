const tableName = "user_has_role";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.integer("user_id").unsigned().notNullable().references("id").inTable("user");
    table.integer("role_id").unsigned().notNullable().references("id").inTable("role");

    // timestamps
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tableName);
};
