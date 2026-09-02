const footerSettingsModel = require("../models/footerSettingsModel");
const asyncHandler = require("../utils/asyncHandler");
const { ok, created, fail } = require("../utils/apiResponse");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s0-9]{7,25}$/;
const SOCIAL_KEYS = ["facebook", "linkedin", "twitter", "youtube"];

function validUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validate(body, partial = false) {
  const errors = [];

  if (!partial || body.address !== undefined) {
    if (!String(body.address || "").trim()) errors.push("Address is required.");
  }
  if (!partial || body.email !== undefined) {
    if (!EMAIL_RE.test(String(body.email || "").trim())) errors.push("Please provide a valid email address.");
  }
  if (!partial || body.phone !== undefined) {
    if (!PHONE_RE.test(String(body.phone || "").trim())) errors.push("Please provide a valid phone number.");
  }
  if (body.status !== undefined && !["active", "inactive"].includes(body.status)) {
    errors.push("Status must be active or inactive.");
  }
  if (body.social !== undefined) {
    if (!body.social || typeof body.social !== "object" || Array.isArray(body.social)) {
      errors.push("Social links must be an object.");
    } else {
      SOCIAL_KEYS.forEach((key) => {
        if (body.social[key] !== undefined && !validUrl(String(body.social[key]).trim())) {
          errors.push(`${key} must be a valid http(s) URL.`);
        }
      });
    }
  }

  return errors;
}

function clean(body) {
  const data = { ...body };
  if (data.address !== undefined) data.address = String(data.address).trim();
  if (data.email !== undefined) data.email = String(data.email).trim().toLowerCase();
  if (data.phone !== undefined) data.phone = String(data.phone).trim();
  if (data.social && typeof data.social === "object") {
    data.social = { ...data.social };
    SOCIAL_KEYS.forEach((key) => {
      if (data.social[key] !== undefined) data.social[key] = String(data.social[key]).trim();
    });
  }
  return data;
}

const getPublicFooterSettings = asyncHandler(async (_req, res) => {
  const settings = await footerSettingsModel.findPublic();
  return ok(res, settings);
});

const adminListFooterSettings = asyncHandler(async (_req, res) => {
  const settings = await footerSettingsModel.findAll();
  return ok(res, settings);
});

const adminGetFooterSettings = asyncHandler(async (req, res) => {
  const settings = await footerSettingsModel.findById(req.params.id);
  if (!settings) return fail(res, "Footer settings not found", 404);
  return ok(res, settings);
});

const adminCreateFooterSettings = asyncHandler(async (req, res) => {
  const errors = validate(req.body, false);
  if (errors.length) return fail(res, "Validation failed", 422, errors);
  const settings = await footerSettingsModel.create(clean(req.body));
  return created(res, settings, "Footer settings created successfully");
});

const adminUpdateFooterSettings = asyncHandler(async (req, res) => {
  const existing = await footerSettingsModel.findById(req.params.id);
  if (!existing) return fail(res, "Footer settings not found", 404);

  const partial = req.method === "PATCH";
  const errors = validate(req.body, partial);
  if (errors.length) return fail(res, "Validation failed", 422, errors);

  const settings = await footerSettingsModel.update(req.params.id, clean(req.body));
  return ok(res, settings, "Footer settings updated successfully");
});

const adminDeleteFooterSettings = asyncHandler(async (req, res) => {
  const existing = await footerSettingsModel.findById(req.params.id);
  if (!existing) return fail(res, "Footer settings not found", 404);
  await footerSettingsModel.remove(req.params.id);
  return ok(res, null, "Footer settings deleted successfully");
});

module.exports = {
  getPublicFooterSettings,
  adminListFooterSettings,
  adminGetFooterSettings,
  adminCreateFooterSettings,
  adminUpdateFooterSettings,
  adminDeleteFooterSettings,
};
