const env = require("../../configs");
const AuthService = require("./auth.service");
const FakeAuthService = require("./fake.auth.service");

const getAuthService = () => {
  return env.isTest ? new FakeAuthService() : new AuthService();
};

module.exports = getAuthService;
