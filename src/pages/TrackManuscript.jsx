import { useState } from "react";
import {
  Search,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCcw,
} from "lucide-react";

import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";

import {
  Label,
  ErrorText,
  Input,
  SubmitButton,
} from "../components/forms/FormField";

import { trackManuscript } from "../services/manuscriptService";
import { ApiError } from "../services/api";

import networkBg from "../assets/images/contactbg.png";

/* =========================================================
   STATUS CONFIG
========================================================= */

const STATUS_STYLES = {
  submitted: {
    label: "Submitted",
    icon: Clock,
    color: "text-blue-700 bg-blue-50",
  },

  under_review: {
    label: "Under Review",
    icon: FileText,
    color: "text-orange-700 bg-orange-50",
  },

  revision_required: {
    label: "Revision Required",
    icon: RefreshCcw,
    color: "text-amber-700 bg-amber-50",
  },

  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    color: "text-green-700 bg-green-50",
  },

  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "text-red-700 bg-red-50",
  },
};

export default function TrackManuscript() {
  /* =======================================================
     STATES
  ======================================================= */

  const [trackingId, setTrackingId] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [searched, setSearched] = useState(false);

  /* =======================================================
     TRACK MANUSCRIPT
  ======================================================= */

  async function onSubmit(e) {
    e.preventDefault();

    const cleanTrackingId = trackingId.trim();

    if (!cleanTrackingId) {
      setError(
        "Please enter your manuscript tracking ID."
      );

      setResult(null);
      setSearched(false);

      return;
    }

    setError("");
    setLoading(true);
    setResult(null);
    setSearched(false);

    try {
      const response =
        await trackManuscript(
          cleanTrackingId
        );

      console.log(
        "Tracking response:",
        response
      );

      if (!response) {
        setResult(null);
        setSearched(true);
        return;
      }

      /*
        Normalize backend fields.

        Backend:
        tracking_id
        author_name
        journal_title
        submitted_at

        Frontend:
        trackingId
        authorName
        journal
        submittedAt
      */

      const normalizedResult = {
        id: response.id,

        trackingId:
          response.trackingId ||
          response.tracking_id,

        title:
          response.title || "",

        authorName:
          response.authorName ||
          response.author_name ||
          "",

        email:
          response.email || "",

        abstract:
          response.abstract || "",

        status:
          response.status ||
          "submitted",

        journal:
          response.journal ||
          response.journal_title ||
          "Not available",

        journalId:
          response.journal_id,

        journalSlug:
          response.journal_slug,

        fileName:
          response.file_name,

        fileUrl:
          response.file_url,

        submittedAt:
          response.submittedAt ||
          response.submitted_at,

        updatedAt:
          response.updatedAt ||
          response.updated_at,
      };

      setResult(
        normalizedResult
      );

      setSearched(true);
    } catch (err) {
      console.error(
        "Tracking error:",
        err
      );

      setResult(null);
      setSearched(true);

      if (err instanceof ApiError) {
        /*
          If backend returns 404:
          Manuscript not found
        */

        if (
          err.status === 404 ||
          err.statusCode === 404
        ) {
          setError("");
          return;
        }

        setError(
          err.message ||
            "Unable to track manuscript."
        );
      } else {
        setError(
          err?.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  /* =======================================================
     STATUS DETAILS
  ======================================================= */

  const statusConfig = result
    ? STATUS_STYLES[
        result.status
      ] ||
      STATUS_STYLES.submitted
    : null;

  const StatusIcon =
    statusConfig?.icon || Clock;

  const statusLabel =
    statusConfig?.label ||
    result?.status ||
    "";

  /* =======================================================
     DATE FORMATTER
  ======================================================= */

  function formatDate(dateValue) {
    if (!dateValue) {
      return "Not available";
    }

    const date =
      new Date(dateValue);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "Not available";
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <>
      {/* ================= SEO ================= */}

      <Seo
        title="Track Manuscript"
        description="Track the status of your manuscript submission to a Technical Journals-hosted journal using your tracking ID."
        path="/track-manuscript"
        noindex
      />

      {/* ================= HERO ================= */}

      <PageHero
        title="Track Your Manuscript"
        subtitle="Enter your tracking ID to check the current status of your submission."
        bg={networkBg}
      />

      {/* ================= TRACK SECTION ================= */}

      <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {/* ================= SEARCH FORM ================= */}

          <form
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col items-start gap-3 sm:flex-row"
          >
            <div className="w-full flex-1">
              <Label
                htmlFor="trackingId"
                required
              >
                Manuscript Tracking ID
              </Label>

              <Input
                id="trackingId"
                name="trackingId"
                value={trackingId}
                onChange={(e) => {
                  setTrackingId(
                    e.target.value
                  );

                  setError("");
                }}
                placeholder="e.g. TJ-2026-A1B2C3D4"
                error={error}
              />

              <ErrorText id="trackingId-error">
                {error}
              </ErrorText>
            </div>

            <SubmitButton
              loading={loading}
              className="mt-0 w-full sm:mt-6 sm:w-auto"
            >
              <Search className="h-4 w-4" />

              {loading
                ? "Tracking..."
                : "Track"}
            </SubmitButton>
          </form>

          {/* ================= NOT FOUND ================= */}

          {searched &&
            !loading &&
            !result &&
            !error && (
              <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
                No manuscript was
                found for tracking ID{" "}
                <strong>
                  "{trackingId.trim()}"
                </strong>
                . Please check the
                tracking ID and try
                again.
              </div>
            )}

          {/* ================= RESULT ================= */}

          {result && (
            <div className="mt-6 border-t border-slate-100 pt-6">

              {/* Status Header */}

              <div className="mb-6 flex items-start gap-3">
                <span
                  className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full

                    ${
                      statusConfig?.color ||
                      "bg-slate-100 text-slate-600"
                    }
                  `}
                >
                  <StatusIcon className="h-5 w-5" />
                </span>

                <div className="min-w-0">
                  <h2 className="break-words font-semibold text-slate-900">
                    {result.title}
                  </h2>

                  <p className="mt-1 break-all text-xs text-slate-500">
                    Tracking ID:{" "}
                    <span className="font-medium text-blue-700">
                      {
                        result.trackingId
                      }
                    </span>
                  </p>
                </div>
              </div>

              {/* Information */}

              <dl className="grid gap-5 text-sm sm:grid-cols-2">

                {/* Status */}

                <div>
                  <dt className="mb-1 text-xs text-slate-400">
                    Status
                  </dt>

                  <dd>
                    <span
                      className={`
                        inline-flex
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold

                        ${
                          statusConfig?.color ||
                          "bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {statusLabel}
                    </span>
                  </dd>
                </div>

                {/* Author */}

                <div>
                  <dt className="mb-1 text-xs text-slate-400">
                    Corresponding Author
                  </dt>

                  <dd className="font-medium text-slate-800">
                    {
                      result.authorName
                    }
                  </dd>
                </div>

                {/* Journal */}

                <div>
                  <dt className="mb-1 text-xs text-slate-400">
                    Target Journal
                  </dt>

                  <dd className="font-medium text-slate-800">
                    {result.journal}
                  </dd>
                </div>

                {/* Email */}

                <div>
                  <dt className="mb-1 text-xs text-slate-400">
                    Email
                  </dt>

                  <dd className="break-all font-medium text-slate-800">
                    {result.email}
                  </dd>
                </div>

                {/* Submitted Date */}

                <div>
                  <dt className="mb-1 text-xs text-slate-400">
                    Submitted On
                  </dt>

                  <dd className="font-medium text-slate-800">
                    {formatDate(
                      result.submittedAt
                    )}
                  </dd>
                </div>

                {/* Updated Date */}

                <div>
                  <dt className="mb-1 text-xs text-slate-400">
                    Last Updated
                  </dt>

                  <dd className="font-medium text-slate-800">
                    {formatDate(
                      result.updatedAt
                    )}
                  </dd>
                </div>
              </dl>

              {/* ================= STATUS MESSAGE ================= */}

              <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {result.status ===
                  "submitted" && (
                  <p>
                    Your manuscript has
                    been successfully
                    submitted and is
                    awaiting initial
                    editorial
                    assessment.
                  </p>
                )}

                {result.status ===
                  "under_review" && (
                  <p>
                    Your manuscript is
                    currently under
                    peer review.
                  </p>
                )}

                {result.status ===
                  "revision_required" && (
                  <p>
                    The editorial team
                    has requested
                    revisions to your
                    manuscript.
                  </p>
                )}

                {result.status ===
                  "accepted" && (
                  <p>
                    Congratulations.
                    Your manuscript has
                    been accepted for
                    publication.
                  </p>
                )}

                {result.status ===
                  "rejected" && (
                  <p>
                    The editorial
                    decision for this
                    manuscript is
                    rejected.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}