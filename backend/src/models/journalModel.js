const { Journal, University } = require("../db/models");
const { nextId, escapeRegex, asFlag, legacyRecord, numericId } = require("../utils/mongoHelpers");

const SORT_MAP = {
  relevance: { featured: -1, created_at: -1 },
  title_asc: { title: 1 },
  title_desc: { title: -1 },
  newest: { created_at: -1 },
  oldest: { created_at: 1 },
};

function buildFilters(query) {
  const filter = { status: "active" };
  if (query.search) {
    const regex = { $regex: escapeRegex(query.search), $options: "i" };
    filter.$or = [{ title: regex }, { issn: regex }, { subject_area: regex }];
  }
  if (query.subject) filter.subject_area = query.subject;
  if (query.category) filter.category = query.category;
  if (query.frequency) filter.frequency = query.frequency;
  if (query.accessType) filter.access_type = query.accessType;
  if (query.language) filter.language = query.language;
  if (query.indexing) {
    const token = escapeRegex(query.indexing);
    filter.indexing = { $regex: `(^|,\\s*)${token}(\\s*,|$)`, $options: "i" };
  }
  if (query.featured === "true") filter.featured = 1;
  return filter;
}

async function attachUniversity(rows, includeSlug = false) {
  const records = legacyRecord(rows);
  const ids = [...new Set(records.map((row) => row.university_id).filter((id) => id !== null && id !== undefined))];
  if (!ids.length) return records;
  const universities = await University.find({ id: { $in: ids } }).select({ id: 1, name: 1, slug: 1, _id: 0 }).lean();
  const map = new Map(universities.map((u) => [u.id, u]));
  return records.map((row) => {
    const university = map.get(row.university_id);
    return {
      ...row,
      university_name: university?.name || null,
      ...(includeSlug ? { university_slug: university?.slug || null } : {}),
    };
  });
}

async function findAll(query, { limit, offset }) {
  const filter = buildFilters(query);
  const sort = SORT_MAP[query.sort] || SORT_MAP.relevance;
  const [rows, total] = await Promise.all([
    Journal.find(filter).sort(sort).skip(offset).limit(limit).lean(),
    Journal.countDocuments(filter),
  ]);
  return { rows: await attachUniversity(rows), total };
}

async function findByIdOrSlug(idOrSlug) {
  const isNumeric = /^\d+$/.test(String(idOrSlug));
  const filter = isNumeric ? { id: Number(idOrSlug) } : { slug: idOrSlug };
  const row = await Journal.findOne(filter).lean();
  if (!row) return null;
  const [joined] = await attachUniversity([row], true);
  return joined || null;
}

async function findFeatured(limit = 10) {
  const rows = await Journal.find({ status: "active", featured: 1 }).sort({ created_at: -1 }).limit(Number(limit)).lean();
  return attachUniversity(rows);
}

async function distinctActive(field) {
  const values = await Journal.distinct(field, { status: "active", [field]: { $nin: [null, ""] } });
  return values.sort((a, b) => String(a).localeCompare(String(b)));
}

async function getFilterOptions() {
  const [subjects, categories, frequencies, accessTypes, languages, indexingRows] = await Promise.all([
    distinctActive("subject_area"),
    distinctActive("category"),
    distinctActive("frequency"),
    distinctActive("access_type"),
    distinctActive("language"),
    distinctActive("indexing"),
  ]);
  const indexingSet = new Set();
  indexingRows.forEach((value) => String(value).split(",").forEach((item) => indexingSet.add(item.trim())));
  return { subjects, categories, frequencies, accessTypes, languages, indexing: Array.from(indexingSet).filter(Boolean).sort() };
}

async function findAllAdmin({ limit, offset }, search) {
  const filter = {};
  if (search) {
    const regex = { $regex: escapeRegex(search), $options: "i" };
    filter.$or = [{ title: regex }, { issn: regex }];
  }
  const [rows, total] = await Promise.all([
    Journal.find(filter).sort({ created_at: -1 }).skip(offset).limit(limit).lean(),
    Journal.countDocuments(filter),
  ]);
  return { rows: legacyRecord(rows), total };
}

async function create(data) {
  const id = await nextId("journals");
  await Journal.create({
    id,
    slug: data.slug,
    title: data.title,
    short_title: data.short_title || null,
    description: data.description || null,
    about: data.about || null,
    aims_scope: data.aims_scope || null,
    subject_area: data.subject_area || null,
    category: data.category || null,
    issn: data.issn || null,
    eissn: data.eissn || null,
    pissn: data.pissn || null,
    indexing: data.indexing || null,
    frequency: data.frequency || null,
    access_type: data.access_type || "Open Access",
    language: data.language || "English",
    publisher: data.publisher || null,
    university_id: data.university_id || null,
    cover_image: data.cover_image || null,
    color: data.color || null,
    icon: data.icon || null,
    website_url: data.website_url || null,
    review_type: data.review_type || null,
    meta_title: data.meta_title || null,
    meta_description: data.meta_description || null,
    status: data.status || "active",
    featured: asFlag(data.featured),
  });
  return findByIdOrSlug(String(id));
}

async function update(id, data) {
  const numeric = numericId(id);
  if (!numeric) return null;
  const allowed = [
    "slug", "title", "short_title", "description", "about", "aims_scope", "subject_area", "category",
    "issn", "eissn", "pissn", "indexing", "frequency", "access_type", "language", "publisher",
    "university_id", "cover_image", "color", "icon", "website_url", "review_type", "meta_title",
    "meta_description", "status", "featured",
  ];
  const updateDoc = {};
  for (const key of allowed) {
    if (data[key] !== undefined) updateDoc[key] = key === "featured" ? asFlag(data[key]) : data[key];
  }
  if (Object.keys(updateDoc).length) await Journal.updateOne({ id: numeric }, { $set: updateDoc });
  return findByIdOrSlug(String(numeric));
}

async function remove(id) {
  const numeric = numericId(id);
  if (!numeric) return false;
  const result = await Journal.deleteOne({ id: numeric });
  return result.deletedCount > 0;
}

async function findRawById(id) {
  const numeric = numericId(id);
  if (!numeric) return null;
  const row = await Journal.findOne({ id: numeric }).lean();
  return row ? legacyRecord(row) : null;
}

module.exports = {
  findAll, findByIdOrSlug, findFeatured, getFilterOptions,
  findAllAdmin, create, update, remove, findRawById,
};
