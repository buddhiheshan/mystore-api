const { Model } = require("objection");

class Item extends Model {
  static get tableName() {
    return "item";
  }

  static get relationMappings() {
    const Category = require("./category.model");
    const SKU = require("./sku.model");
    const Review = require("./review.model");

    return {
      category: {
        relation: Model.HasOneRelation,
        modelClass: Category,
        filter: (query) => query.select("id", "name"),
        join: {
          from: "item.categoryId",
          to: "category.id",
        },
      },
      skus: {
        relation: Model.HasManyRelation,
        modelClass: SKU,
        filter: (query) => query.select("id", "price", "quantity", "discount"),
        join: {
          from: "item.id",
          to: "sku.itemId",
        },
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        // filter: (query) => query.select("id", "price", "quantity", "discount"),
        join: {
          from: "item.id",
          to: "review.itemId",
        },
      },
    };
  }
}

module.exports = Item;
