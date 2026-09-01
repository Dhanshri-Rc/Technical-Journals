import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  Globe2,
  Languages,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import Seo from "../components/common/Seo";
import NotFound from "./NotFound";

import { SITE } from "../data/site";

import {
  fetchJournalByIdOrSlug,
} from "../services/journalService";

import journalsBg from "../assets/images/technical-journals-academic-journals-directory-hero.webp";

/* =========================================================
   HELPERS
========================================================= */

function cleanText(value) {
  if (
    value === undefined ||
    value === null
  ) {
    return "";
  }

  return String(value).trim();
}

/* =========================================================
   INDEXING NORMALIZER
========================================================= */

function normalizeIndexing(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((item) =>
        cleanText(item)
      )
      .filter(Boolean);
  }

  const text =
    cleanText(value);

  if (
    text.startsWith("[") &&
    text.endsWith("]")
  ) {
    try {
      const parsed =
        JSON.parse(text);

      if (
        Array.isArray(parsed)
      ) {
        return parsed
          .map((item) =>
            cleanText(item)
          )
          .filter(Boolean);
      }
    } catch {
      // Continue with normal parsing.
    }
  }

  return text
    .split(/[,;\n]/)
    .map((item) =>
      item.trim()
    )
    .filter(Boolean);
}

/* =========================================================
   INDEX BADGE
========================================================= */

function IndexBadge({
  value,
}) {
  const text =
    cleanText(value)
      .toLowerCase();

  let className =
    "border-[#C9D8EE] bg-[#F1F6FD] text-[#0756cf]";

  if (
    text.includes("scopus")
  ) {
    className =
      "border-[#B8DEC3] bg-[#EFF8F2] text-[#168544]";
  } else if (
    text.includes("web of science") ||
    text.includes("wos")
  ) {
    className =
      "border-[#DACDF0] bg-[#F6F1FC] text-[#7041B8]";
  } else if (
    text.includes("doaj")
  ) {
    className =
      "border-[#B9DEEA] bg-[#F0FAFC] text-[#08799A]";
  } else if (
    text.includes("ugc")
  ) {
    className =
      "border-[#FFD1BC] bg-[#FFF4EE] text-[#D95B26]";
  }

  return (
    <span
      className={`
        inline-flex
        max-w-full
        items-center
        rounded-full
        border
        px-2.5
        py-1
        text-[9.5px]
        font-semibold
        leading-4

        sm:text-[10px]

        ${className}
      `}
    >
      {value}
    </span>
  );
}

/* =========================================================
   JOURNAL DETAIL ROW
========================================================= */

