const { pool } = require("../config/db");

// ======================================================
// CREATE MANUSCRIPT
// ======================================================

async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO manuscript_submissions
      (
        tracking_id,
        journal_id,
        title,
        author_name,
        email,
        abstract,
        file_name,
        file_url,
        status
      )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.tracking_id,
      data.journal_id,
      data.title,
      data.author_name,
      data.email,
      data.abstract,
      data.file_name,
      data.file_url,
      data.status || "submitted",
    ]
  );

  return findById(result.insertId);
}

// ======================================================
// FIND BY ID
// ======================================================

async function findById(id) {
  const [rows] = await pool.query(
    `SELECT
        m.*,

        j.title AS journal_title,
        j.short_title AS journal_short_title,
        j.slug AS journal_slug

     FROM manuscript_submissions m

     LEFT JOIN journals j
       ON j.id = m.journal_id

     WHERE m.id = ?

     LIMIT 1`,
    [id]
  );

  return rows[0] || null;
}

// ======================================================
// FIND BY TRACKING ID
// ======================================================

async function findByTrackingId(trackingId) {
  const [rows] = await pool.query(
    `SELECT
        m.*,

        j.title AS journal_title,
        j.short_title AS journal_short_title,
        j.slug AS journal_slug

     FROM manuscript_submissions m

     LEFT JOIN journals j
       ON j.id = m.journal_id

     WHERE m.tracking_id = ?

     LIMIT 1`,
    [trackingId]
  );

  return rows[0] || null;
}

// ======================================================
// ADMIN - LIST MANUSCRIPTS
// ======================================================

async function findAllAdmin(
  { page, limit, offset },
  search = "",
  status = ""
) {
  const where = [];
  const params = [];

  // Search
  if (search) {
    const like = `%${search}%`;

    where.push(`
      (
        m.tracking_id LIKE ?
        OR m.title LIKE ?
        OR m.author_name LIKE ?
        OR m.email LIKE ?
        OR j.title LIKE ?
      )
    `);

    params.push(
      like,
      like,
      like,
      like,
      like
    );
  }

  // Status filter
  if (status) {
    where.push("m.status = ?");
    params.push(status);
  }

  const whereSql = where.length
    ? `WHERE ${where.join(" AND ")}`
    : "";

  const [rows] = await pool.query(
    `SELECT
        m.id,
        m.tracking_id,
        m.journal_id,
        m.title,
        m.author_name,
        m.email,
        m.status,
        m.file_name,
        m.file_url,
        m.submitted_at,
        m.updated_at,

        j.title AS journal_title,
        j.short_title AS journal_short_title

     FROM manuscript_submissions m

     LEFT JOIN journals j
       ON j.id = m.journal_id

     ${whereSql}

     ORDER BY m.submitted_at DESC

     LIMIT ? OFFSET ?`,
    [
      ...params,
      limit,
      offset,
    ]
  );

  const [countRows] = await pool.query(
    `SELECT COUNT(*) AS total

     FROM manuscript_submissions m

     LEFT JOIN journals j
       ON j.id = m.journal_id

     ${whereSql}`,
    params
  );

  return {
    rows,
    total: countRows[0].total,
  };
}

// ======================================================
// ADMIN - UPDATE STATUS
// ======================================================

async function updateStatus(id, status) {
  await pool.query(
    `UPDATE manuscript_submissions
     SET status = ?
     WHERE id = ?`,
    [status, id]
  );

  return findById(id);
}

// ======================================================
// ADMIN - DELETE
// ======================================================

async function remove(id) {
  const [result] = await pool.query(
    `DELETE FROM manuscript_submissions
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
}

// ======================================================
// DASHBOARD COUNTS
// ======================================================

async function getStats() {
  const [rows] = await pool.query(
    `SELECT
      COUNT(*) AS total,

      SUM(
        CASE
          WHEN status = 'submitted'
          THEN 1 ELSE 0
        END
      ) AS submitted,

      SUM(
        CASE
          WHEN status = 'under_review'
          THEN 1 ELSE 0
        END
      ) AS under_review,

      SUM(
        CASE
          WHEN status = 'revision_required'
          THEN 1 ELSE 0
        END
      ) AS revision_required,

      SUM(
        CASE
          WHEN status = 'accepted'
          THEN 1 ELSE 0
        END
      ) AS accepted,

      SUM(
        CASE
          WHEN status = 'rejected'
          THEN 1 ELSE 0
        END
      ) AS rejected

     FROM manuscript_submissions`
  );

  return rows[0];
}

module.exports = {
  create,
  findById,
  findByTrackingId,

  findAllAdmin,
  updateStatus,
  remove,
  getStats,
};