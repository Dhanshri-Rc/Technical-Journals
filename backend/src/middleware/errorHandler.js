const env = require("../config/env");

function notFoundMiddleware(req, res, _next) {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}`, errors: [] });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  console.error("[error]", err);

  let status = err.status || 500;
  let message = err.message || "Internal server error";
  let errors = err.errors || [];

  if (err?.code === 11000) {
    status = 409;
    message = "A record with these details already exists.";
    errors = [];
  }

  if (err?.name === "ValidationError") {
    status = 422;
    message = "Validation failed";
    errors = Object.values(err.errors || {}).map((item) => item.message);
  }

  if (err.name === "MulterError") status = 400;

  const body = { success: false, message, errors };
  if (env.nodeEnv !== "production") body.stack = err.stack;
  res.status(status).json(body);
}

module.exports = { notFoundMiddleware, errorHandler };
