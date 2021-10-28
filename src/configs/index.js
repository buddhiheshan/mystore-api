const { cleanEnv, num, str } = require("envalid");
require("dotenv").config();

const env = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  DB_URL: str(),
  SECRET: str(),
  TOKEN_VALIDITY: str(),
});

module.exports = env;
