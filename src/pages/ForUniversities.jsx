import { Link } from "react-router-dom";
import Seo from "../components/common/Seo";
import StatBar from "../components/common/StatBar";
import SectionHeading from "../components/common/SectionHeading";
import Icon from "../components/ui/Icon";
import uniBg from "../assets/backgrounds/universities-bg.jpg";
import uniBg2 from "../assets/backgrounds/universities-bg2.jpg";
import { UNIVERSITIES, PLATFORM_FEATURES } from "../data/site";

const WHY = [
  { icon: "ShieldCheck", title: "Exclusive Platform", desc: "Built exclusively for universities with no commercial content." },
  { icon: "Globe2", title: "Global Visibility", desc: "Increase your research impact worldwide." },
  { icon: "Headphones", title: "End-to-End Support", desc: "From setup to publication, our team supports you at every step." },
  { icon: "Cpu", title: "Advanced Technology", desc: "Modern, scalable, and AI-enabled solutions for academic publishing." },
  { icon: "Lock", title: "Secure & Reliable", desc: "Enterprise-grade security with 99.9% uptime and data protection." },
];

export default function ForUniversities() {
  return (
    <>
      <Seo
        title="For Universities"
        description="A secure, scalable, feature-rich platform built exclusively for universities to host, manage, and publish high-quality journals with global visibility."
        path="/for-universities"
      />
      <section
        className="relative overflow-hidden bg-[#0a1a3f] text-white py-16 sm:py-20"
        style={{
          backgroundImage: `linear-gradient(100deg, rgba(10,26,63,0.9) 35%, rgba(10,26,63,0.35) 100%), url(${uniBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl max-w-xl">
            Empowering Universities to Publish with Impact
          </h1>
          <p className="mt-4 text-slate-200 max-w-lg text-sm sm:text-base">
            A secure, scalable, and feature-rich platform built exclusively for universities to host, manage, and publish
            high-quality journals with global visibility.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/register" className="px-6 py-3 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800">
              Host Your Journal
            </Link>
            <Link to="/contact" className="px-6 py-3 rounded-md border border-white text-white text-sm font-semibold hover:bg-white/10">
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-16">
        <StatBar />
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <SectionHeading
          title="Trusted by Leading Universities Worldwide"
          subtitle="Join a growing community of universities that trust Technical Journals for their scholarly publishing needs."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {UNIVERSITIES.map((u) => (
            <div key={u.name} className="bg-white border border-slate-200 rounded-lg p-5 text-center">
              <Icon name="Landmark" className="w-8 h-8 text-blue-800 mx-auto mb-3" />
              <h3 className="font-semibold text-sm text-slate-900">{u.name}</h3>
              <p className="text-xs text-slate-400 mb-3">{u.country}</p>
              <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{u.journals} Journals</span>
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
        <SectionHeading title="Our Platform Features" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PLATFORM_FEATURES.map((f) => (
            <div key={f.title} className="bg-white border border-slate-200 rounded-lg p-5 flex gap-4">
              <span className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Icon name={f.icon} className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-semibold text-sm text-slate-900 mb-1">{f.title}</h3>
                <p className="text-xs text-slate-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4">
        <div
          className="rounded-2xl bg-[#0a1a3f] text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            backgroundImage: `linear-gradient(100deg, rgba(10,26,63,0.92) 40%, rgba(10,26,63,0.55) 100%), url(${uniBg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl mb-2">Ready to Elevate Your University's Research?</h2>
            <p className="text-slate-300 text-sm max-w-md">Host your journal on a platform trusted by universities worldwide and make an impact.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/register" className="px-5 py-2.5 rounded-md bg-white text-blue-700 text-sm font-semibold hover:bg-blue-50">Host Your Journal</Link>
            <Link to="/contact" className="px-5 py-2.5 rounded-md border border-white text-white text-sm font-semibold hover:bg-white/10">Request a Demo</Link>
          </div>
        </div>
      </section>
    </>
  );
}
