const journalModel = require("../models/journalModel");
const asyncHandler = require("../utils/asyncHandler");
const { ok, created, list, fail } = require("../utils/apiResponse");
const { getPagination, buildMeta } = require("../utils/pagination");
const { uniqueSlug } = require("../utils/slug");
const { publicUrl } = require("../utils/upload");

const getJournals = asyncHandler(async (req, res) => {
  const pageInfo = getPagination(req.query);
  const { rows, total } = await journalModel.findAll(req.query, pageInfo);

  return list(
    res,
    rows,
    buildMeta(pageInfo.page, pageInfo.limit, total)
  );
});

const getFeaturedJournals = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const rows = await journalModel.findFeatured(limit);

  return ok(res, rows);
});

const getFilterOptions = asyncHandler(async (_req, res) => {
  const options = await journalModel.getFilterOptions();

  return ok(res, options);
});

const getJournalByIdOrSlug = asyncHandler(async (req, res) => {
  const journal = await journalModel.findByIdOrSlug(
    req.params.idOrSlug
  );

  if (!journal) {
    return fail(res, "Journal not found", 404);
  }

  return ok(res, journal);
});

// ======================================================
// ADMIN
// ======================================================

const adminListJournals = asyncHandler(async (req, res) => {
  const pageInfo = getPagination(req.query);

  const { rows, total } = await journalModel.findAllAdmin(
    pageInfo,
    req.query.search
  );

  return list(
    res,
    rows,
    buildMeta(pageInfo.page, pageInfo.limit, total)
  );
});

const adminGetJournal = asyncHandler(async (req, res) => {
  const journal = await journalModel.findRawById(req.params.id);

  if (!journal) {
    return fail(res, "Journal not found", 404);
  }

  return ok(res, journal);
});

// ======================================================
// CREATE JOURNAL
// ======================================================

const adminCreateJournal = asyncHandler(async (req, res) => {
  const body = { ...req.body };

  if (!body.title) {
    return fail(res, "Title is required", 422);
  }

  // Fix university_id
  body.university_id =
    body.university_id === "" ||
    body.university_id === undefined ||
    body.university_id === null
      ? null
      : Number(body.university_id);

  // Optional validation
  if (
    body.university_id !== null &&
    Number.isNaN(body.university_id)
  ) {
    return fail(res, "Invalid university id", 422);
  }

  const slug = await uniqueSlug(
    "journals",
    body.slug || body.title
  );

  const cover_image = req.file
    ? publicUrl("journals", req.file.filename)
    : body.cover_image || null;

  const journal = await journalModel.create({
    ...body,
    slug,
    cover_image,
  });

  return created(
    res,
    journal,
    "Journal created successfully"
  );
});

// ======================================================
// UPDATE JOURNAL
// ======================================================

const adminUpdateJournal = asyncHandler(async (req, res) => {
  const existing = await journalModel.findRawById(
    req.params.id
  );

  if (!existing) {
    return fail(res, "Journal not found", 404);
  }

  const body = { ...req.body };

  // Fix university_id
  if (Object.prototype.hasOwnProperty.call(body, "university_id")) {
    body.university_id =
      body.university_id === "" ||
      body.university_id === undefined ||
      body.university_id === null
        ? null
        : Number(body.university_id);

    if (
      body.university_id !== null &&
      Number.isNaN(body.university_id)
    ) {
      return fail(res, "Invalid university id", 422);
    }
  }

  if (
    body.title &&
    body.title !== existing.title &&
    !body.slug
  ) {
    body.slug = await uniqueSlug(
      "journals",
      body.title,
      req.params.id
    );
  }

  if (req.file) {
    body.cover_image = publicUrl(
      "journals",
      req.file.filename
    );
  }

  const journal = await journalModel.update(
    req.params.id,
    body
  );

  return ok(
    res,
    journal,
    "Journal updated successfully"
  );
});

// ======================================================
// DELETE JOURNAL
// ======================================================

const adminDeleteJournal = asyncHandler(async (req, res) => {
  const existing = await journalModel.findRawById(
    req.params.id
  );

  if (!existing) {
    return fail(res, "Journal not found", 404);
  }

  await journalModel.remove(req.params.id);

  return ok(
    res,
    null,
    "Journal deleted successfully"
  );
});

module.exports = {
  getJournals,
  getFeaturedJournals,
  getFilterOptions,
  getJournalByIdOrSlug,

  adminListJournals,
  adminGetJournal,
  adminCreateJournal,
  adminUpdateJournal,
  adminDeleteJournal,
};