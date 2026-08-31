const conferenceModel = require("../models/conferenceModel");
const asyncHandler = require("../utils/asyncHandler");
const { ok, created, list, fail } = require("../utils/apiResponse");
const { getPagination, buildMeta } = require("../utils/pagination");
const { uniqueSlug } = require("../utils/slug");
const { publicUrl } = require("../utils/upload");

const getConferences = asyncHandler(async (req, res) => {
  const pageInfo = getPagination(req.query);
  const { rows, total } = await conferenceModel.findAll(req.query, pageInfo);
  return list(res, rows, buildMeta(pageInfo.page, pageInfo.limit, total));
});

const getFilterOptions = asyncHandler(async (_req, res) => {
  const options = await conferenceModel.getFilterOptions();
  return ok(res, options);
});

const getConferenceByIdOrSlug = asyncHandler(async (req, res) => {
  const conference = await conferenceModel.findByIdOrSlug(req.params.idOrSlug);
  if (!conference) return fail(res, "Conference not found", 404);
  return ok(res, conference);
});

// ---- Admin ----
const adminListConferences = asyncHandler(async (req, res) => {
  const pageInfo = getPagination(req.query);
  const { rows, total } = await conferenceModel.findAllAdmin(pageInfo, req.query.search);
  return list(res, rows, buildMeta(pageInfo.page, pageInfo.limit, total));
});

const adminGetConference = asyncHandler(async (req, res) => {
  const conference = await conferenceModel.findRawById(req.params.id);
  if (!conference) return fail(res, "Conference not found", 404);
  return ok(res, conference);
});

const adminCreateConference = asyncHandler(async (req, res) => {
  const body = req.body;
  if (!body.title) return fail(res, "Title is required", 422);

  const slug = await uniqueSlug("conferences", body.slug || body.title);
  const image = req.file ? publicUrl("conferences", req.file.filename) : body.image || null;

  const conference = await conferenceModel.create({ ...body, slug, image });
  return created(res, conference, "Conference created successfully");
});

const adminUpdateConference = asyncHandler(async (req, res) => {
  const existing = await conferenceModel.findRawById(req.params.id);
  if (!existing) return fail(res, "Conference not found", 404);

  const body = { ...req.body };
  if (body.title && body.title !== existing.title && !body.slug) {
    body.slug = await uniqueSlug("conferences", body.title, req.params.id);
  }
  if (req.file) {
    body.image = publicUrl("conferences", req.file.filename);
  }

  const conference = await conferenceModel.update(req.params.id, body);
  return ok(res, conference, "Conference updated successfully");
});

const adminDeleteConference = asyncHandler(async (req, res) => {
  const existing = await conferenceModel.findRawById(req.params.id);
  if (!existing) return fail(res, "Conference not found", 404);
  await conferenceModel.remove(req.params.id);
  return ok(res, null, "Conference deleted successfully");
});

module.exports = {
  getConferences, getFilterOptions, getConferenceByIdOrSlug,
  adminListConferences, adminGetConference, adminCreateConference, adminUpdateConference, adminDeleteConference,
};
