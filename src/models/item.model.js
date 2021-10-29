const { Model } = require("objection");

class Item extends Model {
  static get tableName() {
    return "item";
  }

  static get relationMappings() {
    const Category = require("./category.model");
    const SKU = require("./sku.model");
    const Variant = require("./vaiant.model");

    return {
      category: {
        relation: Model.HasOneRelation,
        modelClass: Category,
        join: {
          from: "item.categoryId",
          to: "category.id",
        },
      },
      variants: {
        relation: Model.ManyToManyRelation,
        modelClass: Variant,
        join: {
          from: "item.id",
          through: {
            from: "item_sku_variant.itemId",
            extra: ["value"],
            to: "item_sku_variant.variantId",
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
            from: "item_sku_variant.itemId",
            // extra: ["value"],
            to: "item_sku_variant.skuId",
          },
          to: "sku.id",
        },
      },
    };
  }
}

module.exports = Item;
