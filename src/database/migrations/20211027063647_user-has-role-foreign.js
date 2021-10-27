const tableName = "user_has_role";

exports.up = function (knex) {
  return knex.schema.table(tableName, (table) => {
    table.foreign("role_id").references("role.id");
    table.foreign("user_id").references("user.id");
  });
};

exports.down = function (knex) {
  return knex.schema.table(tableName, (table) => {
    table.dropForeign("role_id");
    table.dropForeign("user_id");
  });
};
