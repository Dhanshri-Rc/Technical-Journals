import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  UploadCloud,
  CheckCircle2,
  FileText,
  Copy,
  Loader2,
} from "lucide-react";

import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";

import {
  Label,
  ErrorText,
  Input,
  Select,
  Textarea,
  SubmitButton,
} from "../components/forms/FormField";

import { validate, rules } from "../utils/validation";

import { fetchJournals } from "../services/journalService";
import { submitManuscript } from "../services/manuscriptService";
import { ApiError } from "../services/api";

import networkBg from "../assets/images/technical-journals-university-publishing-contact-hero.webp";

/* =========================================================
   FILE CONFIG
========================================================= */

const MAX_FILE_MB = 20;

const ALLOWED_EXT = [".pdf", ".doc", ".docx"];

/* =========================================================
   INITIAL FORM VALUES
========================================================= */

const INITIAL_VALUES = {
  title: "",
  journal: "",
  authorName: "",
  email: "",
  abstract: "",
};

export default function SubmitManuscript() {
  /* =======================================================
     STATES
  ======================================================= */

  const [values, setValues] = useState(INITIAL_VALUES);

  const [journals, setJournals] = useState([]);
  const [journalsLoading, setJournalsLoading] = useState(true);

  const [file, setFile] = useState(null);

  const [errors, setErrors] = useState({});
  const [pageError, setPageError] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  /* =======================================================
     LOAD JOURNALS FROM BACKEND
  ======================================================= */

  useEffect(() => {
    const controller = new AbortController();

    async function loadJournals() {
      try {
        setJournalsLoading(true);
        setPageError("");

        const response = await fetchJournals(
          {
            page: 1,
            limit: 100,
          },
          controller.signal
        );

        setJournals(response?.journals || []);
      } catch (err) {
        if (err?.name !== "AbortError") {
          console.error("Journal loading error:", err);

          setPageError(
            err?.message ||
              "Unable to load journals. Please try again."
          );
        }
      } finally {
        setJournalsLoading(false);
      }
    }

    loadJournals();

    return () => {
      controller.abort();
    };
  }, []);

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  function onChange(e) {
    const { name, value } = e.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear field error when user changes value
    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  }

  /* =======================================================
     FILE CHANGE
  ======================================================= */

  function onFileChange(e) {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const extension =
      "." +
      selectedFile.name
        .split(".")
        .pop()
        .toLowerCase();

    /* File type validation */

    if (!ALLOWED_EXT.includes(extension)) {
      setErrors((previous) => ({
        ...previous,
        file: `Only ${ALLOWED_EXT.join(
          ", "
        )} files are accepted.`,
      }));

      setFile(null);

      e.target.value = "";

      return;
    }

    /* File size validation */

    if (
      selectedFile.size >
      MAX_FILE_MB * 1024 * 1024
    ) {
      setErrors((previous) => ({
        ...previous,
        file: `File must be smaller than ${MAX_FILE_MB}MB.`,
      }));

      setFile(null);

      e.target.value = "";

      return;
    }

    /* Clear previous file error */

    setErrors((previous) => ({
      ...previous,
      file: undefined,
    }));

    setFile(selectedFile);
  }

  /* =======================================================
     SUBMIT MANUSCRIPT
  ======================================================= */

  async function onSubmit(e) {
    e.preventDefault();

    setPageError("");

    /* -----------------------------------------------
       Validate fields
    ------------------------------------------------ */

    const formErrors = validate(values, {
      title: [
        rules.required(
          "Please enter the manuscript title."
        ),
      ],

      journal: [
        rules.required(
          "Please select a journal."
        ),
      ],

      authorName: [
        rules.required(
          "Please enter the corresponding author's name."
        ),
      ],

      email: [
        rules.required(
          "Please enter your email."
        ),
        rules.email(),
      ],

      abstract: [
        rules.required(
          "Please provide an abstract."
        ),

        rules.min(
          50,
          "Abstract should be at least 50 characters."
        ),
      ],
    });

    /* File validation */

    if (!file) {
      formErrors.file =
        "Please attach your manuscript file.";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    /* -----------------------------------------------
       Submit to backend
    ------------------------------------------------ */

    try {
      setLoading(true);

      const response = await submitManuscript(
        values,
        file
      );

      console.log(
        "Manuscript submitted:",
        response
      );

      /*
        Backend may return either:

        trackingId

        OR

        tracking_id

        We support both.
      */

      setResult({
        success: true,

        ...response,

        trackingId:
          response?.trackingId ||
          response?.tracking_id,
      });
    } catch (err) {
      console.error(
        "Manuscript submission error:",
        err
      );

      if (err instanceof ApiError) {
        setPageError(
          err.message ||
            "Unable to submit manuscript."
        );
      } else {
        setPageError(
          err?.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  /* =======================================================
     SUCCESS SCREEN
  ======================================================= */

  if (result?.success) {
    return (
      <>
        <Seo
          title="Manuscript Submitted"
          description="Your manuscript has been submitted successfully."
          path="/submit-manuscript"
          noindex
        />

        <div className="flex min-h-[70vh] items-center justify-center px-4 py-20">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-600" />

            <h1 className="mb-2 font-display text-xl font-bold text-slate-900">
              Manuscript Submitted Successfully
            </h1>

            <p className="mb-5 text-sm leading-6 text-slate-500">
              Your submission has been
              received successfully. Use
              the tracking ID below to
              check your manuscript
              status anytime.
            </p>

            {/* Tracking ID */}

            {result.trackingId ? (
              <div className="mb-6 flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="break-all font-mono font-semibold text-blue-700">
                  {result.trackingId}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard?.writeText(
                      result.trackingId
                    )
                  }
                  aria-label="Copy tracking ID"
                  title="Copy tracking ID"
                  className="text-slate-400 transition hover:text-slate-700"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                Manuscript submitted,
                but no tracking ID was
                returned by the server.
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/track-manuscript"
                className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Track Manuscript
              </Link>

              <Link
                to="/"
                className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* =======================================================
     MAIN FORM
  ======================================================= */

  return (
    <>
      {/* ================= SEO ================= */}

      <Seo
        title="Submit Manuscript"
        description="Submit your manuscript to a Technical Journals-hosted journal. Follow the guided submission form to upload your paper and author details."
        path="/submit-manuscript"
      />

      {/* ================= HERO ================= */}

      <PageHero
        title="Submit Manuscript"
        subtitle="Submit your original research to one of our peer-reviewed, university-hosted journals."
        bg={networkBg}
      />

      {/* ================= FORM ================= */}

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {/* General backend error */}

          {pageError && (
            <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {pageError}
            </div>
          )}

          <form
            onSubmit={onSubmit}
            noValidate
            className="space-y-5"
          >

            {/* ================= TITLE ================= */}

            <div>
              <Label
                htmlFor="title"
                required
              >
                Manuscript Title
              </Label>

              <Input
                id="title"
                name="title"
                value={values.title}
                onChange={onChange}
                placeholder="Enter the full title of your manuscript"
                error={errors.title}
              />

              <ErrorText id="title-error">
                {errors.title}
              </ErrorText>
            </div>

            {/* ================= JOURNAL ================= */}

            <div>
              <Label
                htmlFor="journal"
                required
              >
                Target Journal
              </Label>

              <Select
                id="journal"
                name="journal"
                value={values.journal}
                onChange={onChange}
                error={errors.journal}
                disabled={journalsLoading}
              >
                <option value="">
                  {journalsLoading
                    ? "Loading journals..."
                    : "Select a journal"}
                </option>

                {journals.map(
                  (journal) => (
                    <option
                      key={journal.id}
                      value={journal.id}
                    >
                      {journal.title}
                    </option>
                  )
                )}
              </Select>

              <ErrorText id="journal-error">
                {errors.journal}
              </ErrorText>

              {/* Loading journals */}

              {journalsLoading && (
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />

                  Loading journals from
                  database...
                </div>
              )}

              {/* No journals */}

              {!journalsLoading &&
                journals.length === 0 &&
                !pageError && (
                  <p className="mt-2 text-xs text-amber-600">
                    No active journals
                    are currently
                    available for
                    submission.
                  </p>
                )}
            </div>

            {/* ================= AUTHOR + EMAIL ================= */}

            <div className="grid gap-5 sm:grid-cols-2">

              {/* Author */}

              <div>
                <Label
                  htmlFor="authorName"
                  required
                >
                  Corresponding Author
                </Label>

                <Input
                  id="authorName"
                  name="authorName"
                  value={
                    values.authorName
                  }
                  onChange={onChange}
                  placeholder="Full name"
                  error={
                    errors.authorName
                  }
                />

                <ErrorText id="authorName-error">
                  {
                    errors.authorName
                  }
                </ErrorText>
              </div>

              {/* Email */}

              <div>
                <Label
                  htmlFor="email"
                  required
                >
                  Email Address
                </Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={onChange}
                  placeholder="you@university.edu"
                  error={errors.email}
                />

                <ErrorText id="email-error">
                  {errors.email}
                </ErrorText>
              </div>
            </div>

            {/* ================= ABSTRACT ================= */}

            <div>
              <Label
                htmlFor="abstract"
                required
              >
                Abstract
              </Label>

              <Textarea
                id="abstract"
                name="abstract"
                rows={5}
                value={values.abstract}
                onChange={onChange}
                placeholder="Provide a concise summary of your research (minimum 50 characters)"
                error={errors.abstract}
              />

              <ErrorText id="abstract-error">
                {errors.abstract}
              </ErrorText>

              <p className="mt-1 text-right text-xs text-slate-400">
                {
                  values.abstract
                    .length
                }{" "}
                characters
              </p>
            </div>

            {/* ================= FILE UPLOAD ================= */}

            <div>
              <Label
                htmlFor="manuscriptFile"
                required
              >
                Manuscript File
              </Label>

              <label
                htmlFor="manuscriptFile"
                className={`
                  flex
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border-2
                  border-dashed
                  px-4
                  py-8
                  transition-colors

                  ${
                    errors.file
                      ? "border-red-300 bg-red-50"
                      : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/40"
                  }
                `}
              >
                {file ? (
                  <>
                    <FileText className="h-9 w-9 text-blue-700" />

                    <span className="max-w-full break-all text-center text-sm font-medium text-slate-700">
                      {file.name}
                    </span>

                    <span className="text-xs text-slate-400">
                      {(
                        file.size /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB
                    </span>

                    <span className="text-xs font-medium text-blue-600">
                      Click to replace
                      file
                    </span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-9 w-9 text-slate-400" />

                    <span className="text-center text-sm text-slate-500">
                      Click to upload
                      your manuscript
                    </span>

                    <span className="text-xs text-slate-400">
                      PDF, DOC or DOCX
                      (maximum{" "}
                      {MAX_FILE_MB}
                      MB)
                    </span>
                  </>
                )}

                <input
                  id="manuscriptFile"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={onFileChange}
                  className="sr-only"
                />
              </label>

              <ErrorText id="file-error">
                {errors.file}
              </ErrorText>
            </div>

            {/* ================= SUBMIT BUTTON ================= */}

            <SubmitButton
              loading={loading}
              className="w-full"
              disabled={
                loading ||
                journalsLoading ||
                journals.length === 0
              }
            >
              <UploadCloud className="h-4 w-4" />

              {loading
                ? "Submitting Manuscript..."
                : "Submit Manuscript"}
            </SubmitButton>

            {/* ================= POLICY ================= */}

            <p className="text-center text-xs leading-5 text-slate-400">
              By submitting, you
              confirm this work is
              original and complies
              with our{" "}
              <Link
                to="/publication-ethics"
                className="font-medium text-blue-700 hover:underline"
              >
                Publication Ethics
              </Link>{" "}
              policy.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}