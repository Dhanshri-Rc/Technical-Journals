import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  MapPin,
  Search,
  X,
} from "lucide-react";
import confBg from "../assets/images/conferencebg.png";
import conferenceCta from "../assets/images/conferencecta.png";
import { CONFERENCES } from "../data/site";

// Keep enough cards on each page for a compact layout while ensuring
// pagination is useful even when the conference list is relatively short.
const PAGE_SIZE = 5;

const TYPE_OPTIONS = [
  "International Conference",
  "National Conference",
  "Workshop",
  "Symposium",
  "Webinar",
];

const SUBJECT_OPTIONS = [
  "Computer Science",
  "Engineering",
  "Electrical & Electronics",
  "Mechanical Engineering",
  "Civil Engineering",
];

const DATE_OPTIONS = [
  "Upcoming",
  "Next 3–6 Months",
  "Next 6–12 Months",
  "Past Conferences",
];
const LOCATION_OPTIONS = [
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Africa",
  "Oceania",
];

const text = (value) => String(value ?? "").trim();
const lower = (value) => text(value).toLowerCase();

const list = (value) => {
  if (Array.isArray(value)) return value.map(text).filter(Boolean);
  return text(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const conferenceType = (item) =>
  text(
    item.type ||
      item.conferenceType ||
      item.category ||
      "International Conference",
  );

const conferenceSubject = (item) =>
  text(
    item.subject ||
      item.subjectArea ||
      item.field ||
      item.discipline ||
      "Computer Science",
  );

const conferenceLocation = (item) =>
  text(item.location || item.venue || item.city || "Location to be announced");

const conferenceRegion = (item) =>
  text(item.region || item.continent || item.locationGroup);

const conferenceDate = (item) =>
  text(
    item.date ||
      item.dates ||
      item.eventDate ||
      item.startDate ||
      "Date to be announced",
  );

const matchesEverySelected = (selected, source) =>
  selected.length === 0 ||
  selected.some((value) => lower(source).includes(lower(value)));

const colorStyles = [
  "from-[#064391] to-[#075fc9]",
  "from-[#168646] to-[#28ae61]",
  "from-[#6841b4] to-[#945ad9]",
  "from-[#f06416] to-[#ff8a24]",
  "from-[#0495a8] to-[#10bac1]",
];

export default function Conferences() {
  const resultsRef = useRef(null);
  const [heroKeyword, setHeroKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("upcoming");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [draftFilters, setDraftFilters] = useState({
    types: [],
    subjects: [],
    dates: [],
    locations: [],
  });
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);

  useEffect(() => {
    document.title = "Conferences | Technical Journals";
  }, []);

  const filteredConferences = useMemo(() => {
    const query = lower(keyword);

    const result = CONFERENCES.filter((item) => {
      const searchable = [
        item.title,
        item.code,
        item.description,
        conferenceLocation(item),
        conferenceSubject(item),
        list(item.topics || item.tags || item.keywords).join(" "),
      ]
        .map(lower)
        .join(" ");

      return (
        (!query || searchable.includes(query)) &&
        matchesEverySelected(appliedFilters.types, conferenceType(item)) &&
        matchesEverySelected(
          appliedFilters.subjects,
          conferenceSubject(item),
        ) &&
        matchesEverySelected(
          appliedFilters.locations,
          `${conferenceRegion(item)} ${conferenceLocation(item)}`,
        ) &&
        matchesEverySelected(
          appliedFilters.dates,
          text(item.dateGroup || item.status || item.timeline),
        )
      );
    });

    return [...result].sort((a, b) => {
      if (sortBy === "title") return text(a.title).localeCompare(text(b.title));
      if (sortBy === "location")
        return conferenceLocation(a).localeCompare(conferenceLocation(b));
      if (sortBy === "newest")
        return lower(conferenceDate(b)).localeCompare(lower(conferenceDate(a)));
      return lower(conferenceDate(a)).localeCompare(lower(conferenceDate(b)));
    });
  }, [keyword, appliedFilters, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredConferences.length / PAGE_SIZE),
  );
  const pageItems = filteredConferences.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  const firstResult = filteredConferences.length
    ? (page - 1) * PAGE_SIZE + 1
    : 0;
  const lastResult = Math.min(page * PAGE_SIZE, filteredConferences.length);

  const visiblePages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (page <= 3) return [1, 2, 3, 4, "end-ellipsis", totalPages];
    if (page >= totalPages - 2) {
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
  }, [page, totalPages]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const toggleFilter = (group, value) => {
    setDraftFilters((current) => ({
      ...current,
      [group]: current[group].includes(value)
        ? current[group].filter((item) => item !== value)
        : [...current[group], value],
    }));
  };

  const clearFilters = () => {
    const empty = { types: [], subjects: [], dates: [], locations: [] };
    setDraftFilters(empty);
    setAppliedFilters(empty);
    setKeyword("");
    setHeroKeyword("");
    setPage(1);
  };

  const applyFilters = (event) => {
    event.preventDefault();
    setAppliedFilters({ ...draftFilters });
    setPage(1);
    setFiltersOpen(false);
  };

  const runHeroSearch = (event) => {
    event.preventDefault();
    setKeyword(heroKeyword.trim());
    setPage(1);
    requestAnimationFrame(() =>
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
    );
  };

  const changePage = (nextPage) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filterPanel = (
    <form
      onSubmit={applyFilters}
      className="rounded-[10px] border border-[#e1e7f0] bg-white p-4 shadow-[0_5px_20px_rgba(8,33,72,0.05)]"
    >
      <div className="flex items-center justify-between border-b border-[#e7ebf2] pb-4">
        <h2 className="text-[15px] font-[600] text-[#071b45]">
          Filter Conferences
        </h2>
        <button
          type="button"
          onClick={clearFilters}
          className="text-[12px] font-semibold text-[#0756cf] hover:text-[#003c96]"
        >
          Clear All
        </button>
      </div>

      <div className="relative my-4">
        <input
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
            setPage(1);
          }}
          placeholder="Search within results"
          className="h-9 w-full border-b border-[#dce3ed] bg-transparent pr-8 text-[13px] text-[#263c60] outline-none placeholder:text-[#60718a] focus:border-[#0756cf]"
        />
        <Search className="absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1d4d9a]" />
      </div>

      {[
        ["types", "Conference Type", TYPE_OPTIONS],
        ["subjects", "Subject Area", SUBJECT_OPTIONS],
        ["dates", "Date", DATE_OPTIONS],
        ["locations", "Location", LOCATION_OPTIONS],
      ].map(([group, title, options]) => (
        <fieldset
          key={group}
          className="border-b border-[#e7ebf2] py-4 last:border-0"
        >
          <legend className="mb-3 flex w-full items-center justify-between text-[14px] font-[550] text-[#0a214f]">
            {title}
            <ChevronDown className="h-3 w-3" />
          </legend>
          <div className="space-y-2.5">
            <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#334a70]">
              <span
                className={`grid h-3.5 w-3.5 place-items-center rounded-[3px] border ${draftFilters[group].length === 0 ? "border-[#0756cf] bg-[#0756cf] text-white" : "border-[#aebbd0]"}`}
              >
                {draftFilters[group].length === 0 && (
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                )}
              </span>
              <input
                type="checkbox"
                checked={draftFilters[group].length === 0}
                onChange={() =>
                  setDraftFilters((current) => ({ ...current, [group]: [] }))
                }
                className="sr-only"
              />
              All{" "}
              {title === "Date"
                ? "Dates"
                : title === "Location"
                  ? "Locations"
                  : title === "Subject Area"
                    ? "Subjects"
                    : "Types"}
            </label>
            {options.map((option) => (
              <label
                key={option}
                className="group flex cursor-pointer items-center gap-2 text-[13px] text-[#334a70]"
              >
                <span
                  className={`grid h-3.5 w-3.5 place-items-center rounded-[3px] border transition ${draftFilters[group].includes(option) ? "border-[#0756cf] bg-[#0756cf] text-white" : "border-[#aebbd0] group-hover:border-[#0756cf]"}`}
                >
                  {draftFilters[group].includes(option) && (
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={draftFilters[group].includes(option)}
                  onChange={() => toggleFilter(group, option)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-[5px] bg-[#0756cf] text-[14px] font-semibold text-white shadow-[0_7px_16px_rgba(7,86,207,0.2)] hover:bg-[#0649b2]"
      >
        <Filter className="h-4.5 w-4.5" /> Apply Filters
      </motion.button>
    </form>
  );

  return (
    <main className="overflow-hidden bg-white">
      <section
        className="relative isolate min-h-[340px]  overflow-hidden bg-[#03183f] text-white  sm:min-h-[360px]"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(3,18,49,.98) 0%,rgba(3,18,49,.91) 36%,rgba(3,18,49,.22) 72%,rgba(3,18,49,.04) 100%),url(${confBg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto flex min-h-[340px] w-full max-w-[1440px] items-center px-5 py-9 sm:min-h-[360px] sm:px-8 lg:px-16 xl:px-20">
          <div className="max-w-[650px]">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-[31px] font-[600] tracking-[-0.02em] sm:text-[38px]"
            >
              Conferences
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-3 max-w-[520px] text-[13px] leading-6 text-white/90 sm:text-[15px] sm:leading-7"
            >
              Discover and participate in leading conferences associated with
              Technical Journals. Share your research, connect with experts, and
              contribute to advancing knowledge.
            </motion.p>
           
          </div>
        </div>
      </section>

      <section ref={resultsRef} className="scroll-mt-24 py-8 sm:py-10">
        <div className="mx-auto grid w-full max-w-[1440px] gap-5 px-4 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-16 xl:px-20">
          <aside className="hidden lg:block">{filterPanel}</aside>

          <div className="min-w-0">
            <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(260px,1fr)_auto_auto] sm:items-center">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#173e7d]" />
                <input
                  value={keyword}
                  onChange={(event) => {
                    setKeyword(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search conferences by title, keyword, or location..."
                  className="h-11 w-full rounded-[8px] border border-[#dce3ed] bg-white px-4 pr-10 text-[12px] text-[#263c60] outline-none shadow-[0_3px_12px_rgba(8,33,72,.03)] focus:border-[#0756cf] focus:ring-2 focus:ring-[#0756cf]/10"
                />
              </div>
              <p className="text-[12px] font-medium text-[#405675]">
                Showing {firstResult}–{lastResult} of{" "}
                {filteredConferences.length} conferences
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="inline-flex h-10 items-center gap-2 rounded-[7px] border border-[#dce3ed] px-3 text-[12px] font-semibold text-[#17345f] lg:hidden"
                >
                  <Filter className="h-4 w-4" /> Filters
                </button>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(event) => {
                      setSortBy(event.target.value);
                      setPage(1);
                    }}
                    className="h-10 w-[145px] appearance-none rounded-[7px] border border-[#dce3ed] bg-white pl-3 pr-8 text-[12px] text-[#263c60] outline-none focus:border-[#0756cf]"
                  >
                    <option value="upcoming">Sort by: Upcoming</option>
                    <option value="newest">Sort by: Newest</option>
                    <option value="title">Sort by: Title</option>
                    <option value="location">Sort by: Location</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {pageItems.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-dashed border-[#ccd7e5] bg-[#f8fafd] py-20 text-center"
                >
                  <Search className="mx-auto h-9 w-9 text-[#9aa8ba]" />
                  <h2 className="mt-4 text-[18px] font-[600] text-[#17345f]">
                    No conferences match your search
                  </h2>
                  <button
                    onClick={clearFilters}
                    className="mt-5 rounded-md bg-[#0756cf] px-5 py-2.5 text-[13px] font-semibold text-white"
                  >
                    View all conferences
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`${page}-${sortBy}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {pageItems.map((conference, index) => {
                    const topics = list(
                      conference.topics ||
                        conference.tags ||
                        conference.keywords,
                    );
                    const code = text(
                      conference.code ||
                        conference.shortName ||
                        `CONF ${new Date().getFullYear()}`,
                    );
                    const organizer = text(
                      conference.organizer ||
                        conference.organizedBy ||
                        conference.university ||
                        "Technical Journals",
                    );
                    const url = text(
                      conference.detailsUrl ||
                        conference.url ||
                        conference.link ||
                        "#",
                    );

                    return (
                      <motion.article
                        key={conference.id || `${code}-${index}`}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                        whileHover={{
                          y: -4,
                          boxShadow: "0 14px 30px rgba(10,39,82,.10)",
                        }}
                        className="grid overflow-hidden rounded-[10px] border border-[#e1e7ef] bg-white p-4 transition-colors hover:border-[#a9c4ea] sm:grid-cols-[82px_minmax(0,1fr)] sm:gap-4 lg:grid-cols-[82px_minmax(0,1fr)_220px]"
                      >
                        <div
                          className={`grid h-[76px] w-[76px] place-items-center rounded-[8px] bg-gradient-to-br ${colorStyles[index % colorStyles.length]} text-center text-[18px] font-bold leading-5 text-white shadow-md`}
                        >
                          <span>
                            {code.split(" ")[0]}
                            <br />
                            <span className="text-[16px]">
                              {code.split(" ").slice(1).join(" ") || "2026"}
                            </span>
                          </span>
                        </div>

                        <div className="min-w-0 pt-3 sm:pt-0">
                          <span className="inline-flex rounded-[4px] bg-[#e5efff] px-2 py-1 text-[11px] font-semibold text-[#0756cf]">
                            {conferenceType(conference)}
                          </span>
                          <h2 className="mt-2 text-[15px] font-[600] leading-[1.45] text-[#071c46] sm:text-[16px]">
                            {text(
                              conference.title ||
                                "Upcoming Academic Conference",
                            )}
                          </h2>
                          <p className="mt-1 text-[12px] text-[#30486e]">
                            <strong>Organized by:</strong> {organizer}
                          </p>
                          <p className="mt-1 line-clamp-2 text-[12px] leading-4 text-[#50627d]">
                            {text(
                              conference.description ||
                                "Explore current research, exchange knowledge and connect with experts from around the world.",
                            )}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            <span className="text-[11px] font-semibold text-[#354b6b]">
                              Topics:
                            </span>
                            {(topics.length
                              ? topics
                              : [conferenceSubject(conference)]
                            )
                              .slice(0, 4)
                              .map((topic) => (
                                <span
                                  key={topic}
                                  className="rounded-full bg-[#edf2fa] px-2 py-1 text-[10px] font-medium text-[#385077]"
                                >
                                  {topic}
                                </span>
                              ))}
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col justify-between gap-4 border-t border-[#e7ebf2] pt-4 sm:col-span-2 sm:flex-row sm:items-end lg:col-span-1 lg:mt-0 lg:flex-col lg:items-stretch lg:border-l lg:border-t-0 lg:pl-7 lg:pt-1">
                          <div className="space-y-3 text-[13px] font-medium text-[#1f3761]">
                            <p className="flex items-center gap-3">
                              <CalendarDays className="h-4 w-4 text-[#2455a3]" />
                              {conferenceDate(conference)}
                            </p>
                            <p className="flex items-center gap-3">
                              <MapPin className="h-4 w-4 text-[#2455a3]" />
                              {conferenceLocation(conference)}
                            </p>
                          </div>
                          <a
                            href={url}
                            className="inline-flex h-9 w-full shrink-0 items-center justify-center rounded-[5px] border border-[#0756cf] px-4 text-[13px] font-semibold text-[#0756cf] transition hover:bg-[#0756cf] hover:text-white sm:w-[180px] lg:mt-5 lg:w-full"
                          >
                            View Details
                          </a>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {totalPages > 1 && (
              <nav
                aria-label="Conference pagination"
                className="mt-7 flex flex-wrap items-center justify-center gap-2"
              >
                <button
                  onClick={() => changePage(page - 1)}
                  disabled={page === 1}
                  className="grid h-8 w-8 place-items-center rounded border border-[#dce3ed] text-[#234a87] disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {visiblePages.map((item) =>
                  typeof item === "number" ? (
                    <button
                      key={item}
                      type="button"
                      onClick={() => changePage(item)}
                      aria-current={page === item ? "page" : undefined}
                      className={`h-8 min-w-8 rounded px-2 text-[11px] font-semibold transition ${page === item ? "bg-[#0756cf] text-white shadow-[0_4px_10px_rgba(7,86,207,.24)]" : "border border-[#dce3ed] text-[#405675] hover:border-[#0756cf] hover:text-[#0756cf]"}`}
                    >
                      {item}
                    </button>
                  ) : (
                    <span
                      key={item}
                      className="grid h-8 min-w-6 place-items-center text-[12px] text-[#60718a]"
                    >
                      …
                    </span>
                  ),
                )}
                <button
                  onClick={() => changePage(page + 1)}
                  disabled={page === totalPages}
                  className="grid h-8 w-8 place-items-center rounded border border-[#dce3ed] text-[#234a87] disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 pb-8 sm:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-[11px] bg-[linear-gradient(100deg,#031b47,#063b80)] text-white shadow-[0_10px_26px_rgba(3,24,63,.15)]"
        >
          <div className="grid min-h-[130px] items-center md:grid-cols-[190px_minmax(0,1fr)]">
            <div className="relative hidden h-full overflow-hidden md:block">
              <img
                src={conferenceCta}
                alt="Conference calendar"
                className="absolute inset-0 h-full w-full object-contain p-3"
              />
            </div>
            <div className="grid items-center gap-6 px-6 py-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-9">
              <div>
                <h2 className="text-[20px] font-[550] sm:text-[23px]">
                  Organize Your Conference with Us
                </h2>
                <p className="mt-2 max-w-[400px] text-[13px] leading-5 text-white/85 sm:text-[14px]">
                  Partner with Technical Journals to host your conference and
                  reach a global audience of researchers and professionals.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  href="/contact"
                  className="inline-flex h-11 min-w-[155px] items-center justify-center rounded-[6px] bg-white px-5 text-[13px] font-semibold text-[#0756cf] hover:bg-[#edf4ff]"
                >
                  Partner With Us
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  href="/services"
                  className="inline-flex h-11 min-w-[145px] items-center justify-center rounded-[6px] border border-white/75 px-5 text-[13px] font-semibold text-white hover:bg-white/10"
                >
                  Learn More
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFiltersOpen(false)}
            className="fixed inset-0 z-[100] bg-[#03142f]/65 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              className="h-full w-[min(90%,340px)] overflow-y-auto bg-[#f7f9fc] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-[#071c46]">Filter Conferences</h2>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white shadow"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {filterPanel}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}