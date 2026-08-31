const crypto = require("crypto");

const manuscriptModel = require(
  "../models/manuscriptModel"
);

const journalModel = require(
  "../models/journalModel"
);

const asyncHandler = require(
  "../utils/asyncHandler"
);

const {
  created,
  ok,
  list,
  fail,
} = require("../utils/apiResponse");

const {
  getPagination,
  buildMeta,
} = require("../utils/pagination");


/* ======================================================
   MANUSCRIPT STATUS OPTIONS
====================================================== */

const MANUSCRIPT_STATUSES = [
  "submitted",
  "under_review",
  "revision_required",
  "accepted",
  "rejected",
];


/* ======================================================
   GENERATE TRACKING ID
====================================================== */

function generateTrackingId() {
  const year =
    new Date().getFullYear();

  const random = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();

  return `TJ-${year}-${random}`;
}


/* ======================================================
   PUBLIC - SUBMIT MANUSCRIPT
====================================================== */

const submitManuscript = asyncHandler(
  async (req, res) => {
    const {
      title,
      journal_id,
      author_name,
      email,
      abstract,
    } = req.body;

    /* -----------------------------
       VALIDATION
    ----------------------------- */

    if (!title?.trim()) {
      return fail(
        res,
        "Manuscript title is required.",
        422
      );
    }

    if (!journal_id) {
      return fail(
        res,
        "Please select a journal.",
        422
      );
    }

    if (!author_name?.trim()) {
      return fail(
        res,
        "Author name is required.",
        422
      );
    }

    if (!email?.trim()) {
      return fail(
        res,
        "Email is required.",
        422
      );
    }

    if (!abstract?.trim()) {
      return fail(
        res,
        "Abstract is required.",
        422
      );
    }

    if (!req.file) {
      return fail(
        res,
        "Manuscript file is required.",
        422
      );
    }

    const journalId =
      Number(journal_id);

    if (
      !Number.isInteger(journalId) ||
      journalId <= 0
    ) {
      return fail(
        res,
        "Invalid journal selected.",
        422
      );
    }


    /* -----------------------------
       CHECK JOURNAL
    ----------------------------- */

    const journal =
      await journalModel.findRawById(
        journalId
      );

    if (!journal) {
      return fail(
        res,
        "Selected journal does not exist.",
        404
      );
    }

    if (
      journal.status !== "active"
    ) {
      return fail(
        res,
        "Selected journal is currently unavailable.",
        422
      );
    }


    /* -----------------------------
       TRACKING ID
    ----------------------------- */

    const trackingId =
      generateTrackingId();


    /* -----------------------------
       FILE URL
    ----------------------------- */

    const fileUrl =
      `/uploads/manuscripts/${req.file.filename}`;


    /* -----------------------------
       CREATE DATABASE RECORD
    ----------------------------- */

    const manuscript =
      await manuscriptModel.create({
        tracking_id:
          trackingId,

        journal_id:
          journalId,

        title:
          title.trim(),

        author_name:
          author_name.trim(),

        email:
          email.trim().toLowerCase(),

        abstract:
          abstract.trim(),

        file_name:
          req.file.originalname,

        file_url:
          fileUrl,

        status:
          "submitted",
      });


    /* -----------------------------
       RESPONSE
    ----------------------------- */

    return created(
      res,
      {
        ...manuscript,

        trackingId:
          manuscript.tracking_id,
      },
      "Manuscript submitted successfully."
    );
  }
);


/* ======================================================
   PUBLIC - TRACK MANUSCRIPT
====================================================== */

const trackManuscript = asyncHandler(
  async (req, res) => {
    const trackingId =
      String(
        req.params.trackingId || ""
      )
        .trim()
        .toUpperCase();

    if (!trackingId) {
      return fail(
        res,
        "Tracking ID is required.",
        422
      );
    }

    const manuscript =
      await manuscriptModel.findByTrackingId(
        trackingId
      );

    if (!manuscript) {
      return fail(
        res,
        "Manuscript not found.",
        404
      );
    }

    return ok(
      res,
      manuscript
    );
  }
);


/* ======================================================
   ADMIN - LIST ALL MANUSCRIPTS
====================================================== */

const adminListManuscripts =
  asyncHandler(
    async (req, res) => {
      const pageInfo =
        getPagination(
          req.query
        );

      const {
        rows,
        total,
      } =
        await manuscriptModel.findAllAdmin(
          pageInfo,
          req.query.search || "",
          req.query.status || ""
        );

      return list(
        res,
        rows,
        buildMeta(
          pageInfo.page,
          pageInfo.limit,
          total
        )
      );
    }
  );


/* ======================================================
   ADMIN - GET SINGLE MANUSCRIPT
====================================================== */

const adminGetManuscript =
  asyncHandler(
    async (req, res) => {
      const manuscript =
        await manuscriptModel.findById(
          req.params.id
        );

      if (!manuscript) {
        return fail(
          res,
          "Manuscript not found.",
          404
        );
      }

      return ok(
        res,
        manuscript
      );
    }
  );


/* ======================================================
   ADMIN - UPDATE MANUSCRIPT STATUS
====================================================== */

const adminUpdateManuscriptStatus =
  asyncHandler(
    async (req, res) => {
      const { status } =
        req.body;

      if (!status) {
        return fail(
          res,
          "Status is required.",
          422
        );
      }

      if (
        !MANUSCRIPT_STATUSES.includes(
          status
        )
      ) {
        return fail(
          res,
          "Invalid manuscript status.",
          422
        );
      }

      const existing =
        await manuscriptModel.findById(
          req.params.id
        );

      if (!existing) {
        return fail(
          res,
          "Manuscript not found.",
          404
        );
      }

      const manuscript =
        await manuscriptModel.updateStatus(
          req.params.id,
          status
        );

      return ok(
        res,
        manuscript,
        "Manuscript status updated successfully."
      );
    }
  );


/* ======================================================
   ADMIN - DELETE MANUSCRIPT
====================================================== */

const adminDeleteManuscript =
  asyncHandler(
    async (req, res) => {
      const manuscript =
        await manuscriptModel.findById(
          req.params.id
        );

      if (!manuscript) {
        return fail(
          res,
          "Manuscript not found.",
          404
        );
      }

      await manuscriptModel.remove(
        req.params.id
      );

      return ok(
        res,
        null,
        "Manuscript deleted successfully."
      );
    }
  );


/* ======================================================
   ADMIN - MANUSCRIPT STATS
====================================================== */

const adminManuscriptStats =
  asyncHandler(
    async (_req, res) => {
      const stats =
        await manuscriptModel.getStats();

      return ok(
        res,
        {
          total:
            Number(
              stats.total
            ) || 0,

          submitted:
            Number(
              stats.submitted
            ) || 0,

          under_review:
            Number(
              stats.under_review
            ) || 0,

          revision_required:
            Number(
              stats.revision_required
            ) || 0,

          accepted:
            Number(
              stats.accepted
            ) || 0,

          rejected:
            Number(
              stats.rejected
            ) || 0,
        }
      );
    }
  );


/* ======================================================
   EXPORTS
====================================================== */

module.exports = {
  // Public
  submitManuscript,
  trackManuscript,

  // Admin
  adminListManuscripts,
  adminGetManuscript,
  adminUpdateManuscriptStatus,
  adminDeleteManuscript,
  adminManuscriptStats,
};