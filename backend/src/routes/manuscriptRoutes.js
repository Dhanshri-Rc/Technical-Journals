const express = require("express");

const {
  submitManuscript,
  trackManuscript,
} = require(
  "../controllers/manuscriptController"
);

const manuscriptUpload = require(
  "../middleware/manuscriptUpload"
);

const router = express.Router();

/* ======================================================
   PUBLIC - SUBMIT MANUSCRIPT
====================================================== */

router.post(
  "/",
  manuscriptUpload.single("manuscript"),
  submitManuscript
);

/* ======================================================
   PUBLIC - TRACK MANUSCRIPT
====================================================== */

router.get(
  "/track/:trackingId",
  trackManuscript
);

module.exports = router;