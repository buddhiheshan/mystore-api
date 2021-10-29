const env = require("./configs");
const app = require("./app");

app.listen(env.PORT, () => {
  console.log(`[Server] Listening on port ${env.PORT}`);
});
