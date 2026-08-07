import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Headphones } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import Accordion from "../components/ui/Accordion";
import Icon from "../components/ui/Icon";
import networkBg from "../assets/backgrounds/network-bg.jpg";
import { FAQ_CATEGORIES, FAQS } from "../data/site";

export default function Faq() {
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return FAQS.filter((f) => {
      const matchesCat = cat === "all" ? true : f.cat === cat;
      const matchesQuery = query.trim() ? (f.q + f.a).toLowerCase().includes(query.toLowerCase()) : true;
      return matchesCat && matchesQuery;
    });
  }, [cat, query]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.slice(0, 15).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Find answers to the most common questions about Technical Journals — submissions, peer review, publication, services, and hosting for universities."
        path="/faq"
        jsonLd={jsonLd}
      />
      <PageHero title="FAQ" subtitle="Find answers to the most common questions about Technical Journals and our platform." bg={networkBg} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-[280px_1fr] gap-10">
        <aside className="space-y-5 lg:sticky lg:top-24 self-start">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="font-semibold text-sm text-slate-900 mb-3">Categories</h2>
            <nav className="flex flex-col gap-1">
              {FAQ_CATEGORIES.map((c) => {
                const count = c.id === "all" ? FAQS.length : FAQS.filter((f) => f.cat === c.id).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCat(c.id)}
                    className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md text-left ${
                      cat === c.id ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon name={c.icon} className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{c.label}</span>
                    <span className="text-xs text-slate-400">{count}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
            <Headphones className="w-8 h-8 text-blue-700 mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-slate-900 mb-1">Still have questions?</h3>
            <p className="text-xs text-slate-500 mb-3">Our support team is here to help you with anything you need.</p>
            <Link to="/contact" className="text-xs font-semibold text-blue-700 border border-blue-600 rounded-md px-3 py-1.5 inline-block">Contact Support →</Link>
          </div>
        </aside>

        <div>
          <div className="relative mb-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for questions..."
              className="w-full pl-9 pr-3 py-3 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-600 outline-none"
            />
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400 border border-dashed border-slate-200 rounded-xl">
              No questions found for "{query}".
            </div>
          ) : (
            <Accordion items={filtered} defaultOpenId={filtered[0]?.id} />
          )}

          <div className="text-center mt-12 border-t border-slate-100 pt-10">
            <h3 className="font-display font-bold text-lg text-slate-900 mb-1">Can't find the answer you're looking for?</h3>
            <p className="text-sm text-slate-500 mb-5">We're here to help! Reach out to our support team and we'll get back to you as soon as possible.</p>
            <Link to="/contact" className="px-6 py-2.5 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 inline-block">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
