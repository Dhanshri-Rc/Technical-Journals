const { FooterSettings } = require("../db/models");
const { nextId, legacyRecord, numericId } = require("../utils/mongoHelpers");

async function findPublic() {
  const row = await FooterSettings.findOne({ status: "active" }).sort({ updated_at: -1, created_at: -1 }).lean();
  return row ? legacyRecord(row) : null;
}

async function findAll() {
  const rows = await FooterSettings.find({}).sort({ updated_at: -1, created_at: -1 }).lean();
  return legacyRecord(rows);
}

async function findById(id) {
  const numeric = numericId(id);
  if (!numeric) return null;
  const row = await FooterSettings.findOne({ id: numeric }).lean();
  return row ? legacyRecord(row) : null;
}

async function create(data) {
  const id = await nextId("footer_settings");
  await FooterSettings.create({
    id,
    address: data.address,
    email: data.email,
    phone: data.phone,
    social: {
      facebook: data.social?.facebook || "",
      linkedin: data.social?.linkedin || "",
      twitter: data.social?.twitter || "",
      youtube: data.social?.youtube || "",
    },
    status: data.status || "active",
  });
  return findById(id);
}

async function update(id, data) {
  const numeric = numericId(id);
  if (!numeric) return null;
  const updateDoc = {};

  for (const field of ["address", "email", "phone", "status"]) {
    if (data[field] !== undefined) updateDoc[field] = data[field];
  }

  if (data.social && typeof data.social === "object") {
    for (const key of ["facebook", "linkedin", "twitter", "youtube"]) {
      if (data.social[key] !== undefined) updateDoc[`social.${key}`] = data.social[key];
    }
  }

  if (Object.keys(updateDoc).length) {
    await FooterSettings.updateOne({ id: numeric }, { $set: updateDoc });
  }
  return findById(numeric);
}

async function remove(id) {
  const numeric = numericId(id);
  if (!numeric) return false;
  const result = await FooterSettings.deleteOne({ id: numeric });
  return result.deletedCount > 0;
}

module.exports = { findPublic, findAll, findById, create, update, remove };
