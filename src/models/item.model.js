const { Model } = require("objection");

class Item extends Model {
  static get tableName() {
    return "item";
  }

  static get relationMappings() {
    const Category = require("./category.model");
    const SKU = require("./sku.model");

    return {
      category: {
        relation: Model.HasOneRelation,
        modelClass: Category,
        join: {
          from: "item.categoryId",
          to: "category.id",
        },
      },
      skus: {
        relation: Model.HasManyRelation,
        modelClass: SKU,
        join: {
          from: "item.id",
          to: "sku.itemId",
        },
      },
    };
  }
}

module.exports = Item;
