const { Manuscript, Journal } = require("../db/models");
const { nextId, escapeRegex, legacyRecord, numericId } = require("../utils/mongoHelpers");

async function attachJournal(rows, includeSlug = true) {
  const records = legacyRecord(rows);
  const ids = [...new Set(records.map((row) => row.journal_id).filter(Boolean))];
  if (!ids.length) return records;
  const journals = await Journal.find({ id: { $in: ids } }).select({ id: 1, title: 1, short_title: 1, slug: 1, _id: 0 }).lean();
  const map = new Map(journals.map((j) => [j.id, j]));
  return records.map((row) => {
    const journal = map.get(row.journal_id);
    return {
      ...row,
      journal_title: journal?.title || null,
      journal_short_title: journal?.short_title || null,
      ...(includeSlug ? { journal_slug: journal?.slug || null } : {}),
    };
  });
}

async function create(data) {
  const id = await nextId("manuscript_submissions");
  await Manuscript.create({
    id,
    tracking_id: data.tracking_id,
    journal_id: Number(data.journal_id),
    title: data.title,
    author_name: data.author_name,
    email: data.email,
    abstract: data.abstract,
    file_name: data.file_name,
    file_url: data.file_url,
    status: data.status || "submitted",
  });
  return findById(id);
}

async function findById(id) {
  const numeric = numericId(id);
  if (!numeric) return null;
  const row = await Manuscript.findOne({ id: numeric }).lean();
  if (!row) return null;
  const [joined] = await attachJournal([row], true);
  return joined || null;
}

async function findByTrackingId(trackingId) {
  const row = await Manuscript.findOne({ tracking_id: trackingId }).lean();
  if (!row) return null;
  const [joined] = await attachJournal([row], true);
  return joined || null;
}

async function findAllAdmin({ limit, offset }, search = "", status = "") {
  const filter = {};
  if (status) filter.status = status;

  if (search) {
    const regex = { $regex: escapeRegex(search), $options: "i" };
    const matchingJournals = await Journal.find({ title: regex }).select({ id: 1, _id: 0 }).lean();
    filter.$or = [
      { tracking_id: regex },
      { title: regex },
      { author_name: regex },
      { email: regex },
      { journal_id: { $in: matchingJournals.map((j) => j.id) } },
    ];
  }

  const [rows, total] = await Promise.all([
    Manuscript.find(filter)
      .select({ abstract: 0 })
      .sort({ submitted_at: -1 })
      .skip(offset)
      .limit(limit)
      .lean(),
    Manuscript.countDocuments(filter),
  ]);

  return { rows: await attachJournal(rows, false), total };
}

async function updateStatus(id, status) {
  const numeric = numericId(id);
  if (!numeric) return null;
  await Manuscript.updateOne({ id: numeric }, { $set: { status, updated_at: new Date() } });
  return findById(numeric);
}

async function remove(id) {
  const numeric = numericId(id);
  if (!numeric) return false;
  const result = await Manuscript.deleteOne({ id: numeric });
  return result.deletedCount > 0;
}

async function getStats() {
  const statuses = ["submitted", "under_review", "revision_required", "accepted", "rejected"];
  const [total, ...counts] = await Promise.all([
    Manuscript.countDocuments({}),
    ...statuses.map((status) => Manuscript.countDocuments({ status })),
  ]);
  return {
    total,
    submitted: counts[0],
    under_review: counts[1],
    revision_required: counts[2],
    accepted: counts[3],
    rejected: counts[4],
  };
}

module.exports = { create, findById, findByTrackingId, findAllAdmin, updateStatus, remove, getStats };
