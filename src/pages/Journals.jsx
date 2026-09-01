import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  BookOpen,
  Building2,
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Globe2,
  Grid3X3,
  Headphones,
  List,
  Loader2,
  Search,
  ShieldCheck,
  University,
  Workflow,
} from "lucide-react";

import journalsBg from "../assets/images/technical-journals-academic-journals-directory-hero.webp";
import journalCta from "../assets/images/technical-journals-secure-university-journal-hosting-cta.webp";

import j1 from "../assets/images/international-journal-research-development-management-review-cover.webp";
import j2 from "../assets/images/international-journal-recent-advances-engineering-technology-cover.webp";
import j3 from "../assets/images/international-journal-advanced-computer-engineering-communication-technology-cover.webp";
import j4 from "../assets/images/international-journal-advanced-computer-theory-engineering-cover.webp";
import j5 from "../assets/images/itsi-transactions-electrical-electronics-engineering-journal-cover.webp";

import {
  fetchJournals,
} from "../services/journalService";

import {
  resolveImageUrl,
} from "../services/api";

/* =========================================================
   FALLBACK JOURNAL IMAGES
========================================================= */

const JOURNAL_IMAGES = [
  j1,
  j2,
  j3,
  j4,
  j5,
];

/* =========================================================
   PAGINATION

   8 JOURNALS PER PAGE
========================================================= */

const PAGE_SIZE = 8;

/* =========================================================
   SORT MAP
========================================================= */

const SORT_MAP = {
  relevance: "relevance",
  "title-asc": "title_asc",
  "title-desc": "title_desc",
  subject: "relevance",
};

/* =========================================================
   NORMALIZE JOURNAL
========================================================= */

function normalizeJournal(
  row,
  fallbackIndex = 0
) {
  return {
    ...row,

    field:
      row.subject_area ||
      row.subject ||
      "",

    subject:
      row.subject_area ||
      row.subject ||
      "",

    subjectArea:
      row.subject_area ||
      row.subject ||
      "",

    index:
      row.indexing,

    indexing:
      row.indexing,

    frequency:
      row.frequency,

    accessType:
      row.access_type,

    language:
      row.language,

    image:
      resolveImageUrl(
        row.cover_image
      ) ||
      JOURNAL_IMAGES[
        fallbackIndex %
          JOURNAL_IMAGES.length
      ],

    _key:
      row.slug ||
      row.id,
  };
}

/* =========================================================
   HELPERS
========================================================= */

const getText = (value) =>
  String(value ?? "").trim();

function getIndexingValues(
  journal
) {
  const raw =
    journal.indexing ||
    journal.indexed ||
    journal.indexes ||
    journal.badges ||
    [];

  if (Array.isArray(raw)) {
    return raw
      .map((item) =>
        getText(
          item
        ).toLowerCase()
      )
      .filter(Boolean);
  }

  return getText(raw)
    .split(",")
    .map((item) =>
      item
        .trim()
        .toLowerCase()
    )
    .filter(Boolean);
}

/* =========================================================
   INDEX BADGE
========================================================= */

function getIndexLabel(
  journal
) {
  const indexing =
    getIndexingValues(
      journal
    ).join(" ");

  if (
    indexing.includes(
      "scopus"
    )
  ) {
    return {
      short: "Scopus",
      full: "Scopus Indexed",
      className:
        "bg-[#eaf8ef] text-[#168544]",
    };
  }

  if (
    indexing.includes(
      "web of science"
    ) ||
    indexing.includes(
      "wos"
    )
  ) {
    return {
      short: "WoS",
      full: "Web of Science",
      className:
        "bg-[#f2ebff] text-[#7040b6]",
    };
  }

  if (
    indexing.includes(
      "ugc"
    )
  ) {
    return {
      short: "UGC",
      full: "UGC Approved",
      className:
        "bg-[#fff0e8] text-[#e4551e]",
    };
  }

  if (
    indexing.includes(
      "doaj"
    )
  ) {
    return {
      short: "DOAJ",
      full: "DOAJ Indexed",
      className:
        "bg-[#e8f7ff] text-[#08759d]",
    };
  }

  if (
    indexing.includes(
      "google scholar"
    )
  ) {
    return {
      short: "Scholar",
      full: "Google Scholar Indexed",
      className:
        "bg-[#fff7e6] text-[#b46c08]",
    };
  }

  return {
    short: "Indexed",
    full: "Indexed Journal",
    className:
      "bg-[#eaf3ff] text-[#0756cf]",
  };
}

/* =========================================================
   PAGE
========================================================= */

