const universityModel = require("../models/universityModel");
const asyncHandler = require("../utils/asyncHandler");
const { ok, created, list, fail } = require("../utils/apiResponse");
const { getPagination, buildMeta } = require("../utils/pagination");
const { uniqueSlug } = require("../utils/slug");
const { publicUrl } = require("../utils/upload");

const getUniversities = asyncHandler(async (req, res) => {
  const rows = await universityModel.findAll(req.query);
  return ok(res, rows);
});

const getUniversityByIdOrSlug = asyncHandler(async (req, res) => {
  const university = await universityModel.findByIdOrSlug(req.params.idOrSlug);
  if (!university) return fail(res, "University not found", 404);
  return ok(res, university);
});

// ---- Admin ----
const adminListUniversities = asyncHandler(async (req, res) => {
  const pageInfo = getPagination(req.query);
  const { rows, total } = await universityModel.findAllAdmin(pageInfo, req.query.search);
  return list(res, rows, buildMeta(pageInfo.page, pageInfo.limit, total));
});

const adminGetUniversity = asyncHandler(async (req, res) => {
  const university = await universityModel.findRawById(req.params.id);
  if (!university) return fail(res, "University not found", 404);
  return ok(res, university);
});

const adminCreateUniversity = asyncHandler(async (req, res) => {
  const body = req.body;
  if (!body.name) return fail(res, "University name is required", 422);

  const slug = await uniqueSlug("universities", body.slug || body.name);
  const logo = req.file ? publicUrl("universities", req.file.filename) : body.logo || null;

  const university = await universityModel.create({ ...body, slug, logo });
  return created(res, university, "University created successfully");
});

const adminUpdateUniversity = asyncHandler(async (req, res) => {
  const existing = await universityModel.findRawById(req.params.id);
  if (!existing) return fail(res, "University not found", 404);

  const body = { ...req.body };
  if (body.name && body.name !== existing.name && !body.slug) {
    body.slug = await uniqueSlug("universities", body.name, req.params.id);
  }
  if (req.file) {
    body.logo = publicUrl("universities", req.file.filename);
  }

  const university = await universityModel.update(req.params.id, body);
  return ok(res, university, "University updated successfully");
});

const adminDeleteUniversity = asyncHandler(async (req, res) => {
  const existing = await universityModel.findRawById(req.params.id);
  if (!existing) return fail(res, "University not found", 404);
  await universityModel.remove(req.params.id);
  return ok(res, null, "University deleted successfully");
});

module.exports = {
  getUniversities, getUniversityByIdOrSlug,
  adminListUniversities, adminGetUniversity, adminCreateUniversity, adminUpdateUniversity, adminDeleteUniversity,
};
