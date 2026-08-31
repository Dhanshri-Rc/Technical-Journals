const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const userModel = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const { ok, created, fail } = require("../utils/apiResponse");

const PROFESSIONAL_ROLES = ["Author", "Reviewer", "Editor", "University Administrator"];

function signToken(payload) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

const register = asyncHandler(async (req, res) => {
  const { name, email, university, professionalRole, password, confirmPassword } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) errors.push("Please provide your full name.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Please provide a valid email address.");
  if (!university || university.trim().length < 2) errors.push("Please provide your university / institution.");
  if (!PROFESSIONAL_ROLES.includes(professionalRole)) errors.push("Please select a valid professional role.");
  if (!password || password.length < 8) errors.push("Password must be at least 8 characters long.");
  if (confirmPassword !== undefined && password !== confirmPassword) errors.push("Passwords do not match.");

  if (errors.length) return fail(res, "Validation failed", 422, errors);

  const existing = await userModel.findByEmail(email);
  if (existing) return fail(res, "An account with this email already exists.", 409);

  const passwordHash = await bcrypt.hash(password, 10);
  await userModel.createUser({ name: name.trim(), email, university: university.trim(), professionalRole, passwordHash });

  return created(res, null, "Registration successful");
});

const login = asyncHandler(async (req, res) => {
  const { email, password, loginAs } = req.body;
  if (!email || !password) return fail(res, "Email and password are required.", 400);

  if (loginAs === "admin") {
    if (!env.adminEmail || !env.adminPasswordHash) {
      return fail(res, "Admin login is not configured on the server.", 500);
    }
    if (email.toLowerCase() !== env.adminEmail) {
      return fail(res, "Invalid email or password.", 401);
    }
    const validAdmin = await bcrypt.compare(password, env.adminPasswordHash);
    if (!validAdmin) return fail(res, "Invalid email or password.", 401);

    const token = signToken({ id: 0, email: env.adminEmail, role: "admin", name: "Administrator" });
    return ok(res, { token, user: { id: 0, name: "Administrator", email: env.adminEmail, role: "admin" } }, "Login successful");
  }

  const user = await userModel.findByEmail(email);
  if (!user) return fail(res, "Invalid email or password.", 401);
  if (user.status !== "active") return fail(res, "This account has been suspended.", 403);

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return fail(res, "Invalid email or password.", 401);

  const token = signToken({ id: user.id, email: user.email, role: user.account_role, name: user.name });
  return ok(res, {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.account_role, university: user.university, professionalRole: user.professional_role },
  }, "Login successful");
});

const me = asyncHandler(async (req, res) => {
  if (req.user.role === "admin") {
    return ok(res, { id: 0, name: "Administrator", email: req.user.email, role: "admin" });
  }
  const user = await userModel.findById(req.user.id);
  if (!user) return fail(res, "User not found", 404);
  return ok(res, userModel.sanitize(user));
});

const logout = asyncHandler(async (_req, res) => {
  // Stateless JWT — logout is handled client-side by discarding the token.
  return ok(res, null, "Logged out");
});

module.exports = { register, login, me, logout };
