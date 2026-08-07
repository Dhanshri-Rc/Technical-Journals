import { useParams, Link } from "react-router-dom";
import { CalendarDays, MapPin, Building2, CheckCircle2 } from "lucide-react";
import Seo from "../components/common/Seo";
import Breadcrumb from "../components/common/Breadcrumb";
import CtaBanner from "../components/common/CtaBanner";
import NotFound from "./NotFound";
import { CONFERENCES } from "../data/site";

export default function ConferenceDetail() {
  const { id } = useParams();
  const conf = CONFERENCES.find((c) => c.id === id);
  if (!conf) return <NotFound />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: conf.title,
    startDate: conf.date,
    location: { "@type": "Place", name: conf.location },
    organizer: { "@type": "Organization", name: conf.org },
  };

  return (
    <>
      <Seo
        title={conf.title}
        description={`${conf.title}, organized by ${conf.org}, taking place ${conf.date} in ${conf.location}. ${conf.desc}`}
        path={`/conferences/${id}`}
        jsonLd={jsonLd}
      />
      <section className={`${conf.color} text-white py-14`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5"><Breadcrumb items={[{ label: "Conferences", to: "/conferences" }, { label: conf.code }]} /></div>
          <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded">{conf.type}</span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl max-w-2xl mt-3">{conf.title}</h1>
          <div className="flex flex-wrap gap-5 mt-4 text-sm text-white/85">
            <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {conf.date}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {conf.location}</span>
            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {conf.org}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-[1fr_320px] gap-10">
        <div>
          <h2 className="font-display font-bold text-xl text-slate-900 mb-3">About the Conference</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">{conf.desc} The conference brings together researchers, academics, and industry professionals from around the world to present original research, exchange ideas, and build collaborative partnerships that push the boundaries of the field forward.</p>

          <h3 className="font-semibold text-slate-900 mb-3">Topics Covered</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {conf.topics.map((t) => (
              <span key={t} className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full">{t}</span>
            ))}
          </div>

          <h3 className="font-semibold text-slate-900 mb-3">What to Expect</h3>
          <ul className="space-y-2.5 mb-8">
            {[
              "Keynote sessions from leading researchers in the field",
              "Peer-reviewed paper presentations and poster sessions",
              "Networking opportunities with global academic peers",
              "Published conference proceedings with DOI assignment",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> {f}
              </li>
            ))}
          </ul>

          <Link to="/submit-manuscript" className="px-5 py-2.5 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 inline-block">
            Submit Your Paper
          </Link>
        </div>

        <aside className="space-y-5">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-sm text-slate-900 mb-4">Conference Details</h3>
            <dl className="space-y-3 text-sm">
              {[["Organizer", conf.org], ["Dates", conf.date], ["Location", conf.location], ["Type", conf.type]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-slate-200 pb-2 last:border-0">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-medium text-slate-800 text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>

      <CtaBanner />
    </>
  );
}
