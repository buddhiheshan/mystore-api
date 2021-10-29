const tableName = "review";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id").primary();
    table.string("description", 1000);
    table.integer("rating");
    table.integer("customer_id").unsigned().notNullable().references("id").inTable("user");
    table.integer("item_id").unsigned().notNullable().references("id").inTable("item");

    // timestamps
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
