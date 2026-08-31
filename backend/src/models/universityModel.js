const { pool } = require("../config/db");

async function findAll({ featured, limit } = {}) {
  const where = ["status = 'active'"];
  const params = [];
  if (featured === "true") where.push("featured = 1");

  let sql = `SELECT * FROM universities WHERE ${where.join(" AND ")} ORDER BY display_order ASC, name ASC`;
  if (limit) {
    sql += " LIMIT ?";
    params.push(Number(limit));
  }
  const [rows] = await pool.query(sql, params);
  return rows;
}

async function findByIdOrSlug(idOrSlug) {
  const isNumeric = /^\d+$/.test(idOrSlug);
  const [rows] = await pool.query(
    `SELECT * FROM universities WHERE ${isNumeric ? "id = ?" : "slug = ?"} LIMIT 1`,
    [idOrSlug]
  );
  return rows[0] || null;
}

async function findAllAdmin({ page, limit, offset }, search) {
  const where = [];
  const params = [];
  if (search) {
    where.push("name LIKE ?");
    params.push(`%${search}%`);
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const [rows] = await pool.query(
    `SELECT * FROM universities ${whereSql} ORDER BY display_order ASC, created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  const [countRows] = await pool.query(`SELECT COUNT(*) AS total FROM universities ${whereSql}`, params);
  return { rows, total: countRows[0].total };
}

async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO universities (name, slug, country, logo, journals_count, website_url, description, status, display_order, featured)
     VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [
      data.name, data.slug, data.country || null, data.logo || null, data.journals_count || 0,
      data.website_url || null, data.description || null, data.status || "active",
      data.display_order || 0, data.featured ? 1 : 0,
    ]
  );
  return findByIdOrSlug(String(result.insertId));
}

async function update(id, data) {
  const fields = [];
  const params = [];
  const allowed = ["name", "slug", "country", "logo", "journals_count", "website_url", "description", "status", "display_order", "featured"];
  for (const key of allowed) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      params.push(key === "featured" ? (data[key] ? 1 : 0) : data[key]);
    }
  }
  if (fields.length === 0) return findByIdOrSlug(String(id));
  params.push(id);
  await pool.query(`UPDATE universities SET ${fields.join(", ")} WHERE id = ?`, params);
  return findByIdOrSlug(String(id));
}

async function remove(id) {
  await pool.query("DELETE FROM universities WHERE id = ?", [id]);
}

async function findRawById(id) {
  const [rows] = await pool.query("SELECT * FROM universities WHERE id = ?", [id]);
  return rows[0] || null;
}

module.exports = { findAll, findByIdOrSlug, findAllAdmin, create, update, remove, findRawById };
