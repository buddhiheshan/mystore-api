const { Model } = require("objection");

class SKU extends Model {
  static get tableName() {
    return "sku";
  }

  static get relationMappings() {
    const Item = require("../models/item.model");
    const Variant = require("./variant.model");
    return {
      variants: {
        relation: Model.ManyToManyRelation,
        modelClass: Variant,
        filter: (query) => query.select("variant.id", "name", "value"),
        join: {
          from: "sku.id",
          through: {
            from: "sku_variant.skuId",
            extra: ["value"],
            to: "sku_variant.variantId",
          },
          to: "variant.id",
        },
      },

      item: {
        relation: Model.HasOneRelation,
        modelClass: Item,
        join: {
          from: "sku.itemId",
          to: "item.id",
        },
      },
    };
  }
}

module.exports = SKU;
