import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Filter,
  Globe2,
  Grid3X3,
  Headphones,
  Languages,
  List,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  University,
  Workflow,
  X,
} from "lucide-react";

import journalsBg from "../assets/images/journalBg.png";
import journalCta from "../assets/images/journalCta.png";
import { JOURNALS } from "../data/site";

const PAGE_SIZE = 9;

const ALL_JOURNALS = Array.from({ length: 13 }, (_, groupIndex) =>
  JOURNALS.map((journal, journalIndex) => ({
    ...journal,
    id: groupIndex === 0 ? journal.id : `${journal.id}-${groupIndex + 1}`,
    _key: `${journal.id}-${groupIndex}-${journalIndex}`,
  })),
).flat();

const INDEXING_OPTIONS = [
  "Scopus Indexed",
  "Web of Science",
  "Google Scholar Indexed",
  "DOAJ Indexed",
  "UGC Approved",
];

const FREQUENCIES = [
  "Quarterly",
  "Bi-Monthly",
  "Monthly",
  "Semi-Annual",
  "Annual",
];

const ACCESS_TYPES = ["Open Access", "Subscription", "Hybrid"];

const LANGUAGES = ["English", "Hindi", "French", "Spanish"];

const getText = (value) => String(value ?? "").trim();

const getIndexingValues = (journal) => {
  const raw =
    journal.indexing ||
    journal.indexed ||
    journal.indexes ||
    journal.badges ||
    [];

  if (Array.isArray(raw)) {
    return raw.map((item) => getText(item).toLowerCase());
  }

  return getText(raw)
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
};

const getIndexLabel = (journal) => {
  const indexing = getIndexingValues(journal).join(" ");

  if (indexing.includes("scopus")) {
    return {
      short: "Scopus",
      full: "Scopus Indexed",
      className: "bg-[#eaf8ef] text-[#168544]",
    };
  }

  if (indexing.includes("web of science") || indexing.includes("wos")) {
    return {
      short: "WoS",
      full: "Web of Science",
      className: "bg-[#f2ebff] text-[#7040b6]",
    };
  }

  if (indexing.includes("ugc")) {
    return {
      short: "UGC",
      full: "UGC Approved",
      className: "bg-[#fff0e8] text-[#e4551e]",
    };
  }

  return {
    short: "Indexed",
    full: "Indexed Journal",
    className: "bg-[#eaf3ff] text-[#0756cf]",
  };
};

