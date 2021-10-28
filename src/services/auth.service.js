const Role = require("../models/role.model");
const User = require("../models/user.model");

const createUser = async (role, data) => {
  const user = await User.query().insert(data);
  const roleID = await Role.query().where("name", "=", role);
  await user.$relatedQuery("roles").relate(roleID);
  return user;
};

const getUser = async (key, value) => {
  const [user] = await User.query().where(key, "=", value);
  return user;
};

const getUserRoles = async (userID) => {
  let roles = await User.relatedQuery("roles").select("name").for(userID);
  // !! Spread operator?
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