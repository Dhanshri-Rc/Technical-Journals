const mongoose = require("mongoose");
require("dotenv").config();

let connectionPromise = null;

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (connectionPromise) return connectionPromise;

  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/technical_journals";
  connectionPromise = mongoose
    .connect(uri)
    .then(() => {
      console.log("[db] MongoDB connected successfully");
      return mongoose.connection;
    })
    .catch((err) => {
      connectionPromise = null;
      console.error("[db] Failed to connect to MongoDB:", err.message);
      throw err;
    });

  return connectionPromise;
}

async function testConnection() {
  return connectDatabase();
}

module.exports = { mongoose, connectDatabase, testConnection };
