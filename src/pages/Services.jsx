import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import StatBar from "../components/common/StatBar";
import SectionHeading from "../components/common/SectionHeading";
import CtaBanner from "../components/common/CtaBanner";
import Icon from "../components/ui/Icon";
import servicesBg from "../assets/backgrounds/conferences-bg.jpg";
import { SERVICES, PROCESS_STEPS, UNIVERSITIES } from "../data/site";

const WHY = [
  { icon: "Landmark", title: "Exclusive to Universities", desc: "Platform built strictly for universities. No commercial content." },
  { icon: "Globe2", title: "Global Reach", desc: "Increase your research impact worldwide." },
  { icon: "Headphones", title: "End-to-End Support", desc: "From setup to publication, our team supports you at every step." },
  { icon: "Cpu", title: "Advanced Technology", desc: "Modern, scalable, and AI-enabled solutions for academic publishing." },
  { icon: "ShieldCheck", title: "Trusted & Reliable", desc: "99.9% uptime with robust security and data protection." },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Our Services"
        description="Comprehensive publishing and research support services exclusively for universities — journal hosting, editorial workflow, indexing, security, analytics, and more."
        path="/services"
      />
      <PageHero
        title="Our Services"
        subtitle="Comprehensive publishing and research support services exclusively for universities."
        bg={servicesBg}
      >
        <p className="mt-2 text-slate-300 max-w-xl text-sm">
          Technical Journals provides secure, scalable, and innovative solutions to host, manage, and publish scholarly journals with global impact.
        </p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-16">
        <StatBar />
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <SectionHeading title="Our Core Services" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <div key={s.title} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <span className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${s.color}`}>
                <Icon name={s.icon} className="w-5 h-5" />
              </span>
              <h3 className="font-semibold text-sm text-slate-900 mb-1.5">{s.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{s.desc}</p>
              <a href="/contact" className="text-xs font-semibold text-blue-700">Learn More →</a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 mb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Why Universities Choose Technical Journals" />
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {WHY.map((w) => (
              <div key={w.title} className="text-center">
                <span className="w-11 h-11 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-3">
                  <Icon name={w.icon} className="w-5 h-5" />
                </span>
                <h3 className="font-semibold text-xs text-slate-900 mb-1">{w.title}</h3>
                <p className="text-[11px] text-slate-500">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <SectionHeading title="Our Service Process" />
        <div className="grid sm:grid-cols-5 gap-6 relative">
          {PROCESS_STEPS.map((p, i) => (
            <div key={p.step} className="text-center relative">
              {i < PROCESS_STEPS.length - 1 && (
                <span className="hidden sm:block absolute top-7 left-[60%] w-full border-t border-dashed border-slate-300" />
              )}
              <span className="relative z-10 w-14 h-14 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-3">
                <Icon name={p.icon} className="w-6 h-6" />
              </span>
              <p className="text-xs font-bold text-orange-500 mb-1">{p.step}</p>
              <h3 className="font-semibold text-sm text-slate-900 mb-1">{p.title}</h3>
              <p className="text-[11px] text-slate-500 px-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <SectionHeading title="Trusted by Leading Universities Worldwide" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {UNIVERSITIES.map((u) => (
            <div key={u.name} className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-center h-24">
              <Icon name="Landmark" className="w-6 h-6 text-blue-800 mb-1.5" />
              <p className="text-[11px] font-bold text-slate-800 leading-tight">{u.abbr}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner icon="FileText" />
    </>
  );
}
