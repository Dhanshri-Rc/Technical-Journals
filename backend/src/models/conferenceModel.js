const { Conference } = require("../db/models");
const {
  nextId,
  escapeRegex,
  asFlag,
  legacyRecord,
  numericId,
  localDateString,
  addMonthsDateString,
} = require("../utils/mongoHelpers");

const SORT_MAP = {
  upcoming: { start_date: 1 },
  newest: { created_at: -1 },
  title: { title: 1 },
  location: { location: 1 },
};

function buildFilters(query) {
  const filter = { status: "active" };

  const andGroups = [];
  if (query.search) {
    const regex = { $regex: escapeRegex(query.search), $options: "i" };
    andGroups.push({ $or: [{ title: regex }, { code: regex }, { organizer: regex }] });
  }
  if (query.type) filter.conference_type = query.type;
  if (query.subject) filter.subject_area = query.subject;
  if (query.location) {
    const regex = { $regex: escapeRegex(query.location), $options: "i" };
    andGroups.push({ $or: [{ location: regex }, { city: regex }, { country: regex }] });
  }
  if (andGroups.length) filter.$and = andGroups;
  if (query.region) filter.region = query.region;

  switch (query.dateRange) {
    case "upcoming":
      filter.start_date = { $gte: localDateString() };
      break;
    case "next3-6":
      filter.start_date = { $gte: addMonthsDateString(3), $lte: addMonthsDateString(6) };
      break;
    case "next6-12":
      filter.start_date = { $gte: addMonthsDateString(6), $lte: addMonthsDateString(12) };
      break;
    case "past":
      filter.start_date = { $lt: localDateString() };
      break;
    default:
      break;
  }

  if (query.featured === "true") filter.featured = 1;
  return filter;
}

async function findAll(query, { limit, offset }) {
  const filter = buildFilters(query);
  const sort = SORT_MAP[query.sort] || SORT_MAP.upcoming;
  const [rows, total] = await Promise.all([
    Conference.find(filter).sort(sort).skip(offset).limit(limit).lean(),
    Conference.countDocuments(filter),
  ]);
  return { rows: legacyRecord(rows), total };
}

async function findByIdOrSlug(idOrSlug) {
  const isNumeric = /^\d+$/.test(String(idOrSlug));
  const filter = isNumeric ? { id: Number(idOrSlug) } : { slug: idOrSlug };
  const row = await Conference.findOne(filter).lean();
  return row ? legacyRecord(row) : null;
}

async function distinctActive(field) {
  const values = await Conference.distinct(field, { status: "active", [field]: { $nin: [null, ""] } });
  return values.sort((a, b) => String(a).localeCompare(String(b)));
}

async function getFilterOptions() {
  const [types, subjects, regions] = await Promise.all([
    distinctActive("conference_type"),
    distinctActive("subject_area"),
    distinctActive("region"),
  ]);
  return { types, subjects, regions, dateRanges: ["upcoming", "next3-6", "next6-12", "past"] };
}

async function findAllAdmin({ limit, offset }, search) {
  const filter = {};
  if (search) {
    const regex = { $regex: escapeRegex(search), $options: "i" };
    filter.$or = [{ title: regex }, { code: regex }];
  }
  const [rows, total] = await Promise.all([
    Conference.find(filter).sort({ created_at: -1 }).skip(offset).limit(limit).lean(),
    Conference.countDocuments(filter),
  ]);
  return { rows: legacyRecord(rows), total };
}

async function create(data) {
  const id = await nextId("conferences");
  await Conference.create({
    id,
    slug: data.slug,
    code: data.code || null,
    title: data.title,
    conference_type: data.conference_type || null,
    subject_area: data.subject_area || null,
    organizer: data.organizer || null,
    description: data.description || null,
    topics: data.topics || null,
    start_date: data.start_date || null,
    end_date: data.end_date || null,
    display_date: data.display_date || null,
    location: data.location || null,
    city: data.city || null,
    country: data.country || null,
    region: data.region || null,
    venue: data.venue || null,
    conference_mode: data.conference_mode || "In-Person",
    registration_url: data.registration_url || null,
    image: data.image || null,
    color: data.color || null,
    status: data.status || "active",
    featured: asFlag(data.featured),
  });
  return findByIdOrSlug(String(id));
}

async function update(id, data) {
  const numeric = numericId(id);
  if (!numeric) return null;
  const allowed = [
    "slug", "code", "title", "conference_type", "subject_area", "organizer", "description", "topics",
    "start_date", "end_date", "display_date", "location", "city", "country", "region", "venue",
    "conference_mode", "registration_url", "image", "color", "status", "featured",
  ];
  const updateDoc = {};
  for (const key of allowed) {
    if (data[key] !== undefined) updateDoc[key] = key === "featured" ? asFlag(data[key]) : data[key];
  }
  if (Object.keys(updateDoc).length) await Conference.updateOne({ id: numeric }, { $set: updateDoc });
  return findByIdOrSlug(String(numeric));
}

async function remove(id) {
  const numeric = numericId(id);
  if (!numeric) return false;
  const result = await Conference.deleteOne({ id: numeric });
  return result.deletedCount > 0;
}

async function findRawById(id) {
  const numeric = numericId(id);
  if (!numeric) return null;
  const row = await Conference.findOne({ id: numeric }).lean();
  return row ? legacyRecord(row) : null;
}

module.exports = {
  findAll, findByIdOrSlug, getFilterOptions, findAllAdmin, create, update, remove, findRawById,
};
