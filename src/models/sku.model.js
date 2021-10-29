const { Model } = require("objection");
const Item = require("../models/item.model");
const Variant = require("./vaiant.model");

class SKU extends Model {
  static get tableName() {
    return "sku";
  }

  static get relationMappings() {
    return {
      variants: {
        relation: Model.ManyToManyRelation,
        modelClass: Variant,
        join: {
          from: "sku.id",
          through: {
            from: "item_sku_variant.skuId",
            extra: ["value"],
            to: "item_sku_variant.variantId",
          },
          to: "variant.id",
        },
      },

      items: {
        relation: Model.ManyToManyRelation,
        modelClass: Item,
        join: {
          from: "sku.id",
          through: {
            from: "item_sku_variant.skuId",
            // extra: ["value"],
            to: "item_sku_variant.itemId",
          },
          to: "item.id",
        },
      },
    };
  }
}

module.exports = SKU;
