const { pool } = require("../config/db");

const SORT_MAP = {
  upcoming: "c.start_date ASC",
  newest: "c.created_at DESC",
  title: "c.title ASC",
  location: "c.location ASC",
};

function dateRangeClause(dateRange) {
  switch (dateRange) {
    case "upcoming":
      return "c.start_date >= CURDATE()";
    case "next3-6":
      return "c.start_date BETWEEN DATE_ADD(CURDATE(), INTERVAL 3 MONTH) AND DATE_ADD(CURDATE(), INTERVAL 6 MONTH)";
    case "next6-12":
      return "c.start_date BETWEEN DATE_ADD(CURDATE(), INTERVAL 6 MONTH) AND DATE_ADD(CURDATE(), INTERVAL 12 MONTH)";
    case "past":
      return "c.start_date < CURDATE()";
    default:
      return null;
  }
}

function buildFilters(query) {
  const where = ["c.status = 'active'"];
  const params = [];

  if (query.search) {
    where.push("(c.title LIKE ? OR c.code LIKE ? OR c.organizer LIKE ?)");
    const like = `%${query.search}%`;
    params.push(like, like, like);
  }
  if (query.type) {
    where.push("c.conference_type = ?");
    params.push(query.type);
  }
  if (query.subject) {
    where.push("c.subject_area = ?");
    params.push(query.subject);
  }
  if (query.location) {
    where.push("(c.location LIKE ? OR c.city LIKE ? OR c.country LIKE ?)");
    const like = `%${query.location}%`;
    params.push(like, like, like);
  }
  if (query.region) {
    where.push("c.region = ?");
    params.push(query.region);
  }
  const dateClause = dateRangeClause(query.dateRange);
  if (dateClause) where.push(dateClause);
  if (query.featured === "true") where.push("c.featured = 1");

  return { whereSql: where.join(" AND "), params };
}

async function findAll(query, { page, limit, offset }) {
  const { whereSql, params } = buildFilters(query);
  const sort = SORT_MAP[query.sort] || SORT_MAP.upcoming;

  const [rows] = await pool.query(
    `SELECT * FROM conferences c WHERE ${whereSql} ORDER BY ${sort} LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  const [countRows] = await pool.query(`SELECT COUNT(*) AS total FROM conferences c WHERE ${whereSql}`, params);
  return { rows, total: countRows[0].total };
}

async function findByIdOrSlug(idOrSlug) {
  const isNumeric = /^\d+$/.test(idOrSlug);
  const [rows] = await pool.query(
    `SELECT * FROM conferences WHERE ${isNumeric ? "id = ?" : "slug = ?"} LIMIT 1`,
    [idOrSlug]
  );
  return rows[0] || null;
}

async function getFilterOptions() {
  const [types] = await pool.query("SELECT DISTINCT conference_type AS v FROM conferences WHERE conference_type IS NOT NULL AND status='active' ORDER BY v");
  const [subjects] = await pool.query("SELECT DISTINCT subject_area AS v FROM conferences WHERE subject_area IS NOT NULL AND status='active' ORDER BY v");
  const [regions] = await pool.query("SELECT DISTINCT region AS v FROM conferences WHERE region IS NOT NULL AND status='active' ORDER BY v");
  return {
    types: types.map((r) => r.v),
    subjects: subjects.map((r) => r.v),
    regions: regions.map((r) => r.v),
    dateRanges: ["upcoming", "next3-6", "next6-12", "past"],
  };
}

async function findAllAdmin({ page, limit, offset }, search) {
  const where = [];
  const params = [];
  if (search) {
    where.push("(title LIKE ? OR code LIKE ?)");
    params.push(`%${search}%`, `%${search}%`);
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const [rows] = await pool.query(
    `SELECT * FROM conferences ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  const [countRows] = await pool.query(`SELECT COUNT(*) AS total FROM conferences ${whereSql}`, params);
  return { rows, total: countRows[0].total };
}

async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO conferences
      (slug, code, title, conference_type, subject_area, organizer, description, topics, start_date, end_date,
       display_date, location, city, country, region, venue, conference_mode, registration_url, image, color,
       status, featured)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.slug, data.code || null, data.title, data.conference_type || null, data.subject_area || null,
      data.organizer || null, data.description || null, data.topics || null, data.start_date || null,
      data.end_date || null, data.display_date || null, data.location || null, data.city || null,
      data.country || null, data.region || null, data.venue || null, data.conference_mode || "In-Person",
      data.registration_url || null, data.image || null, data.color || null, data.status || "active",
      data.featured ? 1 : 0,
    ]
  );
  return findByIdOrSlug(String(result.insertId));
}

async function update(id, data) {
  const fields = [];
  const params = [];
  const allowed = [
    "slug", "code", "title", "conference_type", "subject_area", "organizer", "description", "topics",
    "start_date", "end_date", "display_date", "location", "city", "country", "region", "venue",
    "conference_mode", "registration_url", "image", "color", "status", "featured",
  ];
  for (const key of allowed) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      params.push(key === "featured" ? (data[key] ? 1 : 0) : data[key]);
    }
  }
  if (fields.length === 0) return findByIdOrSlug(String(id));
  params.push(id);
  await pool.query(`UPDATE conferences SET ${fields.join(", ")} WHERE id = ?`, params);
  return findByIdOrSlug(String(id));
}

async function remove(id) {
  await pool.query("DELETE FROM conferences WHERE id = ?", [id]);
}

async function findRawById(id) {
  const [rows] = await pool.query("SELECT * FROM conferences WHERE id = ?", [id]);
  return rows[0] || null;
}

module.exports = {
  findAll, findByIdOrSlug, getFilterOptions, findAllAdmin, create, update, remove, findRawById,
};
