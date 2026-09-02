// const router = require("express").Router();
// const { authenticateToken, requireAdmin } = require("../middleware/auth");
// const { makeUploader } = require("../utils/upload");

// const journalController = require("../controllers/journalController");
// const conferenceController = require("../controllers/conferenceController");
// const universityController = require("../controllers/universityController");
// const contactController = require("../controllers/contactController");
// const dashboardController = require("../controllers/dashboardController");

// const journalUpload = makeUploader("journals");
// const conferenceUpload = makeUploader("conferences");
// const universityUpload = makeUploader("universities");

// // Every route below requires a valid admin JWT.
// router.use(authenticateToken, requireAdmin);

// // Dashboard
// router.get("/dashboard/stats", dashboardController.getStats);

// // Journals
// router.get("/journals", journalController.adminListJournals);
// router.get("/journals/:id", journalController.adminGetJournal);
// router.post("/journals", journalUpload.single("cover_image"), journalController.adminCreateJournal);
// router.put("/journals/:id", journalUpload.single("cover_image"), journalController.adminUpdateJournal);
// router.delete("/journals/:id", journalController.adminDeleteJournal);

// // Conferences
// router.get("/conferences", conferenceController.adminListConferences);
// router.get("/conferences/:id", conferenceController.adminGetConference);
// router.post("/conferences", conferenceUpload.single("image"), conferenceController.adminCreateConference);
// router.put("/conferences/:id", conferenceUpload.single("image"), conferenceController.adminUpdateConference);
// router.delete("/conferences/:id", conferenceController.adminDeleteConference);

// // Universities
// router.get("/universities", universityController.adminListUniversities);
// router.get("/universities/:id", universityController.adminGetUniversity);
// router.post("/universities", universityUpload.single("logo"), universityController.adminCreateUniversity);
// router.put("/universities/:id", universityUpload.single("logo"), universityController.adminUpdateUniversity);
// router.delete("/universities/:id", universityController.adminDeleteUniversity);

// // Enquiries
// router.get("/enquiries", contactController.adminListEnquiries);
// router.get("/enquiries/:id", contactController.adminGetEnquiry);
// router.patch("/enquiries/:id/status", contactController.adminUpdateStatus);
// router.delete("/enquiries/:id", contactController.adminDeleteEnquiry);

// module.exports = router;



const router = require("express").Router();

const {
  authenticateToken,
  requireAdmin,
} = require("../middleware/auth");

const {
  makeUploader,
} = require("../utils/upload");

/* ======================================================
   CONTROLLERS
====================================================== */

const journalController = require(
  "../controllers/journalController"
);

const conferenceController = require(
  "../controllers/conferenceController"
);

const universityController = require(
  "../controllers/universityController"
);

const contactController = require(
  "../controllers/contactController"
);

const dashboardController = require(
  "../controllers/dashboardController"
);

const manuscriptController = require(
  "../controllers/manuscriptController"
);

const footerSettingsController = require(
  "../controllers/footerSettingsController"
);

/* ======================================================
   UPLOADERS
====================================================== */

const journalUpload =
  makeUploader("journals");

const conferenceUpload =
  makeUploader("conferences");

const universityUpload =
  makeUploader("universities");

/* ======================================================
   ADMIN AUTHENTICATION

   Every route below requires:
   1. Valid JWT
   2. Admin role
====================================================== */

router.use(
  authenticateToken,
  requireAdmin
);

/* ======================================================
   DASHBOARD
====================================================== */

router.get(
  "/dashboard/stats",
  dashboardController.getStats
);

/* ======================================================
   JOURNALS
====================================================== */

router.get(
  "/journals",
  journalController.adminListJournals
);

router.get(
  "/journals/:id",
  journalController.adminGetJournal
);

router.post(
  "/journals",
  journalUpload.single("cover_image"),
  journalController.adminCreateJournal
);

router.put(
  "/journals/:id",
  journalUpload.single("cover_image"),
  journalController.adminUpdateJournal
);

router.delete(
  "/journals/:id",
  journalController.adminDeleteJournal
);

/* ======================================================
   CONFERENCES
====================================================== */

router.get(
  "/conferences",
  conferenceController.adminListConferences
);

router.get(
  "/conferences/:id",
  conferenceController.adminGetConference
);

router.post(
  "/conferences",
  conferenceUpload.single("image"),
  conferenceController.adminCreateConference
);

router.put(
  "/conferences/:id",
  conferenceUpload.single("image"),
  conferenceController.adminUpdateConference
);

router.delete(
  "/conferences/:id",
  conferenceController.adminDeleteConference
);

/* ======================================================
   UNIVERSITIES
====================================================== */

router.get(
  "/universities",
  universityController.adminListUniversities
);

router.get(
  "/universities/:id",
  universityController.adminGetUniversity
);

router.post(
  "/universities",
  universityUpload.single("logo"),
  universityController.adminCreateUniversity
);

router.put(
  "/universities/:id",
  universityUpload.single("logo"),
  universityController.adminUpdateUniversity
);

router.delete(
  "/universities/:id",
  universityController.adminDeleteUniversity
);

/* ======================================================
   MANUSCRIPTS
====================================================== */

/*
  IMPORTANT:
  /manuscripts/stats must come BEFORE /manuscripts/:id

  Otherwise Express may treat "stats" as an ID.
*/

// Manuscript dashboard/status statistics
router.get(
  "/manuscripts/stats",
  manuscriptController.adminManuscriptStats
);

// Get all manuscript submissions
router.get(
  "/manuscripts",
  manuscriptController.adminListManuscripts
);

// Get full details of one manuscript
router.get(
  "/manuscripts/:id",
  manuscriptController.adminGetManuscript
);

// Update manuscript status
router.patch(
  "/manuscripts/:id/status",
  manuscriptController.adminUpdateManuscriptStatus
);

// Delete manuscript
router.delete(
  "/manuscripts/:id",
  manuscriptController.adminDeleteManuscript
);

/* ======================================================
   ENQUIRIES
====================================================== */

router.get(
  "/enquiries",
  contactController.adminListEnquiries
);

router.get(
  "/enquiries/:id",
  contactController.adminGetEnquiry
);

router.patch(
  "/enquiries/:id/status",
  contactController.adminUpdateStatus
);

router.delete(
  "/enquiries/:id",
  contactController.adminDeleteEnquiry
);

/* ======================================================
   FOOTER SETTINGS
====================================================== */

router.get(
  "/footer-settings",
  footerSettingsController.adminListFooterSettings
);

router.get(
  "/footer-settings/:id",
  footerSettingsController.adminGetFooterSettings
);

router.post(
  "/footer-settings",
  footerSettingsController.adminCreateFooterSettings
);

router.put(
  "/footer-settings/:id",
  footerSettingsController.adminUpdateFooterSettings
);

router.patch(
  "/footer-settings/:id",
  footerSettingsController.adminUpdateFooterSettings
);

router.delete(
  "/footer-settings/:id",
  footerSettingsController.adminDeleteFooterSettings
);

module.exports = router;