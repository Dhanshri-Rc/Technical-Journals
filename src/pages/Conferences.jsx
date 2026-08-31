import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Search,
} from "lucide-react";

import confBg from "../assets/images/conferencebg.png";
import conferenceCta from "../assets/images/conferencecta.png";

import {
  fetchConferences,
} from "../services/conferenceService";

import {
  resolveImageUrl,
} from "../services/api";

import useDebounce from "../hooks/useDebounce";

/* =========================================================
   CONFIG
========================================================= */

const PAGE_SIZE = 5;

const colorStyles = [
  "from-[#064391] to-[#075fc9]",
  "from-[#168646] to-[#28ae61]",
  "from-[#6841b4] to-[#945ad9]",
  "from-[#f06416] to-[#ff8a24]",
  "from-[#0495a8] to-[#10bac1]",
];

/* =========================================================
   HELPERS
========================================================= */

function text(value) {
  return String(
    value ?? "",
  ).trim();
}

function list(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map(text)
      .filter(Boolean);
  }

  const raw =
    text(value);

  if (!raw) {
    return [];
  }

  if (
    raw.startsWith("[") &&
    raw.endsWith("]")
  ) {
    try {
      const parsed =
        JSON.parse(raw);

      if (
        Array.isArray(parsed)
      ) {
        return parsed
          .map(text)
          .filter(Boolean);
      }
    } catch {
      // Continue with normal parsing.
    }
  }

  return raw
    .split(/[,;\n]/)
    .map((item) =>
      item.trim(),
    )
    .filter(Boolean);
}

/* =========================================================
   NORMALIZE BACKEND DATA
========================================================= */

function normalizeConference(
  row,
) {
  return {
    ...row,

    type:
      row.conference_type ||
      row.type ||
      "",

    subject:
      row.subject_area ||
      row.subject ||
      "",

    date:
      row.display_date ||
      row.start_date ||
      "",

    detailsUrl:
      `/conferences/${encodeURIComponent(
        row.slug ||
          row.id,
      )}`,

    image:
      resolveImageUrl(
        row.image ||
          row.cover_image,
      ),
  };
}

/* =========================================================
   DISPLAY HELPERS
========================================================= */

function conferenceType(
  conference,
) {
  return (
    text(
      conference.type ||
        conference.conference_type,
    ) ||
    "Academic Conference"
  );
}

function conferenceSubject(
  conference,
) {
  return (
    text(
      conference.subject ||
        conference.subject_area,
    ) ||
    "Multidisciplinary Research"
  );
}

function conferenceDate(
  conference,
) {
  return (
    text(
      conference.display_date ||
        conference.date ||
        conference.start_date,
    ) ||
    "Date to be announced"
  );
}

function conferenceLocation(
  conference,
) {
  return (
    text(
      conference.location ||
        conference.venue ||
        conference.city,
    ) ||
    "Location to be announced"
  );
}

function conferenceOrganizer(
  conference,
) {
  return (
    text(
      conference.organizer ||
        conference.organized_by ||
        conference.university,
    ) ||
    "Technical Journals"
  );
}

/* =========================================================
   CONFERENCE COVER IMAGE

   Proper portrait conference poster ratio.
========================================================= */

