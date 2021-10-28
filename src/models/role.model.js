const { Model } = require("objection");
const User = require("./user.model");

class Role extends Model {
  static get tableName() {
    return "role";
  }

  static relationMappings = {
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: "role.id",
        through: {
          from: "user_has_role.role_id",
          to: "user_has_role.user_id",
        },
        to: "user.id",
      },
    },
  };
}

module.exports = Role;
