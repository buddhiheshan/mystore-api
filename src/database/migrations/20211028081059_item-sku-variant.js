const tableName = "item_sku_variant";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id").primary();
    table.integer("item_id").unsigned().notNullable().references("id").inTable("item");
    table.integer("variant_id").unsigned().notNullable().references("id").inTable("variant");
    table.integer("sku_id").unsigned().notNullable().references("id").inTable("sku");
    table.string("value", 45).notNullable();

    // timestamps
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
