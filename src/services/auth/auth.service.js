const Role = require("../../models/role.model");
const User = require("../../models/user.model");

class AuthService {
  async createUser(role, data) {
    const user = await User.query().insert(data);
    const roleID = await Role.query().where("name", "=", role);
    await User.relatedQuery("roles").for(user.id).relate(roleID);
    return user;
  }

  async getUser(key, value) {
    const user = await User.query()
      .where(key, "=", value)
      .first()
      .withGraphFetched("roles");
    return user;
  }

  async getUserRoles(userID) {
    let roles = await User.relatedQuery("roles").select("name").for(userID);
    roles = roles.map((role) => {
      return role.name;
    });
    return roles;
  }

  async patchUser(userId, data) {
    const user = await User.query().patchAndFetchById(userId, data);
    return user;
  }
}
module.exports = AuthService;
