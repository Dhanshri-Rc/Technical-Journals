const app = require("./src/app");
const env = require("./src/config/env");
const { testConnection } = require("./src/config/db");

testConnection();

app.listen(env.port, () => {
  console.log(`[server] Technical Journals API listening on http://localhost:${env.port}`);
});
