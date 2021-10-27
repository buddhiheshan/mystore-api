const { Model } = require("objection");

class Role extends Model {
  static get tableName() {
    return "role";
  }
}

module.exports = Role;
