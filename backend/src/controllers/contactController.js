const enquiryModel = require("../models/enquiryModel");
const asyncHandler = require("../utils/asyncHandler");
const { ok, created, list, fail } = require("../utils/apiResponse");
const { getPagination, buildMeta } = require("../utils/pagination");
const { sendContactNotification, sendContactAcknowledgement } = require("../utils/mailer");

const submitContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const errors = [];
  if (!name || name.trim().length < 2) errors.push("Please provide your name.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Please provide a valid email address.");
  if (!subject || subject.trim().length < 2) errors.push("Please provide a subject.");
  if (!message || message.trim().length < 5) errors.push("Please provide a message.");
  if (errors.length) return fail(res, "Validation failed", 422, errors);

  // Save first — the enquiry must never be lost even if email sending fails.
  const enquiry = await enquiryModel.create({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() });

  const [notifyResult, ackResult] = await Promise.all([
    sendContactNotification(enquiry),
    sendContactAcknowledgement(enquiry),
  ]);
  if (notifyResult.error) console.error("[contact] admin notification email failed:", notifyResult.error);
  if (ackResult.error) console.error("[contact] acknowledgement email failed:", ackResult.error);

  return created(res, { id: enquiry.id }, "Your message has been sent successfully. Our team will respond shortly.");
});

// ---- Admin ----
const adminListEnquiries = asyncHandler(async (req, res) => {
  const pageInfo = getPagination(req.query);
  const { rows, total } = await enquiryModel.findAll(pageInfo, req.query.status);
  return list(res, rows, buildMeta(pageInfo.page, pageInfo.limit, total));
});

const adminGetEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await enquiryModel.findById(req.params.id);
  if (!enquiry) return fail(res, "Enquiry not found", 404);
  return ok(res, enquiry);
});

const adminUpdateStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;
  const allowed = ["new", "read", "replied", "closed"];
  if (!allowed.includes(status)) return fail(res, "Invalid status value", 422);

  const existing = await enquiryModel.findById(req.params.id);
  if (!existing) return fail(res, "Enquiry not found", 404);

  const enquiry = await enquiryModel.updateStatus(req.params.id, status, adminNotes);
  return ok(res, enquiry, "Enquiry updated successfully");
});

const adminDeleteEnquiry = asyncHandler(async (req, res) => {
  const existing = await enquiryModel.findById(req.params.id);
  if (!existing) return fail(res, "Enquiry not found", 404);
  await enquiryModel.remove(req.params.id);
  return ok(res, null, "Enquiry deleted successfully");
});

module.exports = { submitContact, adminListEnquiries, adminGetEnquiry, adminUpdateStatus, adminDeleteEnquiry };
