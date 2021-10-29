const { Model } = require("objection");

class Category extends Model {
  static get tableName() {
    return "category";
  }

  static relationMappings() {
    const Item = require("./item.model");
    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: Item,
        join: {
          from: "category.id",
          to: "item.categoryId",
        },
      },
    };
  }
}

module.exports = Category;
