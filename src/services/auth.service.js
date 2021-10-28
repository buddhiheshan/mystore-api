const Role = require("../models/role.model");
const User = require("../models/user.model");

const createUser = async (role, data) => {
  const user = await User.query().insert(data);
  const roleID = await Role.query().where("name", "=", role);
  await User.relatedQuery("roles").for(user.id).relate(roleID);
  return user;
};

const getUser = async (key, value) => {
  const user = await User.query().where(key, "=", value).first().withGraphFetched("roles");
  return user;
};

const getUserRoles = async (userID) => {
  let roles = await User.relatedQuery("roles").select("name").for(userID);
  roles = roles.map((role) => {
    return role.name;
  });
  return roles;
};

module.exports = {
  createUser,
  getUser,
  getUserRoles,
};
