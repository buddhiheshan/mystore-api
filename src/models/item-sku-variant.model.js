const { Model } = require("objection");
const Item = require("./item.model");
const SKU = require("./sku.model");
const Variant = require("./vaiant.model");

class ItemSKUVariant extends Model {
  static get tableName() {
    return "item_sku_variant";
  }

  static get idColumn() {
    return ["item_id", "sku_id", "variant_id"];
  }

  static get relationMappings() {
    return {
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: "item_sku_variant.item_id",
          to: "item.id",
        },
      },

      sku: {
        relation: Model.BelongsToOneRelation,
        modelClass: SKU,
        join: {
          from: "item_sku_variant.sku_id",
          to: "sku.id",
        },
      },

      variant: {
        relation: Model.BelongsToOneRelation,
        modelClass: Variant,
        join: {
          from: "item_sku_variant.variant_id",
          to: "variant.id",
        },
      },
    };
  }
}

module.exports = ItemSKUVariant;
