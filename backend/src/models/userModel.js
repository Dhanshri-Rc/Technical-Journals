const { User } = require("../db/models");
const { nextId, legacyRecord, numericId } = require("../utils/mongoHelpers");

async function findByEmail(email) {
  const row = await User.findOne({ email: String(email).toLowerCase() }).lean();
  return row ? legacyRecord(row) : null;
}

async function findById(id) {
  const numeric = numericId(id);
  if (!numeric) return null;
  const row = await User.findOne({ id: numeric }).lean();
  return row ? legacyRecord(row) : null;
}

async function createUser({ name, email, university, professionalRole, passwordHash }) {
  const id = await nextId("users");
  await User.create({
    id,
    name,
    email: String(email).toLowerCase(),
    university: university || null,
    professional_role: professionalRole,
    password_hash: passwordHash,
    account_role: "user",
    status: "active",
  });
  return findById(id);
}

function sanitize(user) {
  if (!user) return null;
  const { password_hash, ...rest } = user;
  return rest;
}

module.exports = { findByEmail, findById, createUser, sanitize };