export default function Journals() {
  const catalogueRef = useRef(null);

  const [heroKeyword, setHeroKeyword] = useState("");
  const [heroField, setHeroField] = useState("All Fields");

  const [keyword, setKeyword] = useState("");
  const [subject, setSubject] = useState("All Subject Areas");
  const [category, setCategory] = useState("All Categories");
  const [frequency, setFrequency] = useState("All Frequencies");
  const [accessType, setAccessType] = useState("All Access Types");
  const [language, setLanguage] = useState("All Languages");
  const [selectedIndexing, setSelectedIndexing] = useState([]);

  const [appliedFilters, setAppliedFilters] = useState({
    keyword: "",
    subject: "All Subject Areas",
    category: "All Categories",
    frequency: "All Frequencies",
    accessType: "All Access Types",
    language: "All Languages",
    selectedIndexing: [],
  });

  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const subjects = useMemo(
    () =>
      [
        ...new Set(
          ALL_JOURNALS.map((journal) =>
            getText(journal.field || journal.subject || journal.subjectArea),
          ).filter(Boolean),
        ),
      ].sort(),
    [],
  );

  const categories = useMemo(
    () =>
      [
        ...new Set(
          ALL_JOURNALS.map((journal) =>
            getText(journal.category || journal.discipline),
          ).filter(Boolean),
        ),
      ].sort(),
    [],
  );

  const filteredJournals = useMemo(() => {
    const query = appliedFilters.keyword.trim().toLowerCase();

    const results = ALL_JOURNALS.filter((journal) => {
      const title = getText(journal.title).toLowerCase();
      const issn = getText(
        journal.issn || journal.eissn || journal.pissn,
      ).toLowerCase();
      const journalSubject = getText(
        journal.field || journal.subject || journal.subjectArea,
      );
      const journalCategory = getText(journal.category || journal.discipline);
      const journalFrequency = getText(
        journal.frequency || journal.publicationFrequency,
      );
      const journalAccess = getText(journal.accessType || journal.access);
      const journalLanguage = getText(journal.language || "English");
      const indexing = getIndexingValues(journal);

      const matchesKeyword =
        !query ||
        title.includes(query) ||
        issn.includes(query) ||
        journalSubject.toLowerCase().includes(query) ||
        journalCategory.toLowerCase().includes(query);

      const matchesSubject =
        appliedFilters.subject === "All Subject Areas" ||
        journalSubject === appliedFilters.subject;

      const matchesCategory =
        appliedFilters.category === "All Categories" ||
        journalCategory === appliedFilters.category;

      const matchesFrequency =
        appliedFilters.frequency === "All Frequencies" ||
        journalFrequency === appliedFilters.frequency;

      const matchesAccess =
        appliedFilters.accessType === "All Access Types" ||
        journalAccess === appliedFilters.accessType;

      const matchesLanguage =
        appliedFilters.language === "All Languages" ||
        journalLanguage === appliedFilters.language;

      const matchesIndexing =
        appliedFilters.selectedIndexing.length === 0 ||
        appliedFilters.selectedIndexing.every((selected) => {
          const searchValue = selected
            .replace(" Indexed", "")
            .replace(" Approved", "")
            .toLowerCase();

          return indexing.some((value) => value.includes(searchValue));
        });

      return (
        matchesKeyword &&
        matchesSubject &&
        matchesCategory &&
        matchesFrequency &&
        matchesAccess &&
        matchesLanguage &&
        matchesIndexing
      );
    });

    return [...results].sort((first, second) => {
      if (sortBy === "title-asc") {
        return getText(first.title).localeCompare(getText(second.title));
      }

      if (sortBy === "title-desc") {
        return getText(second.title).localeCompare(getText(first.title));
      }

      if (sortBy === "subject") {
        return getText(first.field || first.subject).localeCompare(
          getText(second.field || second.subject),
        );
      }

      return 0;
    });
  }, [appliedFilters, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredJournals.length / PAGE_SIZE),
  );

  const pagedJournals = filteredJournals.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const visiblePages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (page <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (page >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "...", page - 1, page, page + 1, "... ", totalPages];
  }, [page, totalPages]);

  const scrollToCatalogue = () => {
    catalogueRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleHeroSearch = (event) => {
    event.preventDefault();

    const query = heroKeyword.trim();

    setKeyword(query);
    setSubject(
      heroField === "Subject"
        ? query || "All Subject Areas"
        : "All Subject Areas",
    );

    setAppliedFilters((current) => ({
      ...current,
      keyword: query,
      subject:
        heroField === "Subject"
          ? query || "All Subject Areas"
          : "All Subject Areas",
    }));

    setPage(1);
    scrollToCatalogue();
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();

    setAppliedFilters({
      keyword,
      subject,
      category,
      frequency,
      accessType,
      language,
      selectedIndexing,
    });

    setPage(1);
    setMobileFiltersOpen(false);
  };

  const resetFilters = () => {
    setKeyword("");
    setSubject("All Subject Areas");
    setCategory("All Categories");
    setFrequency("All Frequencies");
    setAccessType("All Access Types");
    setLanguage("All Languages");
    setSelectedIndexing([]);
    setHeroKeyword("");
    setHeroField("All Fields");

    setAppliedFilters({
      keyword: "",
      subject: "All Subject Areas",
      category: "All Categories",
      frequency: "All Frequencies",
      accessType: "All Access Types",
      language: "All Languages",
      selectedIndexing: [],
    });

    setPage(1);
  };

  const toggleIndexing = (label) => {
    setSelectedIndexing((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  };

  const changePage = (nextPage) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);

    setPage(safePage);

    catalogueRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const fieldSelectClasses =
    "h-10 w-full appearance-none rounded-md border border-[#d7dfeb] bg-white px-3 pr-9 text-[12px] text-[#465a78] outline-none transition focus:border-[#0756cf] focus:ring-2 focus:ring-[#0756cf]/15";

  const filterPanel = (
    <form
      onSubmit={handleApplyFilters}
      className="rounded-[10px] border border-[#dfe5ee] bg-white p-5 shadow-[0_4px_16px_rgba(9,35,78,0.04)]"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[14px] font-[600] text-[#071c46]">
          Refine Your Search
        </h2>

        <button
          type="button"
          onClick={resetFilters}
          className="text-[11px] font-[550] text-[#0756cf] transition hover:text-[#003f9e]"
        >
          Clear All
        </button>
      </div>

      <label
        htmlFor="journal-keyword"
        className="mb-2 block text-[13px] font-semibold text-[#12284d]"
      >
        Search by Keyword
      </label>

      <div className="relative mb-5">
        <input
          id="journal-keyword"
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Enter keyword, title or ISSN..."
          className="h-10 w-full rounded-md border border-[#d7dfeb] bg-white pl-3 pr-9 text-[12px] text-[#243b5f] outline-none placeholder:text-[#74849c] focus:border-[#0756cf] focus:ring-2 focus:ring-[#0756cf]/15"
        />

        <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#718198]" />
      </div>

      <div className="mb-5">
        <label
          htmlFor="journal-subject"
          className="mb-2 block text-[13px] font-semibold text-[#12284d]"
        >
          Subject Area
        </label>

        <div className="relative">
          <select
            id="journal-subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className={fieldSelectClasses}
          >
            <option>All Subject Areas</option>
            {subjects.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="journal-category"
          className="mb-2 block text-[13px] font-semibold text-[#12284d]"
        >
          Category
        </label>

        <div className="relative">
          <select
            id="journal-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={fieldSelectClasses}
          >
            <option>All Categories</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
        </div>
      </div>

      <fieldset className="mb-5">
        <legend className="mb-3 text-[13px] font-semibold text-[#12284d]">
          Indexing
        </legend>

        <div className="space-y-2.5">
          {INDEXING_OPTIONS.map((label) => (
            <label
              key={label}
              className="group flex cursor-pointer items-center gap-2.5 text-[12px] text-[#435775]"
            >
              <span
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border transition ${
                  selectedIndexing.includes(label)
                    ? "border-[#0756cf] bg-[#0756cf] text-white"
                    : "border-[#aebaca] bg-white group-hover:border-[#0756cf]"
                }`}
              >
                {selectedIndexing.includes(label) && (
                  <Check className="h-3 w-3" strokeWidth={3} />
                )}
              </span>

              <input
                type="checkbox"
                checked={selectedIndexing.includes(label)}
                onChange={() => toggleIndexing(label)}
                className="sr-only"
              />

              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {[
        {
          id: "frequency",
          label: "Frequency",
          value: frequency,
          setValue: setFrequency,
          defaultValue: "All Frequencies",
          options: FREQUENCIES,
        },
        {
          id: "access-type",
          label: "Access Type",
          value: accessType,
          setValue: setAccessType,
          defaultValue: "All Access Types",
          options: ACCESS_TYPES,
        },
        {
          id: "language",
          label: "Language",
          value: language,
          setValue: setLanguage,
          defaultValue: "All Languages",
          options: LANGUAGES,
        },
      ].map((filter) => (
        <div key={filter.id} className="mb-5">
          <label
            htmlFor={filter.id}
            className="mb-2 block text-[13px] font-semibold text-[#12284d]"
          >
            {filter.label}
          </label>

          <div className="relative">
            <select
              id={filter.id}
              value={filter.value}
              onChange={(event) => filter.setValue(event.target.value)}
              className={fieldSelectClasses}
            >
              <option>{filter.defaultValue}</option>
              {filter.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
          </div>
        </div>
      ))}

      <motion.button
        type="submit"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#0756cf] text-[13px] font-semibold text-white shadow-[0_7px_16px_rgba(7,86,207,0.22)] transition hover:bg-[#064ab4]"
      >
        <Filter className="h-4 w-4" />
        Apply Filters
      </motion.button>

      <button
        type="button"
        onClick={resetFilters}
        className="mt-3 flex h-9 w-full items-center justify-center gap-2 text-[12px] font-semibold text-[#0756cf] transition hover:text-[#003f9e]"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Reset Filters
      </button>
    </form>
  );

  return (
    <main className="overflow-hidden bg-white">
      {/* Hero section */}
      <section
        className="relative isolate min-h-[340px] overflow-hidden bg-[#03183f] text-white sm:min-h-[360px]"
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
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 -z-10 bg-[#03183f]/35 sm:bg-transparent" />

        <div className="mx-auto flex min-h-[340px] w-full max-w-[1440px] items-center px-5 py-10 sm:min-h-[360px] sm:px-8 lg:px-16 xl:px-20">
          <div className="w-full max-w-[860px]">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-[650px] text-[28px] font-[600] leading-tight tracking-[-0.02em] sm:text-[34px] lg:text-[38px]"
            >
              Explore University Journals
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-3 max-w-[460px] text-[14px] leading-6 text-white/90 sm:text-[15px] sm:leading-7"
            >
              Discover and access peer-reviewed journals hosted exclusively for
              universities worldwide. All journals are secure, reliable, and
              built for academic excellence.
            </motion.p>

            <motion.form
              onSubmit={handleHeroSearch}
              role="search"
              initial={{ opacity: 0, y: 17 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-6 w-full max-w-[780px]"
            >
              <div className="rounded-[9px] border border-white/30 bg-white p-[5px] shadow-[0_14px_32px_rgba(0,0,0,0.24)]">
                <div className="flex min-h-[44px] items-center">
                  <div className="relative min-w-0 flex-1">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]" />

                    <input
                      type="search"
                      value={heroKeyword}
                      onChange={(event) => setHeroKeyword(event.target.value)}
                      placeholder="Search journals by title, subject, or ISSN..."
                      className="h-11 w-full bg-transparent pl-11 pr-3 text-[12px] text-[#1e293b] outline-none placeholder:text-[#64748b] sm:text-[14px]"
                    />
                  </div>

                  <div className="relative hidden h-8 w-[180px] shrink-0 border-l border-[#dce3ec] sm:block">
                    <select
                      value={heroField}
                      onChange={(event) => setHeroField(event.target.value)}
                      className="h-full w-full appearance-none bg-white pl-4 pr-9 text-[13px] text-[#526175] outline-none"
                    >
                      <option>All Fields</option>
                      <option>Journal Title</option>
                      <option>Subject</option>
                      <option>ISSN</option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{
                      backgroundColor: "#064ab4",
                      boxShadow: "0 7px 18px rgba(7,86,207,0.32)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-1.5 inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[6px] bg-[#0756cf] px-4 text-[13px] font-semibold text-white sm:min-w-[132px] sm:px-6"
                  >
                    <span className="hidden xs:inline sm:inline">Search</span>
                    <Search className="h-4 w-4" />
                  </motion.button>
                </div>

                <div className="relative border-t border-[#e5eaf0] sm:hidden">
                  <select
                    value={heroField}
                    onChange={(event) => setHeroField(event.target.value)}
                    className="h-10 w-full appearance-none bg-white px-3 pr-9 text-[12px] text-[#526175] outline-none"
                  >
                    <option>All Fields</option>
                    <option>Journal Title</option>
                    <option>Subject</option>
                    <option>ISSN</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="relative z-10 mx-auto -mt-10 w-full max-w-[1440px] px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="grid rounded-[11px] border border-[#e6ebf2] bg-white px-4 py-2 shadow-[0_8px_26px_rgba(10,35,75,0.08)] sm:grid-cols-2 lg:grid-cols-5 lg:px-6">
          {[
            {
              icon: BookOpen,
              value: "100+",
              title: "University Journals",
              text: "Across Multiple Disciplines",
              iconClass: "bg-[#0756cf]",
            },
            {
              icon: FileText,
              value: "10,000+",
              title: "Articles Published",
              text: "High Quality Research",
              iconClass: "bg-[#169447]",
            },
            {
              icon: Globe2,
              value: "50+",
              title: "Countries",
              text: "Global Reach",
              iconClass: "bg-[#f57912]",
            },
            {
              icon: University,
              value: "500+",
              title: "Universities",
              text: "Worldwide",
              iconClass: "bg-[#7041b8]",
            },
            {
              icon: ShieldCheck,
              value: "99.9%",
              title: "Uptime & Reliable",
              text: "Performance",
              iconClass: "bg-[#0756cf]",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.article
                key={stat.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 px-3 py-3 ${
                  index !== 4 ? "lg:border-r lg:border-[#dfe5ed]" : ""
                }`}
              >
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-white ${stat.iconClass}`}
                >
                  <Icon className="h-6 w-6" />
                </span>

                <div>
                  <strong className="block text-[20px] font-[600] text-[#071c46]">
                    {stat.value}
                  </strong>
                  <span className="block text-[13px] font-[550] text-[#11274d]">
                    {stat.title}
                  </span>
                  <span className="mt-0.5 block  font-medium text-[11px] text-[#60718a]">
                    {stat.text}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Catalogue */}
      <section ref={catalogueRef} className="scroll-mt-24 py-7 sm:py-10">
        <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-4 sm:px-8 lg:grid-cols-[265px_minmax(0,1fr)] lg:px-16 xl:px-20">
          <aside className="hidden lg:block">{filterPanel}</aside>

          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] text-[#405675]">
                Showing{" "}
                {filteredJournals.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}{" "}
                – {Math.min(page * PAGE_SIZE, filteredJournals.length)} of{" "}
                {filteredJournals.length} journals
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-[#d7dfeb] px-3 text-[13px] font-semibold text-[#17345f] lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>

                <label className="hidden text-[12px] font-semibold text-[#243a5d] sm:block">
                  Sort By:
                </label>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(event) => {
                      setSortBy(event.target.value);
                      setPage(1);
                    }}
                    className="h-9 w-[145px] appearance-none rounded-md border border-[#d7dfeb] bg-white pl-3 pr-8 text-[13px] text-[#435775] outline-none focus:border-[#0756cf]"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="title-asc">Title: A–Z</option>
                    <option value="title-desc">Title: Z–A</option>
                    <option value="subject">Subject</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
                </div>

                <div className="flex overflow-hidden rounded-md border border-[#d7dfeb] bg-white">
                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    aria-label="Grid view"
                    aria-pressed={view === "grid"}
                    className={`inline-flex h-9 items-center gap-1.5 px-3 text-[12px] font-semibold transition ${
                      view === "grid"
                        ? "bg-[#0756cf] text-white"
                        : "text-[#52647e] hover:bg-[#f3f7fd]"
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setView("list")}
                    aria-label="List view"
                    aria-pressed={view === "list"}
                    className={`inline-flex h-9 items-center gap-1.5 border-l border-[#d7dfeb] px-3 text-[12px] font-semibold transition ${
                      view === "list"
                        ? "bg-[#0756cf] text-white"
                        : "text-[#52647e] hover:bg-[#f3f7fd]"
                    }`}
                  >
                    <List className="h-4 w-4" />
                    <span className="hidden sm:inline">List</span>
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {pagedJournals.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-dashed border-[#ccd7e5] bg-[#f8fafd] py-20 text-center"
                >
                  <Search className="mx-auto h-10 w-10 text-[#9aa8ba]" />
                  <h2 className="mt-4 text-[14px] font-semibold text-[#17345f]">
                    No journals match your filters
                  </h2>
                  <p className="mt-1 text-[12px] text-[#687991]">
                    Try changing the keyword or filter selections.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 rounded-md bg-[#0756cf] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#064ab4]"
                  >
                    View all journals
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`${view}-${page}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={
                    view === "grid"
                      ? "grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
                      : "flex flex-col gap-4"
                  }
                >
                  {pagedJournals.map((journal, index) => {
                    const indexBadge = getIndexLabel(journal);
                    const cover =
                      journal.image || journal.cover || journal.thumbnail;
                    const title = journal.title || "University Journal";
                    const journalSubject =
                      journal.field ||
                      journal.subject ||
                      journal.subjectArea ||
                      "Multidisciplinary";
                    const issn =
                      journal.issn ||
                      journal.eissn ||
                      journal.pissn ||
                      "2454-0000";
                    const journalFrequency =
                      journal.frequency ||
                      journal.publicationFrequency ||
                      (index % 2 === 0 ? "Quarterly" : "Bi-Monthly");
                    const detailsUrl = journal.slug
                      ? `/journals/${journal.slug}`
                      : journal.detailsUrl || journal.to || "#";
                    const website =
                      journal.url || journal.website || journal.link || "#";

                    return (
                      <motion.article
                        key={journal._key}
                        layout
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: index * 0.035,
                        }}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 14px 30px rgba(10,39,82,0.12)",
                        }}
                        className={`group overflow-hidden rounded-[9px] border border-[#dfe5ed] bg-white transition-colors hover:border-[#9dbce9] ${
                          view === "list"
                            ? "flex flex-col p-3 sm:flex-row sm:items-stretch"
                            : "p-3"
                        }`}
                      >
                        <div
                          className={
                            view === "list"
                              ? "flex min-w-0 flex-1 gap-3"
                              : "flex min-w-0 gap-3"
                          }
                        >
                          <div className="h-[135px] w-[92px] shrink-0 overflow-hidden rounded-[5px] bg-gradient-to-br from-[#052353] to-[#0870c9] sm:h-[145px]">
                            {cover ? (
                              <img
                                src={cover}
                                alt=""
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_top,#1386da,#03183f_70%)]">
                                <BookOpen className="h-8 w-8 text-white/80" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1 py-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                title={indexBadge.full}
                                className={`rounded px-2 py-1 text-[10px] font-[550] ${indexBadge.className}`}
                              >
                                {indexBadge.short}
                              </span>

                              <span className="text-[10px] font-medium text-[#657792]">
                                ISSN: {issn}
                              </span>
                            </div>

                            <h2 className="mt-3 line-clamp-3 text-[14px] font-[600] leading-[1.45] text-[#071c46]">
                              {title}
                            </h2>

                            <p className="mt-2 text-[12px] font-medium text-[#3764a0]">
                              {journalSubject}
                            </p>

                            {view === "list" && (
                              <p className="mt-2 hidden max-w-2xl text-[13px] leading-5 text-[#667892] sm:line-clamp-2 sm:block">
                                {journal.description ||
                                  "Explore peer-reviewed research, current issues and publication information for this university journal."}
                              </p>
                            )}
                          </div>
                        </div>

                        <div
                          className={`${
                            view === "list"
                              ? "mt-3 min-w-[250px] border-t border-[#e7ebf1] pt-3 sm:ml-5 sm:mt-0 sm:flex sm:flex-col sm:justify-end sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0"
                              : "mt-3"
                          }`}
                        >
                          <p className="mb-3 text-[11px] font-medium text-[#405675]">
                            {journalFrequency}
                          </p>

                          <div className="grid grid-cols-2 gap-2">
                            <Link
                              to={detailsUrl}
                              className="inline-flex h-9 items-center justify-center rounded-[4px] border border-[#0756cf] px-2 text-[11px] font-semibold text-[#0756cf] transition hover:bg-[#0756cf] hover:text-white"
                            >
                              View Details
                            </Link>

                            <a
                              href={website}
                              target={website === "#" ? undefined : "_blank"}
                              rel={website === "#" ? undefined : "noreferrer"}
                              className="inline-flex h-9 items-center justify-center gap-1 rounded-[4px] border border-[#24a55b] px-2 text-[11px] font-semibold text-[#168746] transition hover:bg-[#168746] hover:text-white"
                            >
                              Visit Journal
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {filteredJournals.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center justify-between gap-4 xl:flex-row">
                <nav
                  aria-label="Journal pagination"
                  className="flex flex-wrap items-center justify-center gap-1.5"
                >
                  <button
                    type="button"
                    onClick={() => changePage(1)}
                    disabled={page === 1}
                    className="grid h-9 w-9 place-items-center rounded-md border border-[#d7dfeb] text-[#435775] transition hover:border-[#0756cf] hover:text-[#0756cf] disabled:cursor-not-allowed disabled:opacity-35"
                    aria-label="First page"
                  >
                    <ChevronFirst className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => changePage(page - 1)}
                    disabled={page === 1}
                    className="grid h-9 w-9 place-items-center rounded-md border border-[#d7dfeb] text-[#435775] transition hover:border-[#0756cf] hover:text-[#0756cf] disabled:cursor-not-allowed disabled:opacity-35"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {visiblePages.map((pageItem, index) =>
                    typeof pageItem === "number" ? (
                      <button
                        key={pageItem}
                        type="button"
                        onClick={() => changePage(pageItem)}
                        aria-current={page === pageItem ? "page" : undefined}
                        className={`h-9 min-w-9 rounded-md px-2 text-[13px] font-semibold transition ${
                          page === pageItem
                            ? "bg-[#0756cf] text-white shadow-[0_5px_12px_rgba(7,86,207,0.25)]"
                            : "border border-[#d7dfeb] text-[#435775] hover:border-[#0756cf] hover:text-[#0756cf]"
                        }`}
                      >
                        {pageItem}
                      </button>
                    ) : (
                      <span
                        key={`${pageItem}-${index}`}
                        className="grid h-9 min-w-7 place-items-center text-[#65758c]"
                      >
                        …
                      </span>
                    ),
                  )}

                  <button
                    type="button"
                    onClick={() => changePage(page + 1)}
                    disabled={page === totalPages}
                    className="grid h-9 w-9 place-items-center rounded-md border border-[#d7dfeb] text-[#435775] transition hover:border-[#0756cf] hover:text-[#0756cf] disabled:cursor-not-allowed disabled:opacity-35"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => changePage(totalPages)}
                    disabled={page === totalPages}
                    className="grid h-9 w-9 place-items-center rounded-md border border-[#d7dfeb] text-[#435775] transition hover:border-[#0756cf] hover:text-[#0756cf] disabled:cursor-not-allowed disabled:opacity-35"
                    aria-label="Last page"
                  >
                    <ChevronLast className="h-4 w-4" />
                  </button>
                </nav>

                <label className="flex items-center gap-2 text-[13px] text-[#425774]">
                  Go to page:
                  <div className="relative">
                    <select
                      value={page}
                      onChange={(event) =>
                        changePage(Number(event.target.value))
                      }
                      className="h-9 w-20 appearance-none rounded-md border border-[#d7dfeb] bg-white pl-3 pr-8 outline-none"
                    >
                      {Array.from({ length: totalPages }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filters */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#04132f]/65 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              className="h-full w-[min(90%,340px)] overflow-y-auto bg-[#f8fafd] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-[550] text-[#071c46]">Filter Journals</h2>

                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#071c46] shadow"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {filterPanel}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust features */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pb-7 sm:px-8 lg:px-16 xl:px-20">
        <div className="grid rounded-[10px] bg-[#f3f7fd] px-4 py-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              icon: ShieldCheck,
              title: "Secure & Reliable",
              text: "Enterprise-grade security & 99.9% uptime.",
            },
            {
              icon: Workflow,
              title: "End-to-End Workflow",
              text: "Streamlined submission, review & publication.",
            },
            {
              icon: Globe2,
              title: "Global Visibility",
              text: "Indexed in top databases for maximum reach.",
            },
            {
              icon: Building2,
              title: "University Focused",
              text: "Built exclusively for universities worldwide.",
            },
            {
              icon: Headphones,
              title: "24/7 Support",
              text: "Dedicated support team always here to help.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                whileHover={{ y: -4 }}
                className={`flex items-center gap-3 px-4 py-3 ${
                  index !== 4 ? "lg:border-r lg:border-[#d9e2ef]" : ""
                }`}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#dcecff] text-[#0756cf]">
                  <Icon className="h-6 w-6" />
                </span>

                <div>
                  <h3 className="text-[13px] font-[550] text-[#071c46]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-4 text-[#60718a]">
                    {item.text}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* CTA section */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pb-6 sm:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-[11px] py-2 px-4 bg-[#03183f] text-white shadow-[0_8px_24px_rgba(3,24,63,0.12)]"
        >
          <div className="grid min-h-[124px] items-center md:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[255px_minmax(0,1fr)]">
            {/* Separate left-side image */}
            <div className="relative hidden h-full min-h-[114px] overflow-hidden md:block">
              <img
                src={journalCta}
                alt="Secure university journal hosting"
                className="absolute inset-0 h-full w-full object-cover object-[42%_52%]"
              />

              {/* Blends only the image edge into the CTA */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-transparent to-[#03183f]" />
            </div>

            {/* Content and buttons */}
            <div className="grid items-center gap-6 px-5 py-7 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8 lg:px-9 lg:py-6">
              <div className="max-w-[520px]">
                <motion.h2
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 }}
                  className="text-[20px] font-[550] leading-tight tracking-[-0.02em] sm:text-[23px]"
                >
                  Ready to Host Your University Journal?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.14 }}
                  className="mt-2 max-w-[450px] text-[13px] leading-[1.65] text-white/85 sm:text-[14px]"
                >
                  Join hundreds of universities worldwide and publish research
                  with security, efficiency, and global impact.
                </motion.p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    className="inline-flex h-[46px] w-full items-center justify-center rounded-[6px] bg-white px-6 text-[12px] font-semibold text-[#0756cf] shadow-[0_5px_15px_rgba(0,0,0,0.12)] transition hover:bg-[#edf4ff] sm:w-[160px]"
                  >
                    Host Your Journal
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    className="inline-flex h-[46px] w-full items-center justify-center rounded-[6px] border border-[#19b66a] px-6 text-[12px] font-semibold text-white transition hover:border-[#24cf7a] hover:bg-[#168746] sm:w-[176px]"
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
