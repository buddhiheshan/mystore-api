const { Model } = require("objection");
const Item = require("./item.model");

class Category extends Model {
  static get tableName() {
    return "category";
  }

  static relationMappings = {
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

module.exports = Category;
