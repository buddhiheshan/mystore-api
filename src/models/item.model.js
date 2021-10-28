const { Model } = require("objection");
const SKU = require("./sku.model");
const Variant = require("./vaiant.model");

class Item extends Model {
  static get tableName() {
    return "item";
  }

  static get relationMappings() {
    return {
      vaiants: {
        relation: Model.ManyToManyRelation,
        modelClass: Variant,
        join: {
          from: "item.id",
          through: {
            from: "item_sku_variant.item_id",
            extra: ["value"],
            to: "item_sku_variant.variant_id",
          },
          to: "variant.id",
        },
      },

      skus: {
        relation: Model.ManyToManyRelation,
        modelClass: SKU,
        join: {
          from: "item.id",
          through: {
            from: "item_sku_variant.item_id",
            extra: ["extra_attribute"],
            to: "item_sku_variant.sku_id",
          },
          to: "sku.id",
        },
      },
    };
  }
}

module.exports = Item;
