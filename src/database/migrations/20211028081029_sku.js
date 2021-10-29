const tableName = "sku";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id").primary();
    // table.string("name", 45).notNullable().unique();
    table.integer("price").notNullable();
    table.integer("quantity").notNullable();
    table.integer("discount").notNullable();
    table.integer("item_id").unsigned().notNullable().references("id").inTable("item");

    // timestamps
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
