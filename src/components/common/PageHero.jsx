import { motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const fields = [
  "All Fields",
  "Journal Title",
  "Subject",
  "ISSN",
  "Publisher",
];

export default function PageHero({
  eyebrow,
  title = "Explore University Journals",
  subtitle = "Discover and access peer-reviewed journals hosted exclusively for universities worldwide. All journals are secure, reliable, and built for academic excellence.",
  bg,
  children,
  height = "min-h-[310px] sm:min-h-[340px]",
  showSearch = true,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState("All Fields");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();
    const params = new URLSearchParams();

    if (query) params.set("search", query);
    if (selectedField !== "All Fields") {
      params.set("field", selectedField);
    }

    navigate(`/journals${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <section
      className={`relative isolate overflow-hidden bg-[#06183d] text-white ${height}`}
      style={
        bg
          ? {
              backgroundImage: `
                linear-gradient(
                  90deg,
                  rgba(4, 20, 54, 0.98) 0%,
                  rgba(4, 20, 54, 0.92) 30%,
                  rgba(4, 20, 54, 0.48) 62%,
                  rgba(4, 20, 54, 0.1) 100%
                ),
                url(${bg})
              `,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }
          : undefined
      }
    >
      {/* Background darkness for mobile readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#06183d]/35 sm:bg-transparent"
      />

      {/* Subtle bottom glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-[#071a3e]/80 to-transparent"
      />

      <div className="mx-auto flex min-h-[inherit] w-full max-w-[1440px] items-center px-12 py-10 sm:px-15 sm:py-10 lg:px-16 xl:px-17">
        <div className="w-full max-w-[900px]">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300 sm:text-sm"
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl font-display text-[28px] font-[600] leading-tight tracking-[-0.02em] text-white sm:text-[36px] lg:text-[38px]"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.08,
                ease: "easeOut",
              }}
              className="mt-3 max-w-[500px] text-[14px] leading-6 text-slate-100 sm:text-[16px] sm:leading-7"
            >
              {subtitle}
            </motion.p>
          )}

         {showSearch && (
  <motion.form
    onSubmit={handleSubmit}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: 0.16,
      ease: "easeOut",
    }}
    className="mt-5 w-full max-w-[860px]"
  >
    <div className="flex flex-col gap-2 rounded-lg bg-white p-2 shadow-[0_12px_30px_rgba(0,0,0,0.2)] ring-1 ring-white/30 sm:flex-row sm:items-center sm:gap-0">
      {/* Search input */}
      <div className="relative min-w-0 flex-1">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
          strokeWidth={1.8}
        />

        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search journals by title, subject, or ISSN..."
          aria-label="Search journals"
          className="h-10 w-full rounded-md bg-white pl-10 pr-4 text-[13px] font-medium text-slate-800 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/30 sm:rounded-none sm:text-[14px]"
        />
      </div>

      {/* Field dropdown */}
      <div className="relative shrink-0 sm:w-[165px]">
        <select
          value={selectedField}
          onChange={(event) => setSelectedField(event.target.value)}
          aria-label="Select search field"
          className="h-10 w-full cursor-pointer appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-[13px] font-medium text-slate-600 outline-none transition hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        >
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>

        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
        />
      </div>

      {/* Search button */}
      <motion.button
        type="submit"
        whileHover={{
          y: -1,
          boxShadow: "0 6px 16px rgba(13,87,214,0.28)",
        }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#0756cf] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#064ab4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:ml-2 sm:min-w-[115px]"
      >
        <span>Search</span>
        <Search className="h-4 w-4" />
      </motion.button>
    </div>
  </motion.form>
)}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-5"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}