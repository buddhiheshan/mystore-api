const ApiException = require("../common/exceptions/ApiException");
const Role = require("../models/role.model");
const User = require("../models/user.model");

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const createUser = async (role, data) => {
  const user = await User.query().insert(data);
  const roleID = await Role.query().where("name", "=", role);
  await user.$relatedQuery("roles").relate(roleID);
  return user;
};

module.exports = {
  comparePassword,
  createUser,
};
