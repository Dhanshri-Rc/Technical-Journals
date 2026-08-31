const { pool } = require("../config/db");

const SORT_MAP = {
  relevance: "j.featured DESC, j.created_at DESC",
  title_asc: "j.title ASC",
  title_desc: "j.title DESC",
  newest: "j.created_at DESC",
  oldest: "j.created_at ASC",
};

function buildFilters(query) {
  const where = ["j.status = 'active'"];
  const params = [];

  if (query.search) {
    where.push("(j.title LIKE ? OR j.issn LIKE ? OR j.subject_area LIKE ?)");
    const like = `%${query.search}%`;
    params.push(like, like, like);
  }
  if (query.subject) {
    where.push("j.subject_area = ?");
    params.push(query.subject);
  }
  if (query.category) {
    where.push("j.category = ?");
    params.push(query.category);
  }
  if (query.frequency) {
    where.push("j.frequency = ?");
    params.push(query.frequency);
  }
  if (query.accessType) {
    where.push("j.access_type = ?");
    params.push(query.accessType);
  }
  if (query.language) {
    where.push("j.language = ?");
    params.push(query.language);
  }
  if (query.indexing) {
    // Journals may list several indexing databases comma-separated.
    where.push("FIND_IN_SET(?, REPLACE(j.indexing, ', ', ',')) > 0");
    params.push(query.indexing);
  }
  if (query.featured === "true") {
    where.push("j.featured = 1");
  }

  return { whereSql: where.join(" AND "), params };
}

async function findAll(query, { page, limit, offset }) {
  const { whereSql, params } = buildFilters(query);
  const sort = SORT_MAP[query.sort] || SORT_MAP.relevance;

  const [rows] = await pool.query(
    `SELECT j.*, u.name AS university_name
     FROM journals j
     LEFT JOIN universities u ON u.id = j.university_id
     WHERE ${whereSql}
     ORDER BY ${sort}
     LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  const [countRows] = await pool.query(
    `SELECT COUNT(*) AS total FROM journals j WHERE ${whereSql}`,
    params
  );

  return { rows, total: countRows[0].total };
}

async function findByIdOrSlug(idOrSlug) {
  const isNumeric = /^\d+$/.test(idOrSlug);
  const [rows] = await pool.query(
    `SELECT j.*, u.name AS university_name, u.slug AS university_slug
     FROM journals j
     LEFT JOIN universities u ON u.id = j.university_id
     WHERE ${isNumeric ? "j.id = ?" : "j.slug = ?"} LIMIT 1`,
    [idOrSlug]
  );
  return rows[0] || null;
}

async function findFeatured(limit = 10) {
  const [rows] = await pool.query(
    `SELECT j.*, u.name AS university_name FROM journals j
     LEFT JOIN universities u ON u.id = j.university_id
     WHERE j.status = 'active' AND j.featured = 1
     ORDER BY j.created_at DESC LIMIT ?`,
    [limit]
  );
  return rows;
}

async function getFilterOptions() {
  const [subjects] = await pool.query(
    "SELECT DISTINCT subject_area AS v FROM journals WHERE subject_area IS NOT NULL AND status='active' ORDER BY v"
  );
  const [categories] = await pool.query(
    "SELECT DISTINCT category AS v FROM journals WHERE category IS NOT NULL AND status='active' ORDER BY v"
  );
  const [frequencies] = await pool.query(
    "SELECT DISTINCT frequency AS v FROM journals WHERE frequency IS NOT NULL AND status='active' ORDER BY v"
  );
  const [accessTypes] = await pool.query(
    "SELECT DISTINCT access_type AS v FROM journals WHERE access_type IS NOT NULL AND status='active' ORDER BY v"
  );
  const [languages] = await pool.query(
    "SELECT DISTINCT language AS v FROM journals WHERE language IS NOT NULL AND status='active' ORDER BY v"
  );
  const [indexingRows] = await pool.query(
    "SELECT DISTINCT indexing AS v FROM journals WHERE indexing IS NOT NULL AND status='active'"
  );
  const indexingSet = new Set();
  indexingRows.forEach((r) => r.v.split(",").forEach((i) => indexingSet.add(i.trim())));

  return {
    subjects: subjects.map((r) => r.v),
    categories: categories.map((r) => r.v),
    frequencies: frequencies.map((r) => r.v),
    accessTypes: accessTypes.map((r) => r.v),
    languages: languages.map((r) => r.v),
    indexing: Array.from(indexingSet).sort(),
  };
}

// ---- Admin ----
async function findAllAdmin({ page, limit, offset }, search) {
  const where = [];
  const params = [];
  if (search) {
    where.push("(title LIKE ? OR issn LIKE ?)");
    params.push(`%${search}%`, `%${search}%`);
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const [rows] = await pool.query(
    `SELECT * FROM journals ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  const [countRows] = await pool.query(`SELECT COUNT(*) AS total FROM journals ${whereSql}`, params);
  return { rows, total: countRows[0].total };
}

async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO journals
      (slug, title, short_title, description, about, aims_scope, subject_area, category, issn, eissn, pissn,
       indexing, frequency, access_type, language, publisher, university_id, cover_image, color, icon,
       website_url, review_type, meta_title, meta_description, status, featured)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.slug, data.title, data.short_title || null, data.description || null, data.about || null,
      data.aims_scope || null, data.subject_area || null, data.category || null, data.issn || null,
      data.eissn || null, data.pissn || null, data.indexing || null, data.frequency || null,
      data.access_type || "Open Access", data.language || "English", data.publisher || null,
      data.university_id || null, data.cover_image || null, data.color || null, data.icon || null,
      data.website_url || null, data.review_type || null, data.meta_title || null,
      data.meta_description || null, data.status || "active", data.featured ? 1 : 0,
    ]
  );
  return findByIdOrSlug(String(result.insertId));
}

async function update(id, data) {
  const fields = [];
  const params = [];
  const allowed = [
    "slug", "title", "short_title", "description", "about", "aims_scope", "subject_area", "category",
    "issn", "eissn", "pissn", "indexing", "frequency", "access_type", "language", "publisher",
    "university_id", "cover_image", "color", "icon", "website_url", "review_type", "meta_title",
    "meta_description", "status", "featured",
  ];
  for (const key of allowed) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      params.push(key === "featured" ? (data[key] ? 1 : 0) : data[key]);
    }
  }
  if (fields.length === 0) return findByIdOrSlug(String(id));
  params.push(id);
  await pool.query(`UPDATE journals SET ${fields.join(", ")} WHERE id = ?`, params);
  return findByIdOrSlug(String(id));
}

async function remove(id) {
  await pool.query("DELETE FROM journals WHERE id = ?", [id]);
}

async function findRawById(id) {
  const [rows] = await pool.query("SELECT * FROM journals WHERE id = ?", [id]);
  return rows[0] || null;
}

module.exports = {
  findAll, findByIdOrSlug, findFeatured, getFilterOptions,
  findAllAdmin, create, update, remove, findRawById,
};
