const { Model } = require("objection");
const bcrypt = require("bcrypt");
const Role = require("./role.model");

class User extends Model {
  static get tableName() {
    return "user";
  }

  async $beforeInsert() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  static relationMappings = {
    roles: {
      relation: Model.ManyToManyRelation,
      modelClass: Role,
      join: {
        from: "user.id",
        through: {
          from: "user_has_role.user_id",
          to: "user_has_role.role_id",
        },
        to: "role.id",
      },
    },
  };
}

module.exports = User;
