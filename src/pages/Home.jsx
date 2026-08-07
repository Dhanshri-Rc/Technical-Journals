import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, ShieldCheck, GraduationCap, Star } from "lucide-react";
import Seo from "../components/common/Seo";
import StatBar from "../components/common/StatBar";
import SectionHeading from "../components/common/SectionHeading";
import CtaBanner from "../components/common/CtaBanner";
import JournalCard from "../components/sections/JournalCard";
import Icon from "../components/ui/Icon";
import homeBg from "../assets/backgrounds/home-bg.jpg";
import { JOURNALS, SERVICES, UNIVERSITIES, TESTIMONIALS, SITE } from "../data/site";

const WHY_US = [
  { icon: "ShieldCheck", title: "Exclusive Platform", desc: "Strictly for universities. No commercial content." },
  { icon: "Globe2", title: "Global Reach", desc: "Expand your research impact worldwide." },
  { icon: "PiggyBank", title: "Cost Effective", desc: "Affordable plans built for academic needs." },
  { icon: "Headphones", title: "Expert Support", desc: "Dedicated support from publication experts." },
  { icon: "Leaf", title: "Sustainable", desc: "Aligned with SDGs for a better research future." },
];

const SOLUTIONS = [
  { icon: "Link2", title: "Institutional Repository Integration", desc: "Connect journals with your institutional repository for long-term preservation." },
  { icon: "Palette", title: "Custom Branding", desc: "Showcase your university identity with custom domains and branding." },
  { icon: "BarChart3", title: "Detailed Analytics", desc: "Track submissions, downloads, citations, and performance in real-time." },
  { icon: "Languages", title: "Multi-language Support", desc: "Reach a global audience with multilingual interface and support." },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/journals?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Seo
        title="Secure Journal Hosting for Universities"
        description="Technical Journals provides secure, reliable, and scalable journal hosting exclusively for universities. Explore 100+ peer-reviewed journals and empower your institution's research impact."
        path="/"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-5">
              <ShieldCheck className="w-3.5 h-3.5" /> Exclusive to Universities
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight text-slate-900">
              <span className="block">Secure Hosting.</span>
              <span className="block text-green-600">Seamless Publishing.</span>
              <span className="block text-purple-700">Stronger <span className="text-blue-700">Research Impact.</span></span>
            </h1>
            <p className="mt-5 text-slate-600 max-w-lg text-sm sm:text-base">
              Technical Journals provides secure, reliable, and scalable hosting exclusively for university journals. Empower your institution with a platform designed for academic excellence and global visibility.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors">
                Host Your Journal <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/journals" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-green-600 text-green-700 text-sm font-semibold hover:bg-green-50 transition-colors">
                Explore Journals <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {[
                { t: "Secure by Design", s: "Enterprise-grade security & data protection", i: "ShieldCheck" },
                { t: "100% University Focused", s: "Only for university journals worldwide", i: "GraduationCap" },
                { t: "99.9% Uptime", s: "Reliable hosting you can always count on", i: "Gauge" },
              ].map((f) => (
                <div key={f.t} className="flex flex-col gap-1.5">
                  <Icon name={f.i} className="w-5 h-5 text-blue-600" />
                  <p className="text-xs font-semibold text-slate-700 leading-tight">{f.t}</p>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img src={homeBg} alt="Secure cloud hosting infrastructure illustration for university journal publishing" className="w-full h-auto rounded-2xl" loading="eager" />
          </motion.div>
        </div>
      </section>

      {/* Stat bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-2 mb-16 relative z-10">
        <StatBar variant="dark" />
      </section>

      {/* Explore journals */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">Explore University Journals</h2>
            <p className="text-slate-500 text-sm mt-1">Discover peer-reviewed research across diverse disciplines</p>
          </div>
          <div className="flex gap-3">
            <div className="hidden md:flex items-center gap-2 border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-400 w-72">
              <Search className="w-4 h-4" /> Search journals by title, subject, or ISSN...
            </div>
            <Link to="/journals" className="px-4 py-2 rounded-md bg-blue-700 text-white text-sm font-semibold whitespace-nowrap hover:bg-blue-800">
              View All Journals
            </Link>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {JOURNALS.slice(0, 5).map((j) => (
            <JournalCard key={j.id} journal={j} />
          ))}
        </div>
      </section>

      {/* Everything you need */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Everything You Need to Publish and Manage Journals" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {SERVICES.slice(0, 5).map((s) => (
              <div key={s.title} className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow">
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                  <Icon name={s.icon} className="w-5 h-5" />
                </span>
                <h3 className="font-semibold text-sm text-slate-900 mb-1">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{s.desc}</p>
                <Link to="/services" className="text-xs font-semibold text-green-700 inline-flex items-center gap-1 hover:gap-1.5 transition-all">
                  Learn More <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why trust us */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading title="Why Universities Trust Technical Journals" />
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {WHY_US.map((w) => (
            <div key={w.title} className="text-center px-2">
              <span className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-3">
                <Icon name={w.icon} className="w-5 h-5" />
              </span>
              <h3 className="font-semibold text-sm text-slate-900 mb-1">{w.title}</h3>
              <p className="text-xs text-slate-500">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted universities */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Trusted by Leading Universities Worldwide" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {UNIVERSITIES.slice(0, 6).map((u) => (
              <div key={u.name} className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-center h-24">
                <GraduationCap className="w-6 h-6 text-blue-800 mb-1.5" />
                <p className="text-[11px] font-bold text-slate-800 leading-tight">{u.abbr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading title="Solutions Tailored for Universities" center />
        <div className="grid lg:grid-cols-2 gap-8 items-center bg-slate-50 rounded-2xl p-6 sm:p-8">
          <img
            src={new URL("../assets/backgrounds/universities-bg.jpg", import.meta.url).href}
            alt="Library shelf with books representing institutional research repository"
            className="rounded-xl w-full h-64 object-cover"
            loading="lazy"
          />
          <div className="space-y-5">
            {SOLUTIONS.map((s) => (
              <div key={s.title} className="flex gap-3">
                <span className="w-9 h-9 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Icon name={s.icon} className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-semibold text-sm text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What Our Partners Say" />
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex gap-1 text-amber-400 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                    {t.name.split(" ").map((n) => n[0]).slice(-2).join("")}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{t.name}</p>
                    <p className="text-[11px] text-slate-500">{t.org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
