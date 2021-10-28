const tableName = "sku";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id").primary();
    table.string("name", 45).notNullable().unique();
    table.integer("price").notNullable();
    table.integer("quantitiy").notNullable();
    table.integer("discount").notNullable();

    // timestamps
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};