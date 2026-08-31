const { pool } = require("../config/db");

async function create({ name, email, subject, message }) {
  const [result] = await pool.query(
    `INSERT INTO contact_enquiries (name, email, subject, message, status) VALUES (?, ?, ?, ?, 'new')`,
    [name, email, subject, message]
  );
  const [rows] = await pool.query("SELECT * FROM contact_enquiries WHERE id = ?", [result.insertId]);
  return rows[0];
}

async function findAll({ page, limit, offset }, status) {
  const where = [];
  const params = [];
  if (status) {
    where.push("status = ?");
    params.push(status);
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const [rows] = await pool.query(
    `SELECT * FROM contact_enquiries ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  const [countRows] = await pool.query(`SELECT COUNT(*) AS total FROM contact_enquiries ${whereSql}`, params);
  return { rows, total: countRows[0].total };
}

async function findById(id) {
  const [rows] = await pool.query("SELECT * FROM contact_enquiries WHERE id = ?", [id]);
  return rows[0] || null;
}

async function updateStatus(id, status, adminNotes) {
  const fields = ["status = ?"];
  const params = [status];
  if (adminNotes !== undefined) {
    fields.push("admin_notes = ?");
    params.push(adminNotes);
  }
  params.push(id);
  await pool.query(`UPDATE contact_enquiries SET ${fields.join(", ")} WHERE id = ?`, params);
  return findById(id);
}

async function remove(id) {
  await pool.query("DELETE FROM contact_enquiries WHERE id = ?", [id]);
}

module.exports = { create, findAll, findById, updateStatus, remove };
