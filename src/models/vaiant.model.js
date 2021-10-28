const { Model } = require("objection");
const Item = require("../models/item.model");
const SKU = require("./sku.model");

class Variant extends Model {
  static get tableName() {
    return "variant";
  }

  static get relationMappings() {
    return {
      items: {
        relation: Model.ManyToManyRelation,
        modelClass: Item,
        join: {
          from: "variant.id",
          through: {
            from: "item_sku_variant.variant_id",
            extra: ["value"],
            to: "item_sku_variant.items_id",
          },
          to: "items.id",
        },
      },

      sku: {
        relation: Model.ManyToManyRelation,
        modelClass: SKU,
        join: {
          from: "variant.id",
          through: {
            from: "item_sku_variant.variant_id",
            extra: ["value"],
            to: "item_sku_variant.sku_id",
          },
          to: "sku.id",
        },
      },
    };
  }
}

module.exports = Variant;
