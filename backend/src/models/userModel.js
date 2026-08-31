const { pool } = require("../config/db");

async function findByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email.toLowerCase()]);
  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);
  return rows[0] || null;
}

async function createUser({ name, email, university, professionalRole, passwordHash }) {
  const [result] = await pool.query(
    `INSERT INTO users (name, email, university, professional_role, password_hash, account_role, status)
     VALUES (?, ?, ?, ?, ?, 'user', 'active')`,
    [name, email.toLowerCase(), university || null, professionalRole, passwordHash]
  );
  return findById(result.insertId);
}

function sanitize(user) {
  if (!user) return null;
  const { password_hash, ...rest } = user;
  return rest;
}

module.exports = { findByEmail, findById, createUser, sanitize };
