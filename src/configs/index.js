const { cleanEnv, num, str, any } = require("envalid");
require("dotenv").config();

const env = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  SECRET: str(),
  TOKEN_VALIDITY: str(),
  DB_HOST: str(),
  DB_PORT: num({ default: 3306 }),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_NAME: str(),
  NODE_ENV: str({ default: "development" }),
});

module.exports = env;
