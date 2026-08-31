const env = require("../config/env");

function notFoundMiddleware(req, res, _next) {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}`, errors: [] });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  console.error("[error]", err);

  let status = err.status || 500;
  let message = err.message || "Internal server error";

  // MySQL duplicate entry
  if (err.code === "ER_DUP_ENTRY") {
    status = 409;
    message = "A record with these details already exists.";
  }

  // Multer file errors
  if (err.name === "MulterError") {
    status = 400;
  }

  const body = { success: false, message, errors: err.errors || [] };
  if (env.nodeEnv !== "production") {
    body.stack = err.stack;
  }
  res.status(status).json(body);
}

module.exports = { notFoundMiddleware, errorHandler };