export default function Journals() {
  const catalogueRef =
    useRef(null);

  /* =======================================================
     HERO SEARCH
  ======================================================= */

  const [
    heroKeyword,
    setHeroKeyword,
  ] = useState("");

  const [
    heroField,
    setHeroField,
  ] = useState(
    "All Fields"
  );

  /*
    These are the values actually
    sent to backend after search.
  */

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    subjectQuery,
    setSubjectQuery,
  ] = useState("");

  /* =======================================================
     VIEW / SORT / PAGE
  ======================================================= */

  const [
    view,
    setView,
  ] = useState("grid");

  const [
    sortBy,
    setSortBy,
  ] = useState(
    "relevance"
  );

  const [
    page,
    setPage,
  ] = useState(1);

  /* =======================================================
     DATABASE DATA
  ======================================================= */

  const [
    pagedJournals,
    setPagedJournals,
  ] = useState([]);

  const [
    totalItems,
    setTotalItems,
  ] = useState(0);

  const [
    totalPages,
    setTotalPages,
  ] = useState(1);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    loadError,
    setLoadError,
  ] = useState("");

  const [
    reloadKey,
    setReloadKey,
  ] = useState(0);

  /* =======================================================
     DOCUMENT TITLE
  ======================================================= */

  useEffect(() => {
    document.title =
      "University Journals | Technical Journals";
  }, []);

  /* =======================================================
     FETCH JOURNALS FROM BACKEND
  ======================================================= */

  useEffect(() => {
    const controller =
      new AbortController();

    setLoading(true);
    setLoadError("");

    const params = {
      page,

      limit:
        PAGE_SIZE,

      search:
        searchQuery ||
        undefined,

      subject:
        subjectQuery ||
        undefined,

      sort:
        SORT_MAP[
          sortBy
        ] ||
        "relevance",
    };

    fetchJournals(
      params,
      controller.signal
    )
      .then(
        ({
          journals,
          pagination,
        }) => {
          const rows =
            Array.isArray(
              journals
            )
              ? journals
              : [];

          const normalized =
            rows.map(
              (
                row,
                index
              ) =>
                normalizeJournal(
                  row,
                  index
                )
            );

          setPagedJournals(
            normalized
          );

          setTotalItems(
            Number(
              pagination
                ?.totalItems ??
                normalized.length
            )
          );

          setTotalPages(
            Math.max(
              1,
              Number(
                pagination
                  ?.totalPages ??
                  1
              )
            )
          );
        }
      )
      .catch((error) => {
        if (
          error?.name ===
          "AbortError"
        ) {
          return;
        }

        console.error(
          "Unable to load journals:",
          error
        );

        setLoadError(
          "Unable to load journals. Please try again."
        );

        setPagedJournals(
          []
        );

        setTotalItems(0);

        setTotalPages(1);
      })
      .finally(() => {
        if (
          !controller
            .signal
            .aborted
        ) {
          setLoading(
            false
          );
        }
      });

    return () => {
      controller.abort();
    };
  }, [
    page,
    sortBy,
    searchQuery,
    subjectQuery,
    reloadKey,
  ]);

  /* =======================================================
     KEEP PAGE SAFE
  ======================================================= */

  useEffect(() => {
    if (
      page >
      totalPages
    ) {
      setPage(
        totalPages
      );
    }
  }, [
    page,
    totalPages,
  ]);

  /* =======================================================
     PAGINATION NUMBERS
  ======================================================= */

  const visiblePages =
    useMemo(() => {
      if (
        totalPages <= 7
      ) {
        return Array.from(
          {
            length:
              totalPages,
          },
          (_, index) =>
            index + 1
        );
      }

      if (page <= 4) {
        return [
          1,
          2,
          3,
          4,
          5,
          "end-ellipsis",
          totalPages,
        ];
      }

      if (
        page >=
        totalPages - 3
      ) {
        return [
          1,
          "start-ellipsis",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }

      return [
        1,
        "start-ellipsis",
        page - 1,
        page,
        page + 1,
        "end-ellipsis",
        totalPages,
      ];
    }, [
      page,
      totalPages,
    ]);

  /* =======================================================
     SCROLL TO JOURNALS
  ======================================================= */

  function scrollToCatalogue() {
    catalogueRef.current
      ?.scrollIntoView({
        behavior:
          "smooth",

        block:
          "start",
      });
  }

  /* =======================================================
     HERO SEARCH

     HERO DESIGN IS NOT CHANGED.
  ======================================================= */

  function handleHeroSearch(
    event
  ) {
    event.preventDefault();

    const query =
      heroKeyword.trim();

    /*
      If Subject selected,
      use backend subject field.

      All other options use
      backend general search.
    */

    if (
      heroField ===
      "Subject"
    ) {
      setSubjectQuery(
        query
      );

      setSearchQuery("");
    } else {
      setSearchQuery(
        query
      );

      setSubjectQuery("");
    }

    setPage(1);

    requestAnimationFrame(
      () => {
        scrollToCatalogue();
      }
    );
  }

  /* =======================================================
     CLEAR SEARCH
  ======================================================= */

  function clearSearch() {
    setHeroKeyword("");

    setHeroField(
      "All Fields"
    );

    setSearchQuery("");

    setSubjectQuery("");

    setPage(1);
  }

  /* =======================================================
     CHANGE PAGE
  ======================================================= */

  function changePage(
    nextPage
  ) {
    const safePage =
      Math.min(
        Math.max(
          nextPage,
          1
        ),
        totalPages
      );

    setPage(
      safePage
    );

    requestAnimationFrame(
      () => {
        scrollToCatalogue();
      }
    );
  }

  /* =======================================================
     RESULT RANGE
  ======================================================= */

  const firstResult =
    totalItems > 0
      ? (page - 1) *
          PAGE_SIZE +
        1
      : 0;

  const lastResult =
    Math.min(
      page *
        PAGE_SIZE,
      totalItems
    );

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="overflow-hidden bg-white">

      {/* =====================================================
          HERO SECTION

          KEPT SAME
      ===================================================== */}

      <section
        className="
          relative
          isolate
          min-h-[340px]
          overflow-hidden
          bg-[#03183f]
          text-white

          sm:min-h-[360px]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(3, 19, 53, 0.99) 0%,
              rgba(3, 19, 53, 0.93) 35%,
              rgba(3, 19, 53, 0.38) 68%,
              rgba(3, 19, 53, 0.1) 100%
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
        <div className="absolute inset-0 -z-10 bg-[#03183f]/35 sm:bg-transparent" />

        <div
          className="
            mx-auto
            flex
            min-h-[340px]
            w-full
            max-w-[1440px]
            items-center
            px-5
            py-10

            sm:min-h-[360px]
            sm:px-8

            lg:px-16

            xl:px-20
          "
        >
          <div className="w-full max-w-[860px]">
            <motion.h1
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration:
                  0.55,
              }}
              className="
                max-w-[650px]
                text-[28px]
                font-[600]
                leading-tight
                tracking-[-0.02em]

                sm:text-[34px]

                lg:text-[38px]
              "
            >
              Explore University
              Journals
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration:
                  0.55,
                delay:
                  0.08,
              }}
              className="
                mt-3
                max-w-[460px]
                text-[14px]
                leading-6
                text-white/90

                sm:text-[15px]
                sm:leading-7
              "
            >
              Discover and
              access
              peer-reviewed
              journals hosted
              exclusively for
              universities
              worldwide. All
              journals are
              secure, reliable,
              and built for
              academic
              excellence.
            </motion.p>

            <motion.form
              onSubmit={
                handleHeroSearch
              }
              role="search"
              initial={{
                opacity: 0,
                y: 17,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration:
                  0.55,
                delay:
                  0.16,
              }}
              className="
                mt-6
                w-full
                max-w-[780px]
              "
            >
              <div className="rounded-[9px] border border-white/30 bg-white p-[5px] shadow-[0_14px_32px_rgba(0,0,0,0.24)]">

                <div className="flex min-h-[44px] items-center">

                  <div className="relative min-w-0 flex-1">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]" />

                    <input
                      type="search"
                      value={
                        heroKeyword
                      }
                      onChange={(
                        event
                      ) =>
                        setHeroKeyword(
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="Search journals by title, subject, or ISSN..."
                      className="
                        h-11
                        w-full
                        bg-transparent
                        pl-11
                        pr-3
                        text-[12px]
                        text-[#1e293b]
                        outline-none
                        placeholder:text-[#64748b]

                        sm:text-[14px]
                      "
                    />
                  </div>

                  <div className="relative hidden h-8 w-[180px] shrink-0 border-l border-[#dce3ec] sm:block">

                    <select
                      value={
                        heroField
                      }
                      onChange={(
                        event
                      ) =>
                        setHeroField(
                          event
                            .target
                            .value
                        )
                      }
                      className="
                        h-full
                        w-full
                        appearance-none
                        bg-white
                        pl-4
                        pr-9
                        text-[13px]
                        text-[#526175]
                        outline-none
                      "
                    >
                      <option>
                        All Fields
                      </option>

                      <option>
                        Journal Title
                      </option>

                      <option>
                        Subject
                      </option>

                      <option>
                        ISSN
                      </option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{
                      backgroundColor:
                        "#064ab4",

                      boxShadow:
                        "0 7px 18px rgba(7,86,207,0.32)",
                    }}
                    whileTap={{
                      scale:
                        0.98,
                    }}
                    className="
                      ml-1.5
                      inline-flex
                      h-11
                      shrink-0
                      items-center
                      justify-center
                      gap-2
                      rounded-[6px]
                      bg-[#0756cf]
                      px-4
                      text-[13px]
                      font-semibold
                      text-white

                      sm:min-w-[132px]
                      sm:px-6
                    "
                  >
                    <span className="hidden xs:inline sm:inline">
                      Search
                    </span>

                    <Search className="h-4 w-4" />
                  </motion.button>
                </div>

                <div className="relative border-t border-[#e5eaf0] sm:hidden">
                  <select
                    value={
                      heroField
                    }
                    onChange={(
                      event
                    ) =>
                      setHeroField(
                        event
                          .target
                          .value
                      )
                    }
                    className="
                      h-10
                      w-full
                      appearance-none
                      bg-white
                      px-3
                      pr-9
                      text-[12px]
                      text-[#526175]
                      outline-none
                    "
                  >
                    <option>
                      All Fields
                    </option>

                    <option>
                      Journal Title
                    </option>

                    <option>
                      Subject
                    </option>

                    <option>
                      ISSN
                    </option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section
        className="
          relative
          z-10
          mx-auto
          -mt-10
          w-full
          max-w-[1440px]
          px-4

          sm:px-8

          lg:px-16

          xl:px-20
        "
      >
        <div
          className="
            grid
            rounded-[11px]
            border
            border-[#e6ebf2]
            bg-white
            px-4
            py-2
            shadow-[0_8px_26px_rgba(10,35,75,0.08)]

            sm:grid-cols-2

            md:grid-cols-3

            lg:grid-cols-5
            lg:px-6
          "
        >
          {[
            {
              icon:
                BookOpen,
              value:
                "100+",
              title:
                "University Journals",
              text:
                "Across Multiple Disciplines",
              iconClass:
                "bg-[#0756cf]",
            },
            {
              icon:
                FileText,
              value:
                "10,000+",
              title:
                "Articles Published",
              text:
                "High Quality Research",
              iconClass:
                "bg-[#169447]",
            },
            {
              icon:
                Globe2,
              value:
                "50+",
              title:
                "Countries",
              text:
                "Global Reach",
              iconClass:
                "bg-[#f57912]",
            },
            {
              icon:
                University,
              value:
                "500+",
              title:
                "Universities",
              text:
                "Worldwide",
              iconClass:
                "bg-[#7041b8]",
            },
            {
              icon:
                ShieldCheck,
              value:
                "99.9%",
              title:
                "Uptime & Reliable",
              text:
                "Performance",
              iconClass:
                "bg-[#0756cf]",
            },
          ].map(
            (
              stat,
              index
            ) => {
              const Icon =
                stat.icon;

              return (
                <motion.article
                  key={
                    stat.title
                  }
                  initial={{
                    opacity:
                      0,
                    y: 12,
                  }}
                  whileInView={{
                    opacity:
                      1,
                    y: 0,
                  }}
                  viewport={{
                    once:
                      true,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  transition={{
                    delay:
                      index *
                      0.05,
                  }}
                  className={`
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3

                    ${
                      index !==
                      4
                        ? "lg:border-r lg:border-[#dfe5ed]"
                        : ""
                    }
                  `}
                >
                  <span
                    className={`
                      grid
                      h-12
                      w-12
                      shrink-0
                      place-items-center
                      rounded-full
                      text-white

                      ${stat.iconClass}
                    `}
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <div className="min-w-0">
                    <strong className="block text-[20px] font-[600] text-[#071c46]">
                      {
                        stat.value
                      }
                    </strong>

                    <span className="block text-[13px] font-[550] text-[#11274d]">
                      {
                        stat.title
                      }
                    </span>

                    <span className="mt-0.5 block text-[11px] font-medium text-[#60718a]">
                      {
                        stat.text
                      }
                    </span>
                  </div>
                </motion.article>
              );
            }
          )}
        </div>
      </section>

      {/* =====================================================
          JOURNAL CATALOGUE

          FILTER SIDEBAR REMOVED
      ===================================================== */}

      <section
        ref={
          catalogueRef
        }
        className="
          scroll-mt-24
          py-7

          sm:py-9

          lg:py-10
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1440px]
            px-4

            sm:px-6

            md:px-8

            lg:px-12

            xl:px-16

            2xl:px-20
          "
        >

          {/* =================================================
              TOP TOOLBAR
          ================================================= */}

          <div
            className="
              mb-5
              flex
              flex-col
              gap-4

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            {/* RESULT COUNT */}

            <div>
              <p className="text-[12px] font-medium text-[#405675] sm:text-[13px]">
                Showing{" "}
                <strong className="font-semibold text-[#17345f]">
                  {
                    firstResult
                  }
                  –
                  {
                    lastResult
                  }
                </strong>{" "}
                of{" "}
                <strong className="font-semibold text-[#17345f]">
                  {
                    totalItems
                  }
                </strong>{" "}
                journals
              </p>

              {(searchQuery ||
                subjectQuery) && (
                <button
                  type="button"
                  onClick={
                    clearSearch
                  }
                  className="
                    mt-1
                    text-[11px]
                    font-semibold
                    text-[#0756cf]
                    transition

                    hover:text-[#003f9e]
                  "
                >
                  Clear search
                </button>
              )}
            </div>

            {/* SORT + VIEW */}

            <div
              className="
                flex
                w-full
                flex-wrap
                items-center
                gap-2

                sm:w-auto
                sm:justify-end
              "
            >
              <label className="hidden text-[12px] font-semibold text-[#243a5d] sm:block">
                Sort By:
              </label>

              {/* SORT */}

              <div className="relative flex-1 sm:flex-none">

                <select
                  value={
                    sortBy
                  }
                  onChange={(
                    event
                  ) => {
                    setSortBy(
                      event
                        .target
                        .value
                    );

                    setPage(
                      1
                    );
                  }}
                  className="
                    h-10
                    w-full
                    min-w-[145px]
                    appearance-none
                    rounded-md
                    border
                    border-[#d7dfeb]
                    bg-white
                    pl-3
                    pr-8
                    text-[12px]
                    text-[#435775]
                    outline-none

                    focus:border-[#0756cf]

                    sm:w-[155px]
                    sm:text-[13px]
                  "
                >
                  <option value="relevance">
                    Relevance
                  </option>

                  <option value="title-asc">
                    Title: A–Z
                  </option>

                  <option value="title-desc">
                    Title: Z–A
                  </option>

                  <option value="subject">
                    Subject
                  </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
              </div>

              {/* GRID / LIST */}

              <div
                className="
                  flex
                  shrink-0
                  overflow-hidden
                  rounded-md
                  border
                  border-[#d7dfeb]
                  bg-white
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setView(
                      "grid"
                    )
                  }
                  aria-label="Grid view"
                  aria-pressed={
                    view ===
                    "grid"
                  }
                  className={`
                    inline-flex
                    h-10
                    items-center
                    gap-1.5
                    px-3
                    text-[12px]
                    font-semibold
                    transition

                    ${
                      view ===
                      "grid"
                        ? "bg-[#0756cf] text-white"
                        : "text-[#52647e] hover:bg-[#f3f7fd]"
                    }
                  `}
                >
                  <Grid3X3 className="h-4 w-4" />

                  <span className="hidden min-[420px]:inline">
                    Grid
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setView(
                      "list"
                    )
                  }
                  aria-label="List view"
                  aria-pressed={
                    view ===
                    "list"
                  }
                  className={`
                    inline-flex
                    h-10
                    items-center
                    gap-1.5
                    border-l
                    border-[#d7dfeb]
                    px-3
                    text-[12px]
                    font-semibold
                    transition

                    ${
                      view ===
                      "list"
                        ? "bg-[#0756cf] text-white"
                        : "text-[#52647e] hover:bg-[#f3f7fd]"
                    }
                  `}
                >
                  <List className="h-4 w-4" />

                  <span className="hidden min-[420px]:inline">
                    List
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* =================================================
              JOURNAL CONTENT
          ================================================= */}

          <AnimatePresence
            mode="wait"
          >

            {/* LOADING */}

            {loading ? (
              <motion.div
                key="loading"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="
                  flex
                  min-h-[320px]
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-dashed
                  border-[#ccd7e5]
                  bg-[#f8fafd]
                  px-5
                  text-center
                  text-[#687991]
                "
              >
                <Loader2 className="mb-3 h-8 w-8 animate-spin text-[#0756cf]" />

                <p className="text-[13px]">
                  Loading
                  journals...
                </p>
              </motion.div>
            ) : loadError ? (

              /* ERROR */

              <motion.div
                key="error"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                className="
                  rounded-xl
                  border
                  border-dashed
                  border-red-200
                  bg-red-50
                  px-5
                  py-16
                  text-center
                "
              >
                <p className="text-[14px] font-semibold text-red-700">
                  {
                    loadError
                  }
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setReloadKey(
                      (
                        current
                      ) =>
                        current +
                        1
                    )
                  }
                  className="
                    mt-5
                    rounded-md
                    bg-[#0756cf]
                    px-5
                    py-2.5
                    text-[12px]
                    font-semibold
                    text-white
                    transition

                    hover:bg-[#064ab4]
                  "
                >
                  Try Again
                </button>
              </motion.div>
            ) : pagedJournals
                .length ===
              0 ? (

              /* EMPTY */

              <motion.div
                key="empty"
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  rounded-xl
                  border
                  border-dashed
                  border-[#ccd7e5]
                  bg-[#f8fafd]
                  px-5
                  py-16
                  text-center
                "
              >
                <Search className="mx-auto h-10 w-10 text-[#9aa8ba]" />

                <h2 className="mt-4 text-[15px] font-semibold text-[#17345f]">
                  No journals
                  found
                </h2>

                <p className="mt-1 text-[12px] text-[#687991]">
                  Try another
                  journal title,
                  subject or
                  ISSN.
                </p>

                {(searchQuery ||
                  subjectQuery) && (
                  <button
                    type="button"
                    onClick={
                      clearSearch
                    }
                    className="
                      mt-5
                      rounded-md
                      bg-[#0756cf]
                      px-5
                      py-2.5
                      text-[12px]
                      font-semibold
                      text-white

                      hover:bg-[#064ab4]
                    "
                  >
                    View All
                    Journals
                  </button>
                )}
              </motion.div>
            ) : (

              /* JOURNALS */

              <motion.div
                key={`${view}-${page}-${sortBy}`}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                }}
                transition={{
                  duration:
                    0.3,
                }}
                className={
                  view ===
                  "grid"
                    ? `
                      grid
                      grid-cols-1
                      gap-4

                      sm:grid-cols-2

                      lg:grid-cols-3

                      xl:grid-cols-4
                    `
                    : `
                      flex
                      flex-col
                      gap-4
                    `
                }
              >
                {pagedJournals.map(
                  (
                    journal,
                    index
                  ) => {
                    const indexBadge =
                      getIndexLabel(
                        journal
                      );

                    const cover =
                      journal.image ||
                      journal.cover ||
                      journal.thumbnail;

                    const title =
                      journal.title ||
                      "University Journal";

                    const journalSubject =
                      journal.field ||
                      journal.subject ||
                      journal.subjectArea ||
                      "Multidisciplinary";

                    const issn =
                      journal.issn ||
                      journal.eissn ||
                      journal.pissn ||
                      "Not Available";

                    const journalFrequency =
                      journal.frequency ||
                      journal.publicationFrequency ||
                      "Publication Frequency";

                    const journalIdentifier =
                      journal.slug ||
                      journal.id;

                    const detailsUrl =
                      `/journals/${encodeURIComponent(
                        journalIdentifier
                      )}`;

                    /* =========================================
                       GRID CARD
                    ========================================= */

                    if (
                      view ===
                      "grid"
                    ) {
                      return (
                        <motion.article
                          key={
                            journal._key
                          }
                          layout
                          initial={{
                            opacity:
                              0,
                            y: 14,
                            scale:
                              0.985,
                          }}
                          animate={{
                            opacity:
                              1,
                            y: 0,
                            scale:
                              1,
                          }}
                          transition={{
                            duration:
                              0.35,

                            delay:
                              index *
                              0.03,
                          }}
                          whileHover={{
                            y: -6,

                            boxShadow:
                              "0 15px 32px rgba(10,39,82,0.11)",
                          }}
                          className="
                            group
                            flex
                            min-h-[320px]
                            min-w-0
                            flex-col
                            overflow-hidden
                            rounded-[9px]
                            border
                            border-[#dfe5ed]
                            bg-white
                            p-3
                            transition-colors
                            duration-300

                            hover:border-[#9dbce9]
                          "
                        >

                          {/* COVER IMAGE
                              SAME STYLE AS HOME PAGE */}

                          <div
                            className="
                              relative
                              h-[110px]
                              w-full
                              shrink-0
                              overflow-hidden
                              rounded-[5px]
                              bg-[#EFF3F7]

                              sm:h-[115px]

                              lg:h-[122px]

                              xl:h-[122px]
                            "
                          >
                            {cover ? (
                              <img
                                src={
                                  cover
                                }
                                alt={`${title} journal cover`}
                                loading="lazy"
                                draggable="false"
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                  transition-transform
                                  duration-500
                                  ease-out

                                  group-hover:scale-[1.055]
                                "
                              />
                            ) : (
                              <div
                                className="
                                  grid
                                  h-full
                                  w-full
                                  place-items-center
                                  bg-[radial-gradient(circle_at_top,#1386da,#03183f_70%)]
                                "
                              >
                                <BookOpen className="h-8 w-8 text-white/80" />
                              </div>
                            )}

                            <div
                              className="
                                pointer-events-none
                                absolute
                                inset-0
                                bg-[#0B2A63]/0
                                transition-colors
                                duration-300

                                group-hover:bg-[#0B2A63]/[0.035]
                              "
                            />
                          </div>

                          {/* CONTENT */}

                          <div className="flex flex-1 flex-col pt-3">

                            {/* BADGES */}

                            <div className="flex min-w-0 flex-wrap items-center gap-2">
                              <span
                                title={
                                  indexBadge.full
                                }
                                className={`
                                  rounded
                                  px-2
                                  py-1
                                  text-[10px]
                                  font-[550]

                                  ${indexBadge.className}
                                `}
                              >
                                {
                                  indexBadge.short
                                }
                              </span>

                              <span className="min-w-0 truncate text-[10px] font-medium text-[#657792]">
                                ISSN:{" "}
                                {
                                  issn
                                }
                              </span>
                            </div>

                            {/* TITLE */}

                            <h2
                              className="
                                mt-3
                                line-clamp-3
                                min-h-[61px]
                                text-[14px]
                                font-[600]
                                leading-[1.45]
                                text-[#071c46]
                              "
                            >
                              {
                                title
                              }
                            </h2>

                            {/* SUBJECT */}

                            <p
                              className="
                                mt-2
                                line-clamp-1
                                text-[12px]
                                font-medium
                                text-[#3764a0]
                              "
                            >
                              {
                                journalSubject
                              }
                            </p>

                            {/* FREQUENCY */}

                            <p
                              className="
                                mt-2
                                text-[11px]
                                font-medium
                                text-[#405675]
                              "
                            >
                              {
                                journalFrequency
                              }
                            </p>

                            {/* BUTTONS */}

                            <div
                              className="
                                mt-auto
                                grid
                                grid-cols-2
                                gap-2
                                pt-4
                              "
                            >
                              <Link
                                to={
                                  detailsUrl
                                }
                                className="
                                  inline-flex
                                  min-h-[36px]
                                  items-center
                                  justify-center
                                  rounded-[4px]
                                  border
                                  border-[#0756cf]
                                  px-2
                                  text-center
                                  text-[10.5px]
                                  font-semibold
                                  text-[#0756cf]
                                  transition

                                  hover:bg-[#0756cf]
                                  hover:text-white

                                  sm:text-[11px]
                                "
                              >
                                View
                                Details
                              </Link>

                              <Link
                                to={
                                  detailsUrl
                                }
                                className="
                                  inline-flex
                                  min-h-[36px]
                                  items-center
                                  justify-center
                                  gap-1
                                  rounded-[4px]
                                  border
                                  border-[#24a55b]
                                  px-2
                                  text-center
                                  text-[10.5px]
                                  font-semibold
                                  text-[#168746]
                                  transition

                                  hover:bg-[#168746]
                                  hover:text-white

                                  sm:text-[11px]
                                "
                              >
                                Visit
                                Journal

                                <ExternalLink className="hidden h-3 w-3 min-[420px]:block" />
                              </Link>
                            </div>
                          </div>
                        </motion.article>
                      );
                    }

                    /* =========================================
                       LIST CARD
                    ========================================= */

                    return (
                      <motion.article
                        key={
                          journal._key
                        }
                        layout
                        initial={{
                          opacity:
                            0,
                          y: 12,
                        }}
                        animate={{
                          opacity:
                            1,
                          y: 0,
                        }}
                        transition={{
                          duration:
                            0.35,

                          delay:
                            index *
                            0.025,
                        }}
                        whileHover={{
                          y: -3,

                          boxShadow:
                            "0 12px 28px rgba(10,39,82,0.09)",
                        }}
                        className="
                          group
                          flex
                          min-w-0
                          flex-col
                          overflow-hidden
                          rounded-[9px]
                          border
                          border-[#dfe5ed]
                          bg-white
                          p-3
                          transition-colors

                          hover:border-[#9dbce9]

                          sm:flex-row
                          sm:items-stretch
                          sm:gap-4

                          lg:p-4
                        "
                      >

                        {/* LIST IMAGE */}

                        <div
                          className="
                            relative
                            h-[110px]
                            w-full
                            shrink-0
                            overflow-hidden
                            rounded-[5px]
                            bg-[#EFF3F7]

                            sm:h-[122px]
                            sm:w-[180px]

                            md:w-[195px]

                            lg:w-[210px]
                          "
                        >
                          {cover ? (
                            <img
                              src={
                                cover
                              }
                              alt={`${title} journal cover`}
                              loading="lazy"
                              draggable="false"
                              className="
                                h-full
                                w-full
                                object-cover
                                transition-transform
                                duration-500

                                group-hover:scale-[1.045]
                              "
                            />
                          ) : (
                            <div
                              className="
                                grid
                                h-full
                                w-full
                                place-items-center
                                bg-[radial-gradient(circle_at_top,#1386da,#03183f_70%)]
                              "
                            >
                              <BookOpen className="h-8 w-8 text-white/80" />
                            </div>
                          )}
                        </div>

                        {/* LIST CONTENT */}

                        <div
                          className="
                            flex
                            min-w-0
                            flex-1
                            flex-col
                            pt-3

                            sm:pt-0
                          "
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              title={
                                indexBadge.full
                              }
                              className={`
                                rounded
                                px-2
                                py-1
                                text-[10px]
                                font-[550]

                                ${indexBadge.className}
                              `}
                            >
                              {
                                indexBadge.short
                              }
                            </span>

                            <span className="text-[10px] font-medium text-[#657792]">
                              ISSN:{" "}
                              {
                                issn
                              }
                            </span>
                          </div>

                          <h2
                            className="
                              mt-2
                              text-[14px]
                              font-[600]
                              leading-[1.45]
                              text-[#071c46]

                              sm:text-[15px]

                              lg:text-[16px]
                            "
                          >
                            {
                              title
                            }
                          </h2>

                          <p
                            className="
                              mt-1.5
                              text-[12px]
                              font-medium
                              text-[#3764a0]
                            "
                          >
                            {
                              journalSubject
                            }
                          </p>

                          <p
                            className="
                              mt-2
                              hidden
                              max-w-3xl
                              text-[12px]
                              leading-5
                              text-[#667892]

                              md:line-clamp-2
                            "
                          >
                            {journal.description ||
                              "Explore peer-reviewed research, current issues and publication information for this university journal."}
                          </p>

                          <p
                            className="
                              mt-2
                              text-[11px]
                              font-medium
                              text-[#405675]
                            "
                          >
                            {
                              journalFrequency
                            }
                          </p>
                        </div>

                        {/* LIST ACTIONS */}

                        <div
                          className="
                            mt-4
                            grid
                            grid-cols-2
                            gap-2
                            border-t
                            border-[#e7ebf1]
                            pt-3

                            sm:mt-0
                            sm:w-[185px]
                            sm:shrink-0
                            sm:grid-cols-1
                            sm:content-center
                            sm:border-l
                            sm:border-t-0
                            sm:pl-4
                            sm:pt-0

                            lg:w-[200px]
                          "
                        >
                          <Link
                            to={
                              detailsUrl
                            }
                            className="
                              inline-flex
                              h-10
                              items-center
                              justify-center
                              rounded-[4px]
                              border
                              border-[#0756cf]
                              px-3
                              text-[11px]
                              font-semibold
                              text-[#0756cf]
                              transition

                              hover:bg-[#0756cf]
                              hover:text-white
                            "
                          >
                            View Details
                          </Link>

                          <Link
                            to={
                              detailsUrl
                            }
                            className="
                              inline-flex
                              h-10
                              items-center
                              justify-center
                              gap-1.5
                              rounded-[4px]
                              border
                              border-[#24a55b]
                              px-3
                              text-[11px]
                              font-semibold
                              text-[#168746]
                              transition

                              hover:bg-[#168746]
                              hover:text-white
                            "
                          >
                            Visit Journal

                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </motion.article>
                    );
                  }
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* =================================================
              PAGINATION

              APPEARS AFTER 8 JOURNALS
          ================================================= */}

          {!loading &&
            !loadError &&
            totalItems >
              PAGE_SIZE &&
            totalPages >
              1 && (
              <div
                className="
                  mt-8
                  flex
                  flex-col
                  items-center
                  justify-between
                  gap-4

                  lg:flex-row
                "
              >
                <p className="text-[11px] font-medium text-[#65758c] sm:text-[12px]">
                  Page{" "}
                  <strong className="text-[#17345f]">
                    {
                      page
                    }
                  </strong>{" "}
                  of{" "}
                  <strong className="text-[#17345f]">
                    {
                      totalPages
                    }
                  </strong>
                </p>

                <nav
                  aria-label="Journal pagination"
                  className="
                    flex
                    max-w-full
                    flex-wrap
                    items-center
                    justify-center
                    gap-1.5
                  "
                >

                  {/* FIRST */}

                  <button
                    type="button"
                    onClick={() =>
                      changePage(
                        1
                      )
                    }
                    disabled={
                      page ===
                      1
                    }
                    aria-label="First page"
                    className="
                      grid
                      h-9
                      w-9
                      place-items-center
                      rounded-md
                      border
                      border-[#d7dfeb]
                      text-[#435775]
                      transition

                      hover:border-[#0756cf]
                      hover:text-[#0756cf]

                      disabled:cursor-not-allowed
                      disabled:opacity-35
                    "
                  >
                    <ChevronFirst className="h-4 w-4" />
                  </button>

                  {/* PREVIOUS */}

                  <button
                    type="button"
                    onClick={() =>
                      changePage(
                        page -
                          1
                      )
                    }
                    disabled={
                      page ===
                      1
                    }
                    aria-label="Previous page"
                    className="
                      grid
                      h-9
                      w-9
                      place-items-center
                      rounded-md
                      border
                      border-[#d7dfeb]
                      text-[#435775]
                      transition

                      hover:border-[#0756cf]
                      hover:text-[#0756cf]

                      disabled:cursor-not-allowed
                      disabled:opacity-35
                    "
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* PAGE NUMBERS */}

                  {visiblePages.map(
                    (
                      pageItem,
                      index
                    ) =>
                      typeof pageItem ===
                      "number" ? (
                        <button
                          key={
                            pageItem
                          }
                          type="button"
                          onClick={() =>
                            changePage(
                              pageItem
                            )
                          }
                          aria-current={
                            page ===
                            pageItem
                              ? "page"
                              : undefined
                          }
                          className={`
                            h-9
                            min-w-9
                            rounded-md
                            px-2
                            text-[12px]
                            font-semibold
                            transition

                            ${
                              page ===
                              pageItem
                                ? `
                                  bg-[#0756cf]
                                  text-white
                                  shadow-[0_5px_12px_rgba(7,86,207,0.25)]
                                `
                                : `
                                  border
                                  border-[#d7dfeb]
                                  text-[#435775]

                                  hover:border-[#0756cf]
                                  hover:text-[#0756cf]
                                `
                            }
                          `}
                        >
                          {
                            pageItem
                          }
                        </button>
                      ) : (
                        <span
                          key={`${pageItem}-${index}`}
                          className="
                            grid
                            h-9
                            min-w-7
                            place-items-center
                            text-[#65758c]
                          "
                        >
                          …
                        </span>
                      )
                  )}

                  {/* NEXT */}

                  <button
                    type="button"
                    onClick={() =>
                      changePage(
                        page +
                          1
                      )
                    }
                    disabled={
                      page ===
                      totalPages
                    }
                    aria-label="Next page"
                    className="
                      grid
                      h-9
                      w-9
                      place-items-center
                      rounded-md
                      border
                      border-[#d7dfeb]
                      text-[#435775]
                      transition

                      hover:border-[#0756cf]
                      hover:text-[#0756cf]

                      disabled:cursor-not-allowed
                      disabled:opacity-35
                    "
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  {/* LAST */}

                  <button
                    type="button"
                    onClick={() =>
                      changePage(
                        totalPages
                      )
                    }
                    disabled={
                      page ===
                      totalPages
                    }
                    aria-label="Last page"
                    className="
                      grid
                      h-9
                      w-9
                      place-items-center
                      rounded-md
                      border
                      border-[#d7dfeb]
                      text-[#435775]
                      transition

                      hover:border-[#0756cf]
                      hover:text-[#0756cf]

                      disabled:cursor-not-allowed
                      disabled:opacity-35
                    "
                  >
                    <ChevronLast className="h-4 w-4" />
                  </button>
                </nav>

                {/* GO TO PAGE */}

                <label
                  className="
                    flex
                    items-center
                    gap-2
                    text-[11px]
                    text-[#425774]

                    sm:text-[12px]
                  "
                >
                  Go to page:

                  <div className="relative">
                    <select
                      value={
                        page
                      }
                      onChange={(
                        event
                      ) =>
                        changePage(
                          Number(
                            event
                              .target
                              .value
                          )
                        )
                      }
                      className="
                        h-9
                        w-20
                        appearance-none
                        rounded-md
                        border
                        border-[#d7dfeb]
                        bg-white
                        pl-3
                        pr-8
                        text-[12px]
                        outline-none

                        focus:border-[#0756cf]
                      "
                    >
                      {Array.from(
                        {
                          length:
                            totalPages,
                        },
                        (
                          _,
                          index
                        ) => (
                          <option
                            key={
                              index +
                              1
                            }
                            value={
                              index +
                              1
                            }
                          >
                            {
                              index +
                              1
                            }
                          </option>
                        )
                      )}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
                  </div>
                </label>
              </div>
            )}
        </div>
      </section>

      {/* =====================================================
          TRUST FEATURES
      ===================================================== */}

      <section
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-4
          pb-7

          sm:px-8

          lg:px-16

          xl:px-20
        "
      >
        <div
          className="
            grid
            rounded-[10px]
            bg-[#f3f7fd]
            px-4
            py-5

            sm:grid-cols-2

            md:grid-cols-3

            lg:grid-cols-5
          "
        >
          {[
            {
              icon:
                ShieldCheck,

              title:
                "Secure & Reliable",

              text:
                "Enterprise-grade security & 99.9% uptime.",
            },
            {
              icon:
                Workflow,

              title:
                "End-to-End Workflow",

              text:
                "Streamlined submission, review & publication.",
            },
            {
              icon:
                Globe2,

              title:
                "Global Visibility",

              text:
                "Indexed in top databases for maximum reach.",
            },
            {
              icon:
                Building2,

              title:
                "University Focused",

              text:
                "Built exclusively for universities worldwide.",
            },
            {
              icon:
                Headphones,

              title:
                "24/7 Support",

              text:
                "Dedicated support team always here to help.",
            },
          ].map(
            (
              item,
              index
            ) => {
              const Icon =
                item.icon;

              return (
                <motion.article
                  key={
                    item.title
                  }
                  whileHover={{
                    y: -4,
                  }}
                  className={`
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3

                    ${
                      index !==
                      4
                        ? "lg:border-r lg:border-[#d9e2ef]"
                        : ""
                    }
                  `}
                >
                  <span
                    className="
                      grid
                      h-12
                      w-12
                      shrink-0
                      place-items-center
                      rounded-full
                      bg-[#dcecff]
                      text-[#0756cf]
                    "
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <div>
                    <h3 className="text-[13px] font-[550] text-[#071c46]">
                      {
                        item.title
                      }
                    </h3>

                    <p className="mt-1 text-[11px] leading-4 text-[#60718a]">
                      {
                        item.text
                      }
                    </p>
                  </div>
                </motion.article>
              );
            }
          )}
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-4
          pb-6

          sm:px-8

          lg:px-16

          xl:px-20
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once:
              true,
            amount:
              0.3,
          }}
          className="
            relative
            overflow-hidden
            rounded-[11px]
            bg-[#03183f]
            px-4
            py-2
            text-white
            shadow-[0_8px_24px_rgba(3,24,63,0.12)]
          "
        >
          <div
            className="
              grid
              min-h-[124px]
              items-center

              md:grid-cols-[230px_minmax(0,1fr)]

              xl:grid-cols-[255px_minmax(0,1fr)]
            "
          >

            {/* IMAGE */}

            <div
              className="
                relative
                hidden
                h-full
                min-h-[114px]
                overflow-hidden

                md:block
              "
            >
              <img
                src={
                  journalCta
                }
                alt="Secure university journal hosting"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-[42%_52%]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  right-0
                  w-20
                  bg-gradient-to-r
                  from-transparent
                  to-[#03183f]
                "
              />
            </div>

            {/* CONTENT */}

            <div
              className="
                grid
                items-center
                gap-6
                px-5
                py-7

                sm:px-8

                lg:grid-cols-[minmax(0,1fr)_auto]
                lg:gap-8
                lg:px-9
                lg:py-6
              "
            >
              <div className="max-w-[520px]">

                <motion.h2
                  initial={{
                    opacity:
                      0,

                    x:
                      -12,
                  }}
                  whileInView={{
                    opacity:
                      1,

                    x:
                      0,
                  }}
                  viewport={{
                    once:
                      true,
                  }}
                  transition={{
                    duration:
                      0.4,

                    delay:
                      0.08,
                  }}
                  className="
                    text-[20px]
                    font-[550]
                    leading-tight
                    tracking-[-0.02em]

                    sm:text-[23px]
                  "
                >
                  Ready to Host Your University Journal?
                </motion.h2>

                <motion.p
                  initial={{
                    opacity:
                      0,

                    x:
                      -12,
                  }}
                  whileInView={{
                    opacity:
                      1,

                    x:
                      0,
                  }}
                  viewport={{
                    once:
                      true,
                  }}
                  transition={{
                    duration:
                      0.4,

                    delay:
                      0.14,
                  }}
                  className="
                    mt-2
                    max-w-[450px]
                    text-[13px]
                    leading-[1.65]
                    text-white/85

                    sm:text-[14px]
                  "
                >
                  Join hundreds of universities worldwide and publish research with security, efficiency, and global impact.
                </motion.p>
              </div>

              {/* BUTTONS */}

              <div
                className="
                  flex
                  flex-col
                  gap-3

                  sm:flex-row

                  lg:justify-end
                "
              >
                <motion.div
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale:
                      0.98,
                  }}
                >
                  <Link
                    to="/contact"
                    className="
                      inline-flex
                      h-[46px]
                      w-full
                      items-center
                      justify-center
                      rounded-[6px]
                      bg-white
                      px-6
                      text-[12px]
                      font-semibold
                      text-[#0756cf]
                      shadow-[0_5px_15px_rgba(0,0,0,0.12)]
                      transition

                      hover:bg-[#edf4ff]

                      sm:w-[160px]
                    "
                  >
                    Host Your Journal
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale:
                      0.98,
                  }}
                >
                  <Link
                    to="/contact"
                    className="
                      inline-flex
                      h-[46px]
                      w-full
                      items-center
                      justify-center
                      rounded-[6px]
                      border
                      border-[#19b66a]
                      px-6
                      text-[12px]
                      font-semibold
                      text-white
                      transition

                      hover:border-[#24cf7a]
                      hover:bg-[#168746]

                      sm:w-[176px]
                    "
                  >
                    Request a Demo
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}