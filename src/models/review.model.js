const { Model } = require("objection");

class Review extends Model {
  static get tableName() {
    return "review";
  }

  static get relationMappings() {
    const Item = require("./item.model");
    const User = require("./user.model");

    return {
      item: {
        relation: Model.HasOneRelation,
        modelClass: Item,
        // filter: (query) => query.select("id", "name"),
        join: {
          from: "review.itemId",
          to: "item.id",
        },
      },
      customer: {
        relation: Model.HasOneRelation,
        modelClass: User,
        filter: (query) => query.select("id", "firstName", "lastName"),
        join: {
          from: "review.customerId",
          to: "user.id",
        },
      },
    };
  }
}

module.exports = Review;
