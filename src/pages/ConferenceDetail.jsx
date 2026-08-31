import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Loader2,
  MapPin,
  Presentation,
  ShieldCheck,
} from "lucide-react";

import Seo from "../components/common/Seo";
import NotFound from "./NotFound";

import {
  fetchConferenceByIdOrSlug,
} from "../services/conferenceService";

import confBg from "../assets/images/conferencebg.png";

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
   TOPICS NORMALIZER
========================================================= */

function normalizeTopics(value) {
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

  const text = cleanText(value);

  /*
    Handle JSON array saved as string.
  */

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

  /*
    Supports:
    AI, IoT, ML
    AI; IoT; ML
    one topic per line
  */

  return text
    .split(/[,;\n]/)
    .map((item) =>
      item.trim()
    )
    .filter(Boolean);
}

/* =========================================================
   CONFERENCE DETAIL ROW
========================================================= */

function DetailRow({
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-start
        justify-between
        gap-4
        border-b
        border-[#E8ECF2]
        py-3

        first:pt-0
        last:border-0
        last:pb-0
      "
    >
      <dt
        className="
          shrink-0
          text-[11px]
          font-medium
          leading-5
          text-[#7A889C]

          sm:text-[12px]
        "
      >
        {label}
      </dt>

      <dd
        className="
          min-w-0
          max-w-[62%]
          break-words
          text-right
          text-[11px]
          font-semibold
          leading-5
          text-[#243B60]

          sm:text-[12px]
        "
      >
        {value}
      </dd>
    </div>
  );
}

/* =========================================================
   HERO META ITEM
========================================================= */

function HeroMeta({
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
        gap-2.5
      "
    >
      <span
        className="
          mt-[1px]
          grid
          h-8
          w-8
          shrink-0
          place-items-center
          rounded-full
          bg-white/[0.10]
        "
      >
        <Icon
          className="
            h-4
            w-4
            text-[#A7D0FF]
          "
        />
      </span>

      <div className="min-w-0">
        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.08em]
            text-white/50
          "
        >
          {label}
        </p>

        <p
          className="
            mt-[3px]
            break-words
            text-[10.5px]
            font-medium
            leading-4
            text-white/90

            sm:text-[11px]

            lg:text-[11.5px]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   CONFERENCE DETAIL PAGE
========================================================= */

export default function ConferenceDetail() {
  const { id } =
    useParams();

  const identifier =
    decodeURIComponent(
      id || ""
    );

  /* =======================================================
     STATE
  ======================================================= */

  const [
    conference,
    setConference,
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
    loadError,
    setLoadError,
  ] = useState("");

  /* =======================================================
     FETCH CONFERENCE
  ======================================================= */

  useEffect(() => {
    let active = true;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    async function loadConference() {
      try {
        setLoading(true);
        setNotFound(false);
        setLoadError("");

        const data =
          await fetchConferenceByIdOrSlug(
            identifier
          );

        if (!active) {
          return;
        }

        if (!data) {
          setConference(null);
          setNotFound(true);
          return;
        }

        setConference(data);
      } catch (error) {
        if (!active) {
          return;
        }

        console.error(
          "Conference detail error:",
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
          setLoadError(
            error?.message ||
              "Unable to load conference details."
          );
        }

        setConference(null);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    if (identifier) {
      loadConference();
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
              text-[#64748b]
            "
          >
            Loading conference details...
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
    (!conference &&
      !loadError)
  ) {
    return <NotFound />;
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (
    loadError &&
    !conference
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
            rounded-[12px]
            border
            border-red-200
            bg-red-50
            px-5
            py-9
            text-center

            sm:px-7
          "
        >
          <Presentation
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
            Unable to Load Conference
          </h2>

          <p
            className="
              mt-2
              text-[12px]
              leading-5
              text-red-600
            "
          >
            {loadError}
          </p>

          <Link
            to="/conferences"
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
            Back to Conferences
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
      conference.title
    ) ||
    "Academic Conference";

  const code =
    cleanText(
      conference.code ||
      conference.conference_code ||
      conference.short_code
    );

  const type =
    cleanText(
      conference.conference_type
    );

  const subject =
    cleanText(
      conference.subject_area ||
      conference.subject
    );

  const organizer =
    cleanText(
      conference.organizer ||
      conference.organized_by
    );

  const displayDate =
    cleanText(
      conference.display_date
    );

  const startDate =
    cleanText(
      conference.start_date
    );

  const endDate =
    cleanText(
      conference.end_date
    );

  const dateLabel =
    displayDate ||
    (
      startDate &&
      endDate &&
      startDate !== endDate
        ? `${startDate} – ${endDate}`
        : startDate ||
          endDate
    );

  const location =
    cleanText(
      conference.location
    );

  const venue =
    cleanText(
      conference.venue
    );

  const region =
    cleanText(
      conference.region
    );

  const mode =
    cleanText(
      conference.conference_mode ||
      conference.mode
    );

  const description =
    cleanText(
      conference.description
    );

  const topics =
    normalizeTopics(
      conference.topics
    );

  /* =======================================================
     FIXED DISPLAY VALUES

     Same structure for every conference.
  ======================================================= */

  const uiCode =
    code ||
    "Conference";

  const uiType =
    type ||
    "Academic Conference";

  const uiSubject =
    subject ||
    "Multidisciplinary Research";

  const uiDate =
    dateLabel ||
    "Date to be announced";

  const uiLocation =
    location ||
    "Location to be announced";

  const uiVenue =
    venue ||
    "Not specified";

  const uiMode =
    mode ||
    "Not specified";

  const uiRegion =
    region ||
    "Not specified";

  const uiOrganizer =
    organizer ||
    "Technical Journals";

  const uiDescription =
    description ||
    "Detailed information about this conference is currently being updated by the organizing team.";

  /* =======================================================
     SEO
  ======================================================= */

  const seoDescription = [
    title,

    organizer
      ? `Organized by ${organizer}`
      : "",

    dateLabel,

    location,

    description,
  ]
    .filter(Boolean)
    .join(". ");

  const jsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "Event",

    name:
      title,

    ...(startDate
      ? {
          startDate,
        }
      : {}),

    ...(endDate
      ? {
          endDate,
        }
      : {}),

    ...(location
      ? {
          location: {
            "@type":
              "Place",

            name:
              location,
          },
        }
      : {}),

    ...(organizer
      ? {
          organizer: {
            "@type":
              "Organization",

            name:
              organizer,
          },
        }
      : {}),
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <>
      <Seo
        title={title}
        description={
          seoDescription ||
          `${title} conference details.`
        }
        path={`/conferences/${encodeURIComponent(
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
            HERO

            NO CONFERENCE IMAGE FROM BACKEND
            SAME STATIC BACKGROUND FOR EVERY CONFERENCE
        ================================================= */}

        <section
          className="
            relative
            isolate
            min-h-[340px]
            overflow-hidden
            bg-[#03183f]
            text-white

            sm:min-h-[350px]

            md:min-h-[360px]

            lg:min-h-[370px]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(3,19,53,0.99) 0%,
                rgba(3,19,53,0.95) 36%,
                rgba(3,19,53,0.76) 68%,
                rgba(3,19,53,0.42) 100%
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
          {/* Mobile overlay */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              -z-10
              bg-[#03183f]/20

              md:bg-transparent
            "
          />

          <div
            className="
              mx-auto
              flex
              min-h-[340px]
              w-full
              max-w-[1280px]
              flex-col
              px-4
              pb-8
              pt-5

              sm:min-h-[350px]
              sm:px-6
              sm:pb-9

              md:min-h-[360px]
              md:px-8

              lg:min-h-[370px]
              lg:px-10
              lg:pb-10
              lg:pt-6

              xl:px-12
            "
          >

            {/* =============================================
                WHITE BREADCRUMB
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

                lg:text-[11.5px]
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
                to="/conferences"
                className="
                  text-white/75
                  transition

                  hover:text-white
                "
              >
                Conferences
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
                className="
                  max-w-[180px]
                  truncate
                  font-semibold
                  text-white

                  min-[420px]:max-w-[260px]

                  sm:max-w-[360px]

                  md:max-w-[500px]

                  lg:max-w-[650px]
                "
                title={title}
              >
                {uiCode}
              </span>
            </nav>

            {/* =============================================
                HERO MAIN CONTENT

                SINGLE CONTENT AREA
                NO EMPTY IMAGE COLUMN
            ============================================= */}

            <div
              className="
                flex
                flex-1
                items-center
                py-7

                sm:py-8

                lg:py-9
              "
            >
              <div
                className="
                  w-full
                  max-w-[900px]
                  min-w-0
                "
              >

                {/* CONFERENCE TYPE */}

                <span
                  className="
                    inline-flex
                    min-h-[25px]
                    items-center
                    rounded-[4px]
                    border
                    border-white/25
                    bg-white/[0.10]
                    px-3
                    text-[9px]
                    font-semibold
                    text-white
                    backdrop-blur-sm

                    sm:text-[10px]
                  "
                >
                  {uiType}
                </span>

                {/* TITLE */}

                <h1
                  className="
                    mt-3
                    max-w-[860px]
                    break-words
                    text-[24px]
                    font-[600]
                    leading-[1.18]
                    tracking-[-0.025em]
                    text-white

                    min-[420px]:text-[26px]

                    sm:text-[30px]

                    md:text-[33px]

                    lg:text-[36px]

                    xl:text-[38px]
                  "
                >
                  {title}
                </h1>

                {/* SUBJECT */}

                <p
                  className="
                    mt-2.5
                    max-w-[680px]
                    break-words
                    text-[11px]
                    font-medium
                    leading-5
                    text-white/75

                    sm:text-[12px]

                    lg:text-[13px]
                  "
                >
                  {uiSubject}
                </p>

                {/* =========================================
                    HERO INFORMATION

                    SAME 3 FIELDS FOR EVERY CONFERENCE
                ========================================= */}

                <div
                  className="
                    mt-6
                    grid
                    w-full
                    max-w-[550px]
                    grid-cols-1
                    gap-1

                    min-[440px]:grid-cols-2

                    md:grid-cols-3

                    md:gap-1
                  "
                >
                  <HeroMeta
                    icon={
                      CalendarDays
                    }
                    label="Conference Date"
                    value={
                      uiDate
                    }
                  />

                  <HeroMeta
                    icon={
                      MapPin
                    }
                    label="Location"
                    value={
                      uiLocation
                    }
                  />

                  <HeroMeta
                    icon={
                      Building2
                    }
                    label="Organized By"
                    value={
                      uiOrganizer
                    }
                  />
                </div>

                {/* =========================================
                    FIXED ACTIONS

                    NO REGISTER
                ========================================= */}

                <div
                  className="
                    mt-7
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
                      shadow-[0_6px_16px_rgba(23,105,224,0.22)]
                      transition
                      duration-300

                      hover:-translate-y-[1px]
                      hover:bg-[#0B59C7]

                      sm:text-[12px]
                    "
                  >
                    Submit Your Paper
                  </Link>

                  <Link
                    to="/conferences"
                    className="
                      inline-flex
                      min-h-[42px]
                      items-center
                      justify-center
                      rounded-[5px]
                      border
                      border-white/40
                      bg-white/[0.05]
                      px-5
                      text-[11.5px]
                      font-semibold
                      text-white
                      transition
                      duration-300

                      hover:bg-white
                      hover:text-[#0756cf]

                      sm:text-[12px]
                    "
                  >
                    View All Conferences
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <section
          className="
            mx-auto
            grid
            w-full
            max-w-[1200px]
            grid-cols-1
            gap-7
            px-4
            py-8

            sm:px-6
            sm:py-9

            md:px-8
            md:py-10

            lg:grid-cols-[minmax(0,1fr)_290px]
            lg:gap-8

            xl:grid-cols-[minmax(0,1fr)_310px]
          "
        >

          {/* ===============================================
              LEFT CONTENT
          =============================================== */}

          <div className="min-w-0">

            {/* ABOUT */}

            <section>
              <h2
                className="
                  text-[20px]
                  font-[600]
                  tracking-[-0.02em]
                  text-[#102D63]

                  sm:text-[21px]

                  lg:text-[22px]
                "
              >
                About the Conference
              </h2>

              <div
                className="
                  mt-2
                  h-[3px]
                  w-11
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
                  text-[12px]
                  font-medium
                  leading-[1.85]
                  text-[#596A80]

                  sm:text-[12.5px]

                  md:text-justify

                  lg:text-[13px]
                "
              >
                {uiDescription}
              </p>
            </section>

            {/* =================================================
                TOPICS

                SAME SECTION FOR EVERY CONFERENCE
            ================================================= */}

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
                Topics Covered
              </h2>

              {topics.length > 0 ? (
                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {topics.map(
                    (
                      topic,
                      index
                    ) => (
                      <span
                        key={`${topic}-${index}`}
                        className="
                          max-w-full
                          break-words
                          rounded-full
                          border
                          border-[#DCE4EE]
                          bg-[#F7F9FC]
                          px-3
                          py-1.5
                          text-[10.5px]
                          font-medium
                          leading-4
                          text-[#52657E]

                          sm:text-[11px]
                        "
                      >
                        {topic}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <p
                  className="
                    mt-4
                    text-[12px]
                    font-medium
                    leading-6
                    text-[#68788D]
                  "
                >
                  Conference topics will be updated by the organizing team.
                </p>
              )}
            </section>

            {/* =================================================
                WHAT TO EXPECT
            ================================================= */}

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
                What to Expect
              </h2>

              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  gap-x-6
                  gap-y-3

                  min-[560px]:grid-cols-2
                "
              >
                {[
                  "Keynote sessions from researchers and industry experts",

                  "Peer-reviewed research paper and poster presentations",

                  "Networking with researchers and academic professionals",

                  "Opportunities for academic collaboration and publication",
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
                        min-w-0
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
                          min-w-0
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

            {/* =================================================
                BOTTOM SUBMIT CTA
            ================================================= */}

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
                  rounded-[9px]
                  border
                  border-[#D8E5F6]
                  bg-[#F7FAFF]
                  p-4

                  sm:flex
                  sm:items-center
                  sm:justify-between
                  sm:gap-5
                  sm:p-5
                "
              >
                <div className="min-w-0">
                  <h3
                    className="
                      text-[14px]
                      font-[600]
                      text-[#102D63]

                      sm:text-[15px]
                    "
                  >
                    Ready to Submit Your Research?
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      font-medium
                      leading-5
                      text-[#66768B]
                    "
                  >
                    Submit your paper for consideration for this conference.
                  </p>
                </div>

                <Link
                  to="/submit-manuscript"
                  className="
                    mt-4
                    inline-flex
                    min-h-[42px]
                    w-full
                    shrink-0
                    items-center
                    justify-center
                    rounded-[5px]
                    bg-[#0756cf]
                    px-5
                    text-[11.5px]
                    font-semibold
                    text-white
                    transition

                    hover:bg-[#064ab4]

                    sm:mt-0
                    sm:w-auto
                  "
                >
                  Submit Your Paper
                </Link>
              </div>
            </section>
          </div>

          {/* ===============================================
              RIGHT SIDEBAR

              SAME UI FOR ALL CONFERENCES
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

            {/* CONFERENCE DETAILS */}

            <div
              className="
                rounded-[10px]
                border
                border-[#DFE5ED]
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
                  border-[#E4E9F0]
                  pb-3
                "
              >
                <span
                  className="
                    grid
                    h-8
                    w-8
                    shrink-0
                    place-items-center
                    rounded-full
                    bg-[#EAF2FF]
                    text-[#0756cf]
                  "
                >
                  <Presentation className="h-4 w-4" />
                </span>

                <h3
                  className="
                    text-[14px]
                    font-[600]
                    text-[#102D63]
                  "
                >
                  Conference Details
                </h3>
              </div>

              <dl className="mt-4">
                <DetailRow
                  label="Code"
                  value={
                    uiCode
                  }
                />

                <DetailRow
                  label="Date"
                  value={
                    uiDate
                  }
                />

                <DetailRow
                  label="Location"
                  value={
                    uiLocation
                  }
                />

                <DetailRow
                  label="Venue"
                  value={
                    uiVenue
                  }
                />

                <DetailRow
                  label="Type"
                  value={
                    uiType
                  }
                />

                <DetailRow
                  label="Mode"
                  value={
                    uiMode
                  }
                />

                <DetailRow
                  label="Region"
                  value={
                    uiRegion
                  }
                />

                <DetailRow
                  label="Organizer"
                  value={
                    uiOrganizer
                  }
                />
              </dl>
            </div>

            {/* =============================================
                SUBMIT PAPER
            ============================================= */}

            <div
              className="
                rounded-[10px]
                border
                border-[#CFE0F7]
                bg-[#F3F8FF]
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
                Submit Your Research
              </h3>

              <p
                className="
                  mt-2
                  text-[11px]
                  font-medium
                  leading-5
                  text-[#64758C]
                "
              >
                Submit your research paper for consideration for this conference.
              </p>

              <Link
                to="/submit-manuscript"
                className="
                  mt-4
                  inline-flex
                  min-h-[41px]
                  w-full
                  items-center
                  justify-center
                  rounded-[5px]
                  bg-[#0756cf]
                  px-4
                  text-[11px]
                  font-semibold
                  text-white
                  transition

                  hover:bg-[#064ab4]
                "
              >
                Submit Your Paper
              </Link>
            </div>

            {/* =============================================
                SUPPORT
            ============================================= */}

            <div
              className="
                rounded-[10px]
                border
                border-[#E0E6EE]
                bg-white
                p-4

                sm:p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
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
                    bg-[#EAF2FF]
                    text-[#0756cf]
                  "
                >
                  <ShieldCheck className="h-[18px] w-[18px]" />
                </span>

                <h3
                  className="
                    text-[14px]
                    font-[600]
                    text-[#102D63]
                  "
                >
                  Need Help?
                </h3>
              </div>

              <p
                className="
                  mt-3
                  text-[11px]
                  font-medium
                  leading-5
                  text-[#64758C]
                "
              >
                Contact our team for paper submission or conference publication queries.
              </p>

              <Link
                to="/contact"
                className="
                  mt-3
                  inline-flex
                  text-[11px]
                  font-semibold
                  text-[#0756cf]
                  transition

                  hover:text-[#0047A7]
                "
              >
                Contact Support →
              </Link>
            </div>

            {/* BACK */}

            <Link
              to="/conferences"
              className="
                inline-flex
                min-h-[42px]
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

                hover:border-[#0756cf]
                hover:text-[#0756cf]
              "
            >
              ← Back to Conferences
            </Link>
          </aside>
        </section>
      </main>
    </>
  );
}