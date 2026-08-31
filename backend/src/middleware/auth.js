const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { fail } = require("../utils/apiResponse");

function authenticateToken(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return fail(res, "Authentication token missing", 401);

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = payload; // { id, email, role, name }
    next();
  } catch (err) {
    return fail(res, "Invalid or expired token", 401);
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return fail(res, "Admin access required", 403);
  }
  next();
}

// Attaches req.user if a valid token is present, but never rejects the request.
function optionalAuth(req, _res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (token) {
    try {
      req.user = jwt.verify(token, env.jwtSecret);
    } catch {
      req.user = null;
    }
  }
  next();
}

module.exports = { authenticateToken, requireAdmin, optionalAuth };