function ConferenceImage({
  conference,
  code,
  index,
}) {
  const [
    imageError,
    setImageError,
  ] = useState(false);

  const showImage =
    Boolean(
      conference.image,
    ) &&
    !imageError;

  return (
    <div
      className="
        relative
        mx-auto
        aspect-[0.72/1]
        w-[130px]
        shrink-0
        overflow-hidden
        rounded-[7px]
        border
        border-[#DDE4ED]
        bg-white
        shadow-[0_4px_14px_rgba(9,35,75,0.08)]

        min-[420px]:w-[138px]

        sm:mx-0
        sm:w-[122px]

        md:w-[128px]

        lg:w-[132px]

        xl:w-[132px]
      "
    >
      {showImage ? (
        <img
          src={
            conference.image
          }
          alt={
            conference.title
              ? `${conference.title} conference cover`
              : "Conference cover"
          }
          loading="lazy"
          draggable="false"
          onError={() =>
            setImageError(
              true,
            )
          }
          className="
            h-full
            w-full
            bg-white
            object-contain
          "
        />
      ) : (
        <div
          className={`
            grid
            h-full
            w-full
            place-items-center
            bg-gradient-to-br
            px-3
            text-center
            text-white

            ${
              colorStyles[
                index %
                  colorStyles.length
              ]
            }
          `}
        >
          <div className="min-w-0">
            <p
              className="
                break-words
                text-[14px]
                font-bold
                leading-5
              "
            >
              {code
                .split(" ")
                .slice(
                  0,
                  2,
                )
                .join(" ")}
            </p>

            <div
              className="
                mx-auto
                mt-2
                h-[2px]
                w-7
                rounded-full
                bg-white/50
              "
            />

            <p
              className="
                mt-2
                text-[9px]
                font-medium
                uppercase
                tracking-[0.08em]
                text-white/75
              "
            >
              Conference
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Conferences() {
  const resultsRef =
    useRef(null);

  const [
    keyword,
    setKeyword,
  ] = useState("");

  const [
    sortBy,
    setSortBy,
  ] = useState(
    "upcoming",
  );

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    pageItems,
    setPageItems,
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

  const debouncedKeyword =
    useDebounce(
      keyword,
      350,
    );

  /* =======================================================
     PAGE TITLE
  ======================================================= */

  useEffect(() => {
    document.title =
      "Conferences | Technical Journals";
  }, []);

  /* =======================================================
     FETCH CONFERENCES

     NO FILTERS
  ======================================================= */

  useEffect(() => {
    const controller =
      new AbortController();

    async function loadConferences() {
      try {
        setLoading(true);
        setLoadError("");

        const params = {
          page,
          limit:
            PAGE_SIZE,

          search:
            debouncedKeyword ||
            undefined,

          sort:
            sortBy,
        };

        const response =
          await fetchConferences(
            params,
            controller.signal,
          );

        if (
          controller
            .signal
            .aborted
        ) {
          return;
        }

        const rows =
          Array.isArray(
            response?.conferences,
          )
            ? response.conferences
            : Array.isArray(
                  response?.data,
                )
              ? response.data
              : Array.isArray(
                    response,
                  )
                ? response
                : [];

        const normalized =
          rows.map(
            normalizeConference,
          );

        const pagination =
          response?.pagination ||
          {};

        const nextTotalItems =
          Number(
            pagination.totalItems ??
              pagination.total ??
              normalized.length,
          ) || 0;

        const nextTotalPages =
          Math.max(
            1,
            Number(
              pagination.totalPages ??
                pagination.pages ??
                1,
            ) || 1,
          );

        setPageItems(
          normalized,
        );

        setTotalItems(
          nextTotalItems,
        );

        setTotalPages(
          nextTotalPages,
        );
      } catch (error) {
        if (
          error?.name ===
            "AbortError" ||
          controller
            .signal
            .aborted
        ) {
          return;
        }

        console.error(
          "Conference loading error:",
          error,
        );

        setLoadError(
          "Unable to load conferences. Please try again.",
        );

        setPageItems([]);
        setTotalItems(0);
        setTotalPages(1);
      } finally {
        if (
          !controller
            .signal
            .aborted
        ) {
          setLoading(false);
        }
      }
    }

    loadConferences();

    return () =>
      controller.abort();
  }, [
    page,
    sortBy,
    debouncedKeyword,
    reloadKey,
  ]);

  /* =======================================================
     PAGE VALIDATION
  ======================================================= */

  useEffect(() => {
    if (
      page >
      totalPages
    ) {
      setPage(
        totalPages,
      );
    }
  }, [
    page,
    totalPages,
  ]);

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
      totalItems,
    );

  /* =======================================================
     PAGINATION
  ======================================================= */

  const visiblePages =
    useMemo(() => {
      if (
        totalPages <=
        5
      ) {
        return Array.from(
          {
            length:
              totalPages,
          },
          (_, index) =>
            index + 1,
        );
      }

      if (
        page <= 3
      ) {
        return [
          1,
          2,
          3,
          4,
          "end-ellipsis",
          totalPages,
        ];
      }

      if (
        page >=
        totalPages - 2
      ) {
        return [
          1,
          "start-ellipsis",
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
     CHANGE PAGE
  ======================================================= */

  function changePage(
    nextPage,
  ) {
    const safePage =
      Math.min(
        Math.max(
          nextPage,
          1,
        ),
        totalPages,
      );

    setPage(
      safePage,
    );

    requestAnimationFrame(
      () => {
        resultsRef.current?.scrollIntoView(
          {
            behavior:
              "smooth",
            block:
              "start",
          },
        );
      },
    );
  }

  /* =======================================================
     CLEAR SEARCH
  ======================================================= */

  function clearSearch() {
    setKeyword("");
    setPage(1);
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main
      className="
        overflow-x-hidden
        bg-white
      "
    >

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          relative
          isolate
          min-h-[330px]
          overflow-hidden
          bg-[#03183F]
          text-white

          sm:min-h-[350px]

          lg:min-h-[360px]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(3,18,49,.98) 0%,
              rgba(3,18,49,.91) 36%,
              rgba(3,18,49,.22) 72%,
              rgba(3,18,49,.04) 100%
            ),
            url(${confBg})
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
            pointer-events-none
            absolute
            inset-0
            -z-10
            bg-[#03183F]/15

            md:bg-transparent
          "
        />

        <div
          className="
            mx-auto
            flex
            min-h-[330px]
            w-full
            max-w-[1440px]
            items-center
            px-4
            py-9

            sm:min-h-[350px]
            sm:px-8

            lg:min-h-[360px]
            lg:px-16

            xl:px-20
          "
        >
          <div
            className="
              w-full
              max-w-[650px]
            "
          >
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
                text-[30px]
                font-[600]
                tracking-[-0.02em]

                sm:text-[38px]
              "
            >
              Conferences
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
                max-w-[520px]
                text-[13px]
                leading-6
                text-white/90

                sm:text-[15px]
                sm:leading-7
              "
            >
              Discover and participate in leading conferences associated with
              Technical Journals. Share your research, connect with experts, and
              contribute to advancing knowledge.
            </motion.p>
          </div>
        </div>
      </section>

      {/* =================================================
          CONFERENCE SECTION
      ================================================= */}

      <section
        ref={
          resultsRef
        }
        className="
          scroll-mt-24
          py-8

          sm:py-10
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1280px]
            px-4

            sm:px-6

            md:px-8

            lg:px-10

            xl:px-12
          "
        >

          {/* =============================================
              TOP BAR
          ============================================= */}

          <div
            className="
              mb-5
              grid
              grid-cols-1
              gap-3

              md:grid-cols-[minmax(0,1fr)_auto]
              md:items-center
              md:gap-5
            "
          >

            {/* SEARCH */}

            <div
              className="
                relative
                w-full
                max-w-[620px]
              "
            >
              <Search
                className="
                  absolute
                  right-3.5
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-[#173E7D]
                "
              />

              <input
                value={
                  keyword
                }
                onChange={(
                  event,
                ) => {
                  setKeyword(
                    event
                      .target
                      .value,
                  );

                  setPage(1);
                }}
                placeholder="Search conferences by title, keyword, or location..."
                className="
                  h-11
                  w-full
                  rounded-[7px]
                  border
                  border-[#DCE3ED]
                  bg-white
                  px-4
                  pr-10
                  text-[12px]
                  text-[#263C60]
                  outline-none
                  transition
                  placeholder:text-[#8A98AA]

                  focus:border-[#0756CF]
                  focus:ring-2
                  focus:ring-[#0756CF]/10
                "
              />
            </div>

            {/* RESULT + SORT */}

            <div
              className="
                flex
                flex-col
                gap-2.5

                min-[460px]:flex-row
                min-[460px]:items-center
                min-[460px]:justify-between

                md:justify-end
              "
            >
              <p
                className="
                  whitespace-nowrap
                  text-[11px]
                  font-medium
                  text-[#536680]

                  sm:text-[12px]
                "
              >
                Showing{" "}
                <span className="font-semibold text-[#17345F]">
                  {
                    firstResult
                  }
                  –
                  {
                    lastResult
                  }
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#17345F]">
                  {
                    totalItems
                  }
                </span>{" "}
                conferences
              </p>

              <div
                className="
                  relative
                  shrink-0
                "
              >
                <select
                  value={
                    sortBy
                  }
                  onChange={(
                    event,
                  ) => {
                    setSortBy(
                      event
                        .target
                        .value,
                    );

                    setPage(1);
                  }}
                  className="
                    h-10
                    w-full
                    min-w-[155px]
                    appearance-none
                    rounded-[7px]
                    border
                    border-[#DCE3ED]
                    bg-white
                    pl-3
                    pr-8
                    text-[11px]
                    font-medium
                    text-[#263C60]
                    outline-none

                    focus:border-[#0756CF]

                    min-[460px]:w-[160px]

                    sm:text-[12px]
                  "
                >
                  <option value="upcoming">
                    Sort: Upcoming
                  </option>

                  <option value="newest">
                    Sort: Newest
                  </option>

                  <option value="title">
                    Sort: Title
                  </option>

                  <option value="location">
                    Sort: Location
                  </option>
                </select>

                <ChevronDown
                  className="
                    pointer-events-none
                    absolute
                    right-2.5
                    top-1/2
                    h-3.5
                    w-3.5
                    -translate-y-1/2
                    text-[#435775]
                  "
                />
              </div>
            </div>
          </div>

          {/* =============================================
              LOADING
          ============================================= */}

          {loading ? (
            <div
              className="
                flex
                min-h-[300px]
                flex-col
                items-center
                justify-center
                rounded-[10px]
                border
                border-dashed
                border-[#CCD7E5]
                bg-[#F8FAFD]
                px-5
                text-center
              "
            >
              <Loader2
                className="
                  h-8
                  w-8
                  animate-spin
                  text-[#0756CF]
                "
              />

              <p
                className="
                  mt-3
                  text-[13px]
                  font-medium
                  text-[#687991]
                "
              >
                Loading conferences...
              </p>
            </div>
          ) : loadError ? (

            /* =============================================
               ERROR
            ============================================= */

            <div
              className="
                flex
                min-h-[260px]
                flex-col
                items-center
                justify-center
                rounded-[10px]
                border
                border-dashed
                border-red-200
                bg-red-50
                px-5
                text-center
              "
            >
              <p
                className="
                  text-[14px]
                  font-semibold
                  text-red-700
                "
              >
                {loadError}
              </p>

              <button
                type="button"
                onClick={() =>
                  setReloadKey(
                    (
                      current,
                    ) =>
                      current +
                      1,
                  )
                }
                className="
                  mt-4
                  min-h-[40px]
                  rounded-[5px]
                  bg-[#0756CF]
                  px-5
                  text-[12px]
                  font-semibold
                  text-white
                  transition

                  hover:bg-[#064AB4]
                "
              >
                Try Again
              </button>
            </div>
          ) : pageItems.length ===
            0 ? (

            /* =============================================
               EMPTY
            ============================================= */

            <div
              className="
                flex
                min-h-[280px]
                flex-col
                items-center
                justify-center
                rounded-[10px]
                border
                border-dashed
                border-[#CCD7E5]
                bg-[#F8FAFD]
                px-5
                text-center
              "
            >
              <Search
                className="
                  h-9
                  w-9
                  text-[#9AA8BA]
                "
              />

              <h2
                className="
                  mt-4
                  text-[17px]
                  font-[600]
                  text-[#17345F]

                  sm:text-[18px]
                "
              >
                No conferences found
              </h2>

              <p
                className="
                  mt-2
                  max-w-[420px]
                  text-[12px]
                  leading-5
                  text-[#687991]
                "
              >
                Try another title, keyword, or location.
              </p>

              {keyword && (
                <button
                  type="button"
                  onClick={
                    clearSearch
                  }
                  className="
                    mt-5
                    min-h-[40px]
                    rounded-[5px]
                    bg-[#0756CF]
                    px-5
                    text-[12px]
                    font-semibold
                    text-white
                  "
                >
                  View All Conferences
                </button>
              )}
            </div>
          ) : (

            /* =============================================
               CONFERENCE CARDS
            ============================================= */

            <div
              className="
                space-y-4
              "
            >
              {pageItems.map(
                (
                  conference,
                  index,
                ) => {
                  const topics =
                    list(
                      conference.topics ||
                        conference.tags ||
                        conference.keywords,
                    );

                  const code =
                    text(
                      conference.code ||
                        conference.shortName,
                    ) ||
                    `CONF ${new Date().getFullYear()}`;

                  const organizer =
                    conferenceOrganizer(
                      conference,
                    );

                  const title =
                    text(
                      conference.title,
                    ) ||
                    "Academic Conference";

                  const description =
                    text(
                      conference.description,
                    ) ||
                    "Explore current research, exchange knowledge, and connect with researchers and professionals.";

                  return (
                    <motion.article
                      key={
                        conference.id ||
                        conference.slug ||
                        `${code}-${index}`
                      }
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration:
                          0.3,
                        delay:
                          index *
                          0.04,
                      }}
                      whileHover={{
                        y: -2,
                      }}
                      className="
                        group
                        grid
                        min-w-0
                        grid-cols-1
                        gap-4
                        overflow-hidden
                        rounded-[10px]
                        border
                        border-[#E1E7EF]
                        bg-white
                        p-4
                        transition-all
                        duration-300

                        hover:border-[#B5CBEA]
                        hover:shadow-[0_10px_28px_rgba(10,39,82,0.07)]

                        sm:grid-cols-[122px_minmax(0,1fr)]
                        sm:items-start
                        sm:gap-5

                        md:grid-cols-[128px_minmax(0,1fr)]

                        lg:grid-cols-[132px_minmax(0,1fr)]

                        xl:grid-cols-[136px_minmax(0,1fr)_210px]
                        xl:gap-6
                      "
                    >

                      {/* COVER */}

                      <ConferenceImage
                        conference={
                          conference
                        }
                        code={
                          code
                        }
                        index={
                          index
                        }
                      />

                      {/* ===================================
                          MAIN DETAILS
                      =================================== */}

                      <div
                        className="
                          min-w-0
                          py-0.5
                        "
                      >

                        {/* TYPE */}

                        <span
                          className="
                            inline-flex
                            max-w-full
                            rounded-[4px]
                            bg-[#EAF2FF]
                            px-2.5
                            py-1
                            text-[9.5px]
                            font-semibold
                            text-[#0756CF]

                            sm:text-[10px]
                          "
                        >
                          {conferenceType(
                            conference,
                          )}
                        </span>

                        {/* TITLE */}

                        <h2
                          className="
                            mt-2
                            break-words
                            text-[15px]
                            font-[600]
                            leading-[1.4]
                            text-[#071C46]

                            sm:text-[15.5px]

                            md:text-[16px]

                            lg:text-[16.5px]
                          "
                        >
                          {title}
                        </h2>

                        {/* ORGANIZER */}

                        <p
                          className="
                            mt-1.5
                            break-words
                            text-[11px]
                            leading-5
                            text-[#415675]

                            sm:text-[11.5px]
                          "
                        >
                          <span
                            className="
                              font-semibold
                              text-[#2B4265]
                            "
                          >
                            Organized by:
                          </span>{" "}
                          {organizer}
                        </p>

                        {/* DESCRIPTION */}

                        <p
                          className="
                            mt-1.5
                            line-clamp-3
                            text-[11px]
                            leading-[1.65]
                            text-[#66758A]

                            sm:line-clamp-2
                            sm:text-[11.5px]
                          "
                        >
                          {description}
                        </p>

                        {/* TOPICS */}

                        <div
                          className="
                            mt-2.5
                            flex
                            flex-wrap
                            items-center
                            gap-1.5
                          "
                        >
                          <span
                            className="
                              text-[10.5px]
                              font-semibold
                              text-[#354B6B]
                            "
                          >
                            Topics:
                          </span>

                          {(topics.length
                            ? topics
                            : [
                                conferenceSubject(
                                  conference,
                                ),
                              ]
                          )
                            .slice(
                              0,
                              4,
                            )
                            .map(
                              (
                                topic,
                              ) => (
                                <span
                                  key={
                                    topic
                                  }
                                  className="
                                    max-w-full
                                    break-words
                                    rounded-full
                                    bg-[#F0F4F9]
                                    px-2
                                    py-1
                                    text-[9.5px]
                                    font-medium
                                    leading-4
                                    text-[#405879]

                                    sm:text-[10px]
                                  "
                                >
                                  {topic}
                                </span>
                              ),
                            )}
                        </div>
                      </div>

                      {/* ===================================
                          META SIDE
                      =================================== */}

                      <div
                        className="
                          flex
                          min-w-0
                          flex-col
                          gap-4
                          border-t
                          border-[#E7EBF2]
                          pt-4

                          sm:col-span-2
                          sm:flex-row
                          sm:items-center
                          sm:justify-between

                          xl:col-span-1
                          xl:border-l
                          xl:border-t-0
                          xl:pl-5
                          xl:pt-1
                          xl:flex-col
                          xl:items-stretch
                          xl:justify-between
                        "
                      >
                        <div
                          className="
                            grid
                            min-w-0
                            grid-cols-1
                            gap-3

                            min-[460px]:grid-cols-2

                            sm:flex
                            sm:flex-wrap
                            sm:gap-x-5

                            xl:grid
                            xl:grid-cols-1
                          "
                        >

                          {/* DATE */}

                          <p
                            className="
                              flex
                              min-w-0
                              items-start
                              gap-2.5
                              text-[11px]
                              font-medium
                              leading-5
                              text-[#30496D]

                              sm:text-[11.5px]
                            "
                          >
                            <CalendarDays
                              className="
                                mt-[2px]
                                h-4
                                w-4
                                shrink-0
                                text-[#2455A3]
                              "
                            />

                            <span className="break-words">
                              {conferenceDate(
                                conference,
                              )}
                            </span>
                          </p>

                          {/* LOCATION */}

                          <p
                            className="
                              flex
                              min-w-0
                              items-start
                              gap-2.5
                              text-[11px]
                              font-medium
                              leading-5
                              text-[#30496D]

                              sm:text-[11.5px]
                            "
                          >
                            <MapPin
                              className="
                                mt-[2px]
                                h-4
                                w-4
                                shrink-0
                                text-[#2455A3]
                              "
                            />

                            <span className="break-words">
                              {conferenceLocation(
                                conference,
                              )}
                            </span>
                          </p>
                        </div>

                        {/* VIEW DETAILS */}

                        <Link
                          to={
                            conference.detailsUrl
                          }
                          className="
                            inline-flex
                            min-h-[38px]
                            w-full
                            shrink-0
                            items-center
                            justify-center
                            rounded-[5px]
                            border
                            border-[#0756CF]
                            px-4
                            text-[11.5px]
                            font-semibold
                            text-[#0756CF]
                            transition

                            hover:bg-[#0756CF]
                            hover:text-white

                            sm:w-[150px]

                            xl:mt-4
                            xl:w-full
                          "
                        >
                          View Details
                        </Link>
                      </div>
                    </motion.article>
                  );
                },
              )}
            </div>
          )}

          {/* =============================================
              PAGINATION
          ============================================= */}

          {!loading &&
            !loadError &&
            totalItems >
              PAGE_SIZE &&
            totalPages >
              1 && (
              <nav
                aria-label="Conference pagination"
                className="
                  mt-7
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-2
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    changePage(
                      page -
                        1,
                    )
                  }
                  disabled={
                    page === 1
                  }
                  aria-label="Previous page"
                  className="
                    grid
                    h-8
                    w-8
                    place-items-center
                    rounded-[5px]
                    border
                    border-[#DCE3ED]
                    text-[#234A87]
                    transition

                    hover:border-[#0756CF]
                    hover:text-[#0756CF]

                    disabled:cursor-not-allowed
                    disabled:opacity-30
                  "
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {visiblePages.map(
                  (
                    item,
                  ) =>
                    typeof item ===
                    "number" ? (
                      <button
                        key={
                          item
                        }
                        type="button"
                        onClick={() =>
                          changePage(
                            item,
                          )
                        }
                        aria-current={
                          page ===
                          item
                            ? "page"
                            : undefined
                        }
                        className={`
                          h-8
                          min-w-8
                          rounded-[5px]
                          px-2
                          text-[11px]
                          font-semibold
                          transition

                          ${
                            page ===
                            item
                              ? `
                                bg-[#0756CF]
                                text-white
                                shadow-[0_4px_10px_rgba(7,86,207,.24)]
                              `
                              : `
                                border
                                border-[#DCE3ED]
                                text-[#405675]

                                hover:border-[#0756CF]
                                hover:text-[#0756CF]
                              `
                          }
                        `}
                      >
                        {item}
                      </button>
                    ) : (
                      <span
                        key={
                          item
                        }
                        className="
                          grid
                          h-8
                          min-w-6
                          place-items-center
                          text-[12px]
                          text-[#60718A]
                        "
                      >
                        …
                      </span>
                    ),
                )}

                <button
                  type="button"
                  onClick={() =>
                    changePage(
                      page +
                        1,
                    )
                  }
                  disabled={
                    page ===
                    totalPages
                  }
                  aria-label="Next page"
                  className="
                    grid
                    h-8
                    w-8
                    place-items-center
                    rounded-[5px]
                    border
                    border-[#DCE3ED]
                    text-[#234A87]
                    transition

                    hover:border-[#0756CF]
                    hover:text-[#0756CF]

                    disabled:cursor-not-allowed
                    disabled:opacity-30
                  "
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            )}
        </div>
      </section>

      {/* =================================================
          CTA
      ================================================= */}

      <section
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-4
          pb-8

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
            once: true,
            amount: 0.3,
          }}
          className="
            relative
            overflow-hidden
            rounded-[11px]
            bg-[linear-gradient(100deg,#031B47,#063B80)]
            text-white
            shadow-[0_10px_26px_rgba(3,24,63,.15)]
          "
        >
          <div
            className="
              grid
              min-h-[110px]
              items-center

              md:grid-cols-[180px_minmax(0,1fr)]

              lg:grid-cols-[190px_minmax(0,1fr)]
            "
          >

            {/* CTA IMAGE */}

            <div
              className="
                relative
                hidden
                h-full
                overflow-hidden

                md:block
              "
            >
              <img
                src={
                  conferenceCta
                }
                alt="Conference calendar"
                loading="lazy"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-contain
                  p-3
                "
              />
            </div>

            {/* CTA CONTENT */}

            <div
              className="
                grid
                items-center
                gap-6
                px-5
                py-7

                sm:px-6

                lg:grid-cols-[minmax(0,1fr)_auto]
                lg:px-9
              "
            >
              <div>
                <h2
                  className="
                    text-[19px]
                    font-[550]

                    sm:text-[22px]

                    lg:text-[23px]
                  "
                >
                  Organize Your Conference with Us
                </h2>

                <p
                  className="
                    mt-2
                    max-w-[430px]
                    text-[12px]
                    leading-5
                    text-white/85

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  Partner with Technical Journals to host your conference and
                  reach a global audience of researchers and professionals.
                </p>
              </div>

              <div
                className="
                  flex
                  flex-col
                  gap-2.5

                  min-[430px]:flex-row
                  min-[430px]:flex-wrap
                "
              >
                <Link
                  to="/contact"
                  className="
                    inline-flex
                    h-11
                    w-full
                    min-w-[150px]
                    items-center
                    justify-center
                    rounded-[6px]
                    bg-white
                    px-5
                    text-[12px]
                    font-semibold
                    text-[#0756CF]
                    transition

                    hover:bg-[#EDF4FF]

                    min-[430px]:w-auto

                    sm:text-[13px]
                  "
                >
                  Partner With Us
                </Link>

                <Link
                  to="/services"
                  className="
                    inline-flex
                    h-11
                    w-full
                    min-w-[140px]
                    items-center
                    justify-center
                    rounded-[6px]
                    border
                    border-white/75
                    px-5
                    text-[12px]
                    font-semibold
                    text-white
                    transition

                    hover:bg-white/10

                    min-[430px]:w-auto

                    sm:text-[13px]
                  "
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}