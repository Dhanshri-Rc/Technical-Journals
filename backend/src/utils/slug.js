const slugify = require("slugify");
const { Journal, Conference, University } = require("../db/models");

const MODEL_MAP = {
  journals: Journal,
  conferences: Conference,
  universities: University,
};

function baseSlug(text) {
  return slugify(text, { lower: true, strict: true, trim: true });
}

async function uniqueSlug(table, text, excludeId = null) {
  const Model = MODEL_MAP[table];
  if (!Model) throw new Error(`Unsupported slug collection: ${table}`);

  const base = baseSlug(text) || "item";
  let candidate = base;
  let suffix = 1;

  while (true) {
    const filter = { slug: candidate };
    if (excludeId !== null && excludeId !== undefined) filter.id = { $ne: Number(excludeId) };
    const exists = await Model.exists(filter);
    if (!exists) return candidate;
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
}

module.exports = { baseSlug, uniqueSlug };
