const slugify = require("slugify");
const { pool } = require("../config/db");

function baseSlug(text) {
  return slugify(text, { lower: true, strict: true, trim: true });
}

// Generates a unique slug for `table`, optionally excluding a given id (for updates).
async function uniqueSlug(table, text, excludeId = null) {
  const base = baseSlug(text) || "item";
  let candidate = base;
  let suffix = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const params = [candidate];
    let sql = `SELECT id FROM ${table} WHERE slug = ?`;
    if (excludeId) {
      sql += " AND id != ?";
      params.push(excludeId);
    }
    const [rows] = await pool.query(sql, params);
    if (rows.length === 0) return candidate;
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
}

module.exports = { baseSlug, uniqueSlug };
