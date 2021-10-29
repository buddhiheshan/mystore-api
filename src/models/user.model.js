const { Model } = require("objection");
const bcrypt = require("bcrypt");

class User extends Model {
  static get tableName() {
    return "user";
  }

  async $beforeInsert() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  static relationMappings = () => {
    const Role = require("./role.model");
    const Review = require("./review.model");

    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        filter: (query) => query.select("id", "name"),
        join: {
          from: "user.id",
          through: {
            from: "user_has_role.user_id",
            to: "user_has_role.role_id",
          },
          to: "role.id",
        },
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        // filter: (query) => query.select("id", "price", "quantity", "discount"),
        join: {
          from: "user.id",
          to: "review.customerId",
        },
      },
    };
  };
}

module.exports = User;
