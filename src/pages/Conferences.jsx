import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import ConferenceCard from "../components/sections/ConferenceCard";
import CtaBanner from "../components/common/CtaBanner";
import confBg from "../assets/backgrounds/conferences-bg.jpg";
import { CONFERENCES } from "../data/site";

export default function Conferences() {
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(
    () =>
      CONFERENCES.filter((c) =>
        keyword.trim() ? (c.title + c.code + c.location).toLowerCase().includes(keyword.toLowerCase()) : true
      ),
    [keyword]
  );

  return (
    <>
      <Seo
        title="Conferences"
        description="Discover and participate in leading academic conferences associated with Technical Journals. Share your research, connect with experts, and contribute to advancing knowledge."
        path="/conferences"
      />
      <PageHero
        title="Conferences"
        subtitle="Discover and participate in leading conferences associated with Technical Journals. Share your research, connect with experts, and contribute to advancing knowledge."
        bg={confBg}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search conferences by title, keyword, or location..."
              className="w-full pl-9 pr-3 py-3 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-600 outline-none"
            />
          </div>
          <p className="text-sm text-slate-500 self-center whitespace-nowrap">Showing 1 – {filtered.length} of {filtered.length} conferences</p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400 border border-dashed border-slate-200 rounded-xl">
            No conferences match "{keyword}".
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {filtered.map((c) => (
              <ConferenceCard key={c.id} conf={c} />
            ))}
          </div>
        )}
      </section>

      <CtaBanner
        icon="CalendarDays"
        title="Organize Your Conference with Us"
        subtitle="Partner with Technical Journals to host your conference and reach a global audience of researchers and professionals."
        primary={{ label: "Partner With Us", to: "/contact" }}
        secondary={{ label: "Learn More", to: "/services" }}
      />
    </>
  );
}
