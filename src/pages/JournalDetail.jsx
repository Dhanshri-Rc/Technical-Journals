import { useParams, Link } from "react-router-dom";
import { CheckCircle2, ExternalLink, Download } from "lucide-react";
import Seo from "../components/common/Seo";
import Breadcrumb from "../components/common/Breadcrumb";
import Icon from "../components/ui/Icon";
import CtaBanner from "../components/common/CtaBanner";
import NotFound from "./NotFound";
import { JOURNALS, SITE } from "../data/site";

export default function JournalDetail() {
  const { id } = useParams();
  const baseId = id?.split("-").slice(0, -1).join("-");
  const journal = JOURNALS.find((j) => j.id === id) || JOURNALS.find((j) => j.id === baseId);

  if (!journal) return <NotFound />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Periodical",
    name: journal.title,
    issn: journal.issn,
    about: journal.field,
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <>
      <Seo
        title={journal.title}
        description={`${journal.title} (ISSN: ${journal.issn}) is a ${journal.freq.toLowerCase()} peer-reviewed journal in ${journal.field}, indexed in ${journal.index}. Hosted on Technical Journals.`}
        path={`/journals/${id}`}
        jsonLd={jsonLd}
      />

      <section className={`bg-gradient-to-br ${journal.color} text-white py-14`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5"><Breadcrumb items={[{ label: "Journals", to: "/journals" }, { label: journal.title }]} /></div>
          <div className="flex items-start gap-4 flex-col sm:flex-row sm:items-center">
            <span className="w-16 h-16 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Icon name={journal.icon} className="w-8 h-8 text-white" />
            </span>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded">{journal.index} Indexed</span>
                <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded">ISSN: {journal.issn}</span>
                <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded">{journal.freq}</span>
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl max-w-2xl">{journal.title}</h1>
              <p className="text-white/80 text-sm mt-1">{journal.field}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-[1fr_320px] gap-10">
        <div>
          <h2 className="font-display font-bold text-xl text-slate-900 mb-3">About this Journal</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {journal.title} is a {journal.freq.toLowerCase()} peer-reviewed journal dedicated to publishing high-quality, original
            research in {journal.field}. Hosted exclusively for universities on the Technical Journals platform, the journal
            follows a rigorous editorial workflow, transparent peer review, and adheres to international publication ethics
            standards to ensure the integrity and impact of every article it publishes.
          </p>

          <h3 className="font-semibold text-slate-900 mb-2">Aims and Scope</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            The journal welcomes original research articles, review papers, and case studies that advance theoretical and
            applied knowledge in {journal.field}. Submissions are evaluated for originality, methodological rigor, and
            relevance to the global research community.
          </p>

          <h3 className="font-semibold text-slate-900 mb-3">Why Publish With Us</h3>
          <ul className="space-y-2.5 mb-8">
            {[
              `Indexed in ${journal.index} for maximum discoverability`,
              "Fast, transparent, and rigorous peer review",
              "Global readership across 50+ countries",
              "Dedicated editorial and author support team",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> {f}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3" id="visit">
            <Link to="/submit-manuscript" className="px-5 py-2.5 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800">
              Submit Manuscript
            </Link>
            <Link to="/author-guidelines" className="px-5 py-2.5 rounded-md border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 inline-flex items-center gap-1.5">
              <Download className="w-4 h-4" /> Author Guidelines
            </Link>
            <Link
              to="/contact"
              title="Individual journal microsites are set up per-university after onboarding; contact us to get yours live"
              className="px-5 py-2.5 rounded-md border border-green-600 text-green-700 text-sm font-semibold hover:bg-green-50 inline-flex items-center gap-1.5"
            >
              Visit Journal Site <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-sm text-slate-900 mb-4">Journal Facts</h3>
            <dl className="space-y-3 text-sm">
              {[
                ["ISSN", journal.issn],
                ["Subject Area", journal.field],
                ["Indexing", journal.index],
                ["Frequency", journal.freq],
                ["Review Type", "Double Blind"],
                ["Access Type", "Open Access"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-slate-200 pb-2 last:border-0">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-medium text-slate-800 text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h3 className="font-semibold text-sm text-blue-800 mb-2">Need Help?</h3>
            <p className="text-xs text-slate-600 mb-3">Our editorial support team can help with submissions and formatting queries.</p>
            <Link to="/contact" className="text-xs font-semibold text-blue-700">Contact Support →</Link>
          </div>
        </aside>
      </section>

      <CtaBanner />
    </>
  );
}
