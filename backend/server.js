const app = require("./src/app");
const env = require("./src/config/env");
const { connectDatabase } = require("./src/config/db");

async function start() {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      console.log(`[server] Technical Journals API listening on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error("[server] Unable to start because the database connection failed.");
    process.exit(1);
  }
}

start();
