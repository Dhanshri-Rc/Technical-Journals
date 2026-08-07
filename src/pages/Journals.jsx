import { useState, useMemo } from "react";
import { Search, Grid3x3, List, ChevronLeft, ChevronRight } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import StatBar from "../components/common/StatBar";
import JournalCard from "../components/sections/JournalCard";
import CtaBanner from "../components/common/CtaBanner";
import journalsBg from "../assets/images/journalBg.png";
import { JOURNALS } from "../data/site";

const SUBJECTS = [...new Set(JOURNALS.map((j) => j.field))];
const PAGE_SIZE = 9;
// Repeat the 10 sample journals to simulate a larger, realistic catalog (126 total, as referenced in the design).
const ALL_JOURNALS = Array.from({ length: 13 }, (_, page) =>
  JOURNALS.map((j, i) => ({ ...j, id: `${j.id}${page ? "-" + (page + 1) : ""}`, _key: `${j.id}-${page}-${i}` }))
).flat();

export default function Journals() {
  const [keyword, setKeyword] = useState("");
  const [subject, setSubject] = useState("All Subject Areas");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return ALL_JOURNALS.filter((j) => {
      const matchesKeyword = keyword.trim()
        ? j.title.toLowerCase().includes(keyword.toLowerCase()) || j.issn.includes(keyword)
        : true;
      const matchesSubject = subject === "All Subject Areas" ? true : j.field === subject;
      return matchesKeyword && matchesSubject;
    });
  }, [keyword, subject]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function applyFilters(e) {
    e.preventDefault();
    setPage(1);
  }

  return (
    <>
      <Seo
        title="Journals"
        description="Search and discover peer-reviewed journals hosted exclusively for universities worldwide. Filter by subject, indexing, frequency, and access type."
        path="/journals"
      />
      <PageHero
        eyebrow=""
        title="Explore University Journals"
        subtitle="Search and discover peer-reviewed journals hosted exclusively for universities worldwide. All journals are managed with secure hosting, editorial excellence, and global visibility."
        bg={journalsBg}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-10">
        <StatBar />
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 grid lg:grid-cols-[280px_1fr] gap-8">
        <aside>
          <form onSubmit={applyFilters} className="bg-white border border-slate-200 rounded-xl p-5 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm text-slate-900">Search Journals</h2>
              <button type="button" onClick={() => { setKeyword(""); setSubject("All Subject Areas"); setPage(1); }} className="text-xs text-blue-700 font-medium">
                Clear All
              </button>
            </div>
            <label htmlFor="kw" className="block text-xs font-medium text-slate-600 mb-1.5">Search by title, keyword, or ISSN</label>
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="kw"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter keyword, title, or ISSN..."
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-600 outline-none"
              />
            </div>
            <label htmlFor="subj" className="block text-xs font-medium text-slate-600 mb-1.5">Subject Area</label>
            <select
              id="subj"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full mb-5 px-3 py-2.5 text-sm border border-slate-300 rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option>All Subject Areas</option>
              {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
            </select>

            <fieldset className="mb-5">
              <legend className="text-xs font-medium text-slate-600 mb-2">Indexing</legend>
              {["Scopus Indexed", "Web of Science", "Google Scholar Indexed", "DOAJ Indexed", "UGC Approved"].map((label) => (
                <label key={label} className="flex items-center gap-2 text-xs text-slate-600 mb-2">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-700 focus:ring-blue-500" />
                  {label}
                </label>
              ))}
            </fieldset>

            <button type="submit" className="w-full py-2.5 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 flex items-center justify-center gap-2">
              <Search className="w-4 h-4" /> Apply Filters
            </button>
          </form>
        </aside>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <p className="text-sm text-slate-500">
              Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} – {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} journals
            </p>
            <div className="flex items-center gap-3">
              <div role="group" aria-label="View mode" className="flex border border-slate-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  aria-pressed={view === "grid"}
                  className={`p-2 ${view === "grid" ? "bg-blue-700 text-white" : "text-slate-500"}`}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  aria-pressed={view === "list"}
                  className={`p-2 ${view === "list" ? "bg-blue-700 text-white" : "text-slate-500"}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {paged.length === 0 ? (
            <div className="text-center py-20 text-slate-400 border border-dashed border-slate-200 rounded-xl">
              <p className="font-medium">No journals match your filters.</p>
              <p className="text-sm mt-1">Try adjusting your search keyword or subject area.</p>
            </div>
          ) : (
            <div className={view === "grid" ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-5" : "flex flex-col gap-4"}>
              {paged.map((j) => (
                <JournalCard key={j._key} journal={j} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-md border border-slate-300 disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }).slice(0, 6).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  aria-current={page === i + 1 ? "page" : undefined}
                  className={`w-9 h-9 rounded-md text-sm font-medium ${page === i + 1 ? "bg-blue-700 text-white" : "border border-slate-300 text-slate-600"}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-md border border-slate-300 disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          )}
        </div>
      </section>

      <CtaBanner
        icon="BookOpen"
        title="Can't Find the Right Journal?"
        subtitle="Our team can help you find the perfect journal for your research and publication needs."
        primary={{ label: "Contact Our Team", to: "/contact" }}
        secondary={{ label: "View All Journals", to: "/journals" }}
      />
    </>
  );
}
