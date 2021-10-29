const { Model } = require("objection");
const Item = require("./item.model");
const SKU = require("./sku.model");
const Variant = require("./variant.model");

class ItemSKUVariant extends Model {
  static get tableName() {
    return "sku_variant";
  }

  static get idColumn() {
    return ["itemId", "skuId", "variantId"];
  }

  static get relationMappings() {
    return {
      items: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: "item_sku_variant.itemId",
          to: "item.id",
        },
      },

      skus: {
        relation: Model.BelongsToOneRelation,
        modelClass: SKU,
        join: {
          from: "item_sku_variant.skuId",
          to: "sku.id",
        },
      },

      variants: {
        relation: Model.BelongsToOneRelation,
        modelClass: Variant,
        join: {
          from: "item_sku_variant.variantId",
          to: "variant.id",
        },
      },
    };
  }
}

module.exports = ItemSKUVariant;
