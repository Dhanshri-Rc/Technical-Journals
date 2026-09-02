const { Enquiry } = require("../db/models");
const { nextId, legacyRecord, numericId } = require("../utils/mongoHelpers");

async function create({ name, email, subject, message }) {
  const id = await nextId("contact_enquiries");
  await Enquiry.create({ id, name, email, subject, message, status: "new" });
  return findById(id);
}

async function findAll({ limit, offset }, status) {
  const filter = status ? { status } : {};
  const [rows, total] = await Promise.all([
    Enquiry.find(filter).sort({ created_at: -1 }).skip(offset).limit(limit).lean(),
    Enquiry.countDocuments(filter),
  ]);
  return { rows: legacyRecord(rows), total };
}

async function findById(id) {
  const numeric = numericId(id);
  if (!numeric) return null;
  const row = await Enquiry.findOne({ id: numeric }).lean();
  return row ? legacyRecord(row) : null;
}

async function updateStatus(id, status, adminNotes) {
  const numeric = numericId(id);
  if (!numeric) return null;
  const update = { status };
  if (adminNotes !== undefined) update.admin_notes = adminNotes;
  await Enquiry.updateOne({ id: numeric }, { $set: update });
  return findById(numeric);
}

async function remove(id) {
  const numeric = numericId(id);
  if (!numeric) return false;
  const result = await Enquiry.deleteOne({ id: numeric });
  return result.deletedCount > 0;
}

module.exports = { create, findAll, findById, updateStatus, remove };