function DetailRow({
  label,
  value,
}) {
  return (
    <div
      className="
        grid
        grid-cols-[105px_minmax(0,1fr)]
        gap-4
        border-b
        border-[#E9EDF2]
        py-3

        first:pt-0
        last:border-0
        last:pb-0

        sm:grid-cols-[115px_minmax(0,1fr)]
      "
    >
      <dt
        className="
          text-[11px]
          font-medium
          leading-5
          text-[#7A879A]

          sm:text-[11.5px]
        "
      >
        {label}
      </dt>

      <dd
        className="
          min-w-0
          break-words
          text-right
          text-[11px]
          font-semibold
          leading-5
          text-[#243B60]

          sm:text-[11.5px]
        "
      >
        {value}
      </dd>
    </div>
  );
}

/* =========================================================
   PUBLICATION ITEM
========================================================= */

function PublicationItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        min-w-0
        items-start
        gap-3
        border-b
        border-[#E8EDF3]
        py-4

        last:border-0

        sm:border-b-0
        sm:border-r
        sm:px-4
        sm:first:pl-0
        sm:last:border-r-0
        sm:last:pr-0
      "
    >
      <span
        className="
          grid
          h-9
          w-9
          shrink-0
          place-items-center
          rounded-full
          bg-[#EDF4FD]
          text-[#0756cf]
        "
      >
        <Icon className="h-[17px] w-[17px]" />
      </span>

      <div className="min-w-0">
        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.07em]
            text-[#8491A3]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            break-words
            text-[11.5px]
            font-semibold
            leading-5
            text-[#263C5D]

            sm:text-[12px]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function JournalDetail() {
  const { id } =
    useParams();

  const identifier =
    decodeURIComponent(
      id || ""
    );

  const [
    journal,
    setJournal,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    notFound,
    setNotFound,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  /* =======================================================
     FETCH JOURNAL
  ======================================================= */

  useEffect(() => {
    let active = true;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    async function loadJournal() {
      try {
        setLoading(true);
        setNotFound(false);
        setErrorMessage("");

        const data =
          await fetchJournalByIdOrSlug(
            identifier
          );

        if (!active) {
          return;
        }

        if (!data) {
          setJournal(null);
          setNotFound(true);
          return;
        }

        setJournal(data);
      } catch (error) {
        if (!active) {
          return;
        }

        console.error(
          "Journal detail error:",
          error
        );

        const status =
          error?.status ||
          error?.statusCode ||
          error?.response?.status;

        if (
          status === 404
        ) {
          setNotFound(true);
        } else {
          setErrorMessage(
            error?.message ||
              "Unable to load journal details."
          );
        }

        setJournal(null);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    if (identifier) {
      loadJournal();
    } else {
      setLoading(false);
      setNotFound(true);
    }

    return () => {
      active = false;
    };
  }, [identifier]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main
        className="
          flex
          min-h-[65vh]
          items-center
          justify-center
          bg-white
          px-4
        "
      >
        <div className="text-center">
          <Loader2
            className="
              mx-auto
              h-8
              w-8
              animate-spin
              text-[#0756cf]
            "
          />

          <p
            className="
              mt-3
              text-[13px]
              font-medium
              text-[#64748B]
            "
          >
            Loading journal details...
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (
    notFound ||
    (!journal &&
      !errorMessage)
  ) {
    return <NotFound />;
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (
    errorMessage &&
    !journal
  ) {
    return (
      <main
        className="
          flex
          min-h-[65vh]
          items-center
          justify-center
          bg-white
          px-4
        "
      >
        <div
          className="
            w-full
            max-w-[500px]
            rounded-[10px]
            border
            border-red-200
            bg-red-50
            p-6
            text-center

            sm:p-8
          "
        >
          <BookOpen
            className="
              mx-auto
              h-9
              w-9
              text-red-400
            "
          />

          <h2
            className="
              mt-4
              text-[17px]
              font-semibold
              text-red-700
            "
          >
            Unable to Load Journal
          </h2>

          <p
            className="
              mt-2
              text-[12px]
              leading-5
              text-red-600
            "
          >
            {errorMessage}
          </p>

          <Link
            to="/journals"
            className="
              mt-5
              inline-flex
              min-h-[40px]
              items-center
              justify-center
              rounded-[5px]
              bg-[#0756cf]
              px-5
              text-[12px]
              font-semibold
              text-white
              transition

              hover:bg-[#064ab4]
            "
          >
            Back to Journals
          </Link>
        </div>
      </main>
    );
  }

  /* =======================================================
     DATABASE VALUES
  ======================================================= */

  const title =
    cleanText(
      journal.title
    ) ||
    "University Journal";

  const field =
    cleanText(
      journal.subject_area
    ) ||
    cleanText(
      journal.subject
    ) ||
    cleanText(
      journal.category
    );

  const category =
    cleanText(
      journal.category
    );

  const frequency =
    cleanText(
      journal.frequency
    );

  const accessType =
    cleanText(
      journal.access_type
    );

  const reviewType =
    cleanText(
      journal.review_type
    );

  const language =
    cleanText(
      journal.language
    );

  const publisher =
    cleanText(
      journal.publisher
    ) ||
    SITE?.name ||
    "Technical Journals";

  const university =
    cleanText(
      journal.university_name
    ) ||
    cleanText(
      journal.university
    );

  const country =
    cleanText(
      journal.country
    );

  const issn =
    cleanText(
      journal.issn
    );

  const eissn =
    cleanText(
      journal.eissn
    );

  const pissn =
    cleanText(
      journal.pissn
    );

  const indexingItems =
    normalizeIndexing(
      journal.indexing
    );

  const about =
    cleanText(
      journal.about
    ) ||
    cleanText(
      journal.description
    );

  const aimsScope =
    cleanText(
      journal.aims_scope
    );

  const website =
    cleanText(
      journal.website_url
    ) ||
    cleanText(
      journal.website
    );

  /* =======================================================
     FIXED UI VALUES

     SAME LAYOUT FOR EVERY JOURNAL
  ======================================================= */

  const uiField =
    field ||
    "Multidisciplinary Research";

  const uiCategory =
    category ||
    "Academic Journal";

  const uiFrequency =
    frequency ||
    "Not specified";

  const uiAccessType =
    accessType ||
    "Not specified";

  const uiReviewType =
    reviewType ||
    "Not specified";

  const uiLanguage =
    language ||
    "English";

  const uiPublisher =
    publisher ||
    "Technical Journals";

  const uiUniversity =
    university ||
    "University Journal";

  const uiCountry =
    country ||
    "Not specified";

  const uiIssn =
    issn ||
    "Not specified";

  const uiEissn =
    eissn ||
    "Not specified";

  const uiPissn =
    pissn ||
    "Not specified";

  const primaryIssn =
    issn ||
    eissn ||
    pissn ||
    "Not specified";

  const uiAbout =
    about ||
    "Detailed information about this journal is currently being updated by the editorial team.";

  const uiAimsScope =
    aimsScope ||
    "The aims and scope of this journal are currently being updated by the editorial team.";

  const visibleIndexingItems =
    indexingItems.length
      ? indexingItems
      : [
          "Indexing information pending",
        ];

  /* =======================================================
     SEO
  ======================================================= */

  const seoDescription = [
    title,

    issn
      ? `ISSN ${issn}`
      : "",

    field
      ? `journal in ${field}`
      : "",

    frequency
      ? `${frequency} publication`
      : "",

    indexingItems.length
      ? `indexed in ${indexingItems.join(", ")}`
      : "",
  ]
    .filter(Boolean)
    .join(". ");

  const jsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "Periodical",

    name:
      title,

    ...(issn
      ? {
          issn,
        }
      : {}),

    ...(field
      ? {
          about:
            field,
        }
      : {}),

    publisher: {
      "@type":
        "Organization",

      name:
        uiPublisher,
    },
  };

  return (
    <>
      <Seo
        title={title}
        description={
          seoDescription ||
          `${title} journal details.`
        }
        path={`/journals/${encodeURIComponent(
          identifier
        )}`}
        jsonLd={jsonLd}
      />

      <main
        className="
          overflow-x-hidden
          bg-white
        "
      >

        {/* =================================================
            SIMPLE PROFESSIONAL HERO
        ================================================= */}

        <section
          className="
            relative
            isolate
            overflow-hidden
            bg-[#03183F]
            text-white
          "
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(3,19,53,0.99) 0%,
                rgba(3,19,53,0.95) 42%,
                rgba(3,19,53,0.72) 72%,
                rgba(3,19,53,0.45) 100%
              ),
              url(${journalsBg})
            `,
            backgroundPosition:
              "center",
            backgroundRepeat:
              "no-repeat",
            backgroundSize:
              "cover",
          }}
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1200px]
              px-4
              pb-9
              pt-5

              sm:px-6
              sm:pb-10

              md:px-8

              lg:px-10
              lg:pb-11
              lg:pt-6
            "
          >

            {/* =============================================
                BREADCRUMB
            ============================================= */}

            <nav
              aria-label="Breadcrumb"
              className="
                flex
                min-w-0
                flex-wrap
                items-center
                gap-1.5
                text-[10px]
                font-medium
                text-white

                sm:text-[11px]
              "
            >
              <Link
                to="/"
                className="
                  text-white/75
                  transition

                  hover:text-white
                "
              >
                Home
              </Link>

              <ChevronRight
                className="
                  h-3
                  w-3
                  shrink-0
                  text-white/50
                "
              />

              <Link
                to="/journals"
                className="
                  text-white/75
                  transition

                  hover:text-white
                "
              >
                Journals
              </Link>

              <ChevronRight
                className="
                  h-3
                  w-3
                  shrink-0
                  text-white/50
                "
              />

              <span
                title={title}
                className="
                  max-w-[180px]
                  truncate
                  font-semibold
                  text-white

                  min-[420px]:max-w-[260px]

                  sm:max-w-[360px]

                  md:max-w-[520px]
                "
              >
                {title}
              </span>
            </nav>

            {/* =============================================
                HERO BODY
            ============================================= */}

            <div
              className="
                max-w-[850px]
                py-9

                sm:py-10

                md:py-11
              "
            >

              {/* INDEXING */}

              <div
                className="
                  flex
                  flex-wrap
                  gap-1.5
                "
              >
                {visibleIndexingItems
                  .slice(0, 5)
                  .map(
                    (
                      item
                    ) => (
                      <IndexBadge
                        key={
                          item
                        }
                        value={
                          item
                        }
                      />
                    )
                  )}
              </div>

              {/* TITLE */}

              <h1
                className="
                  mt-3
                  max-w-[850px]
                  break-words
                  text-[25px]
                  font-[600]
                  leading-[1.2]
                  tracking-[-0.025em]

                  min-[420px]:text-[27px]

                  sm:text-[31px]

                  md:text-[34px]

                  lg:text-[37px]
                "
              >
                {title}
              </h1>

              {/* SUBJECT */}

              <p
                className="
                  mt-3
                  max-w-[650px]
                  text-[11px]
                  font-medium
                  leading-5
                  text-white/80

                  sm:text-[12px]

                  lg:text-[13px]
                "
              >
                {uiField}
                {" • "}
                {uiUniversity}
              </p>

              {/* HERO BASIC INFO */}

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-x-6
                  gap-y-2
                  text-[11px]
                  font-medium
                  text-white/85

                  sm:text-[12px]
                "
              >
                <span>
                  <strong className="font-semibold text-white">
                    ISSN:
                  </strong>{" "}
                  {primaryIssn}
                </span>

                <span>
                  <strong className="font-semibold text-white">
                    Frequency:
                  </strong>{" "}
                  {uiFrequency}
                </span>

                <span>
                  <strong className="font-semibold text-white">
                    Access:
                  </strong>{" "}
                  {uiAccessType}
                </span>
              </div>

              {/* ACTIONS */}

              <div
                className="
                  mt-6
                  flex
                  flex-col
                  gap-2.5

                  min-[420px]:flex-row
                  min-[420px]:flex-wrap
                "
              >
                <Link
                  to="/submit-manuscript"
                  className="
                    inline-flex
                    min-h-[42px]
                    items-center
                    justify-center
                    rounded-[5px]
                    bg-[#1769E0]
                    px-6
                    text-[11.5px]
                    font-semibold
                    text-white
                    transition

                    hover:bg-[#0B59C7]

                    sm:text-[12px]
                  "
                >
                  Submit Manuscript
                </Link>

                <Link
                  to="/journals"
                  className="
                    inline-flex
                    min-h-[42px]
                    items-center
                    justify-center
                    rounded-[5px]
                    border
                    border-white/35
                    bg-white/[0.05]
                    px-5
                    text-[11.5px]
                    font-semibold
                    text-white
                    transition

                    hover:bg-white
                    hover:text-[#0756CF]

                    sm:text-[12px]
                  "
                >
                  View All Journals
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <section
          className="
            mx-auto
            grid
            w-full
            max-w-[1200px]
            grid-cols-1
            gap-8
            px-4
            py-8

            sm:px-6
            sm:py-10

            md:px-8

            lg:grid-cols-[minmax(0,1fr)_300px]
            lg:gap-10
          "
        >

          {/* ===============================================
              LEFT SIDE
          =============================================== */}

          <div className="min-w-0">

            {/* ABOUT */}

            <section>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.09em]
                  text-[#1769E0]
                "
              >
                Journal Overview
              </p>

              <h2
                className="
                  mt-1.5
                  text-[20px]
                  font-[600]
                  tracking-[-0.02em]
                  text-[#102D63]

                  sm:text-[22px]
                "
              >
                About this Journal
              </h2>

              <div
                className="
                  mt-2
                  h-[3px]
                  w-10
                  rounded-full
                  bg-[#1769E0]
                "
              />

              <p
                className="
                  mt-4
                  whitespace-pre-line
                  break-words
                  text-left
                  text-[12.5px]
                  font-medium
                  leading-[1.85]
                  text-[#596A80]

                  md:text-justify

                  lg:text-[13px]
                "
              >
                {uiAbout}
              </p>
            </section>

            {/* AIMS */}

            <section
              className="
                mt-8
                border-t
                border-[#E7EBF1]
                pt-7
              "
            >
              <h2
                className="
                  text-[18px]
                  font-[600]
                  text-[#102D63]

                  sm:text-[19px]
                "
              >
                Aims and Scope
              </h2>

              <p
                className="
                  mt-3
                  whitespace-pre-line
                  break-words
                  text-left
                  text-[12.5px]
                  font-medium
                  leading-[1.85]
                  text-[#596A80]

                  md:text-justify

                  lg:text-[13px]
                "
              >
                {uiAimsScope}
              </p>
            </section>

            {/* =============================================
                PUBLICATION INFORMATION
            ============================================= */}

            <section
              className="
                mt-8
                border-t
                border-[#E7EBF1]
                pt-7
              "
            >
              <h2
                className="
                  text-[18px]
                  font-[600]
                  text-[#102D63]

                  sm:text-[19px]
                "
              >
                Publication Information
              </h2>

              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  overflow-hidden
                  rounded-[9px]
                  border
                  border-[#E2E7EE]
                  bg-white
                  px-4

                  sm:grid-cols-2

                  lg:grid-cols-4
                "
              >
                <PublicationItem
                  icon={
                    CalendarDays
                  }
                  label="Frequency"
                  value={
                    uiFrequency
                  }
                />

                <PublicationItem
                  icon={
                    ShieldCheck
                  }
                  label="Review Type"
                  value={
                    uiReviewType
                  }
                />

                <PublicationItem
                  icon={
                    Globe2
                  }
                  label="Access Type"
                  value={
                    uiAccessType
                  }
                />

                <PublicationItem
                  icon={
                    Languages
                  }
                  label="Language"
                  value={
                    uiLanguage
                  }
                />
              </div>
            </section>

            {/* =============================================
                WHY PUBLISH
            ============================================= */}

            <section
              className="
                mt-8
                border-t
                border-[#E7EBF1]
                pt-7
              "
            >
              <h2
                className="
                  text-[18px]
                  font-[600]
                  text-[#102D63]

                  sm:text-[19px]
                "
              >
                Why Publish With Us
              </h2>

              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  gap-x-7
                  gap-y-3

                  min-[560px]:grid-cols-2
                "
              >
                {[
                  indexingItems.length
                    ? `Indexed in ${indexingItems.join(", ")}`
                    : "Journal indexing information is maintained by the editorial team",

                  uiReviewType !==
                  "Not specified"
                    ? `${uiReviewType} peer-review process`
                    : "Structured peer-review process",

                  "Professional editorial and publication workflow",

                  "Dedicated editorial and author support",
                ].map(
                  (
                    item
                  ) => (
                    <div
                      key={
                        item
                      }
                      className="
                        flex
                        items-start
                        gap-2.5
                      "
                    >
                      <CheckCircle2
                        className="
                          mt-[2px]
                          h-4
                          w-4
                          shrink-0
                          text-[#169447]
                        "
                      />

                      <p
                        className="
                          text-[11.5px]
                          font-medium
                          leading-5
                          text-[#596A80]

                          sm:text-[12px]
                        "
                      >
                        {item}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* =============================================
                ACTION BUTTONS
            ============================================= */}

            <section
              className="
                mt-8
                border-t
                border-[#E7EBF1]
                pt-6
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-2.5

                  min-[480px]:grid-cols-2

                  md:flex
                  md:flex-wrap
                "
              >
                <Link
                  to="/submit-manuscript"
                  className="
                    inline-flex
                    min-h-[42px]
                    items-center
                    justify-center
                    rounded-[5px]
                    bg-[#0756CF]
                    px-5
                    text-[11.5px]
                    font-semibold
                    text-white
                    transition

                    hover:bg-[#064AB4]

                    sm:text-[12px]
                  "
                >
                  Submit Manuscript
                </Link>

                <Link
                  to="/author-guidelines"
                  className="
                    inline-flex
                    min-h-[42px]
                    items-center
                    justify-center
                    gap-2
                    rounded-[5px]
                    border
                    border-[#CDD6E1]
                    bg-white
                    px-5
                    text-[11.5px]
                    font-semibold
                    text-[#405573]
                    transition

                    hover:border-[#0756CF]
                    hover:text-[#0756CF]

                    sm:text-[12px]
                  "
                >
                  <Download className="h-4 w-4" />

                  Author Guidelines
                </Link>

                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      min-h-[42px]
                      items-center
                      justify-center
                      gap-2
                      rounded-[5px]
                      border
                      border-[#41A96C]
                      bg-white
                      px-5
                      text-[11.5px]
                      font-semibold
                      text-[#168746]
                      transition

                      hover:bg-[#168746]
                      hover:text-white

                      sm:text-[12px]
                    "
                  >
                    Visit Journal Site

                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    className="
                      inline-flex
                      min-h-[42px]
                      items-center
                      justify-center
                      gap-2
                      rounded-[5px]
                      border
                      border-[#41A96C]
                      bg-white
                      px-5
                      text-[11.5px]
                      font-semibold
                      text-[#168746]
                      transition

                      hover:bg-[#168746]
                      hover:text-white

                      sm:text-[12px]
                    "
                  >
                    Contact Journal

                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </section>
          </div>

          {/* ===============================================
              SIDEBAR
          =============================================== */}

          <aside
            className="
              min-w-0
              space-y-4

              lg:sticky
              lg:top-24
              lg:self-start
            "
          >

            {/* JOURNAL DETAILS */}

            <div
              className="
                rounded-[9px]
                border
                border-[#E0E5EC]
                bg-[#FAFBFD]
                p-4

                sm:p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2.5
                  border-b
                  border-[#E3E8EF]
                  pb-3.5
                "
              >
                <BookOpen
                  className="
                    h-5
                    w-5
                    text-[#0756CF]
                  "
                />

                <h3
                  className="
                    text-[14px]
                    font-[600]
                    text-[#102D63]
                  "
                >
                  Journal Details
                </h3>
              </div>

              <dl className="mt-4">
                <DetailRow
                  label="ISSN"
                  value={
                    uiIssn
                  }
                />

                <DetailRow
                  label="E-ISSN"
                  value={
                    uiEissn
                  }
                />

                <DetailRow
                  label="P-ISSN"
                  value={
                    uiPissn
                  }
                />

                <DetailRow
                  label="Subject"
                  value={
                    uiField
                  }
                />

                <DetailRow
                  label="Category"
                  value={
                    uiCategory
                  }
                />

                <DetailRow
                  label="Frequency"
                  value={
                    uiFrequency
                  }
                />

                <DetailRow
                  label="Review"
                  value={
                    uiReviewType
                  }
                />

                <DetailRow
                  label="Access"
                  value={
                    uiAccessType
                  }
                />

                <DetailRow
                  label="Language"
                  value={
                    uiLanguage
                  }
                />

                <DetailRow
                  label="Country"
                  value={
                    uiCountry
                  }
                />

                <DetailRow
                  label="Publisher"
                  value={
                    uiPublisher
                  }
                />
              </dl>
            </div>

            {/* INDEXING */}

            <div
              className="
                rounded-[9px]
                border
                border-[#E0E5EC]
                bg-white
                p-4

                sm:p-5
              "
            >
              <h3
                className="
                  text-[14px]
                  font-[600]
                  text-[#102D63]
                "
              >
                Indexing & Abstracting
              </h3>

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {visibleIndexingItems.map(
                  (
                    item
                  ) => (
                    <IndexBadge
                      key={
                        item
                      }
                      value={
                        item
                      }
                    />
                  )
                )}
              </div>
            </div>

          

            {/* BACK */}

            <Link
              to="/journals"
              className="
                inline-flex
                min-h-[41px]
                w-full
                items-center
                justify-center
                rounded-[5px]
                border
                border-[#D8E0EA]
                bg-white
                px-4
                text-[11px]
                font-semibold
                text-[#435775]
                transition

                hover:border-[#0756CF]
                hover:text-[#0756CF]
              "
            >
              ← Back to Journals
            </Link>
          </aside>
        </section>
      </main>
    </>
  );
}