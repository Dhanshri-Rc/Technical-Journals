const { University, Journal } = require("../db/models");
const { nextId, escapeRegex, asFlag, legacyRecord, numericId } = require("../utils/mongoHelpers");

async function findAll({ featured, limit } = {}) {
  const filter = { status: "active" };
  if (featured === "true") filter.featured = 1;

  let query = University.find(filter).sort({ display_order: 1, name: 1 });
  if (limit) query = query.limit(Number(limit));
  const rows = await query.lean();
  return legacyRecord(rows);
}

async function findByIdOrSlug(idOrSlug) {
  const isNumeric = /^\d+$/.test(String(idOrSlug));
  const filter = isNumeric ? { id: Number(idOrSlug) } : { slug: idOrSlug };
  const row = await University.findOne(filter).lean();
  return row ? legacyRecord(row) : null;
}

async function findAllAdmin({ limit, offset }, search) {
  const filter = {};
  if (search) filter.name = { $regex: escapeRegex(search), $options: "i" };
  const [rows, total] = await Promise.all([
    University.find(filter).sort({ display_order: 1, created_at: -1 }).skip(offset).limit(limit).lean(),
    University.countDocuments(filter),
  ]);
  return { rows: legacyRecord(rows), total };
}

async function create(data) {
  const id = await nextId("universities");
  await University.create({
    id,
    name: data.name,
    slug: data.slug,
    country: data.country || null,
    logo: data.logo || null,
    journals_count: Number(data.journals_count) || 0,
    website_url: data.website_url || null,
    description: data.description || null,
    status: data.status || "active",
    display_order: Number(data.display_order) || 0,
    featured: asFlag(data.featured),
  });
  return findByIdOrSlug(String(id));
}

async function update(id, data) {
  const numeric = numericId(id);
  if (!numeric) return null;
  const allowed = ["name", "slug", "country", "logo", "journals_count", "website_url", "description", "status", "display_order", "featured"];
  const updateDoc = {};
  for (const key of allowed) {
    if (data[key] !== undefined) {
      if (key === "featured") updateDoc[key] = asFlag(data[key]);
      else if (key === "journals_count" || key === "display_order") updateDoc[key] = Number(data[key]) || 0;
      else updateDoc[key] = data[key];
    }
  }
  if (Object.keys(updateDoc).length) await University.updateOne({ id: numeric }, { $set: updateDoc });
  return findByIdOrSlug(String(numeric));
}

async function remove(id) {
  const numeric = numericId(id);
  if (!numeric) return false;
  await Journal.updateMany({ university_id: numeric }, { $set: { university_id: null } });
  const result = await University.deleteOne({ id: numeric });
  return result.deletedCount > 0;
}

async function findRawById(id) {
  const numeric = numericId(id);
  if (!numeric) return null;
  const row = await University.findOne({ id: numeric }).lean();
  return row ? legacyRecord(row) : null;
}

module.exports = { findAll, findByIdOrSlug, findAllAdmin, create, update, remove, findRawById };
