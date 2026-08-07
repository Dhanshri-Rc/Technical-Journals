import { Target, Eye } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import StatBar from "../components/common/StatBar";
import SectionHeading from "../components/common/SectionHeading";
import CtaBanner from "../components/common/CtaBanner";
import Icon from "../components/ui/Icon";
import aboutBg from "../assets/backgrounds/about-bg.jpg";
import { UNIVERSITIES } from "../data/site";

const WHY = [
  { icon: "ShieldCheck", title: "Exclusive Platform", desc: "Strictly for universities. No commercial content." },
  { icon: "Globe2", title: "Global Reach", desc: "Expand your research impact worldwide." },
  { icon: "Settings2", title: "End-to-End Workflow", desc: "From submission to publication, managed seamlessly." },
  { icon: "BarChart3", title: "Advanced Analytics", desc: "Real-time insights on downloads, citations, and performance." },
  { icon: "Lock", title: "Secure & Compliant", desc: "Enterprise-grade security with compliance to global standards." },
  { icon: "Headphones", title: "Dedicated Support", desc: "Expert support team committed to your success." },
];

const OFFER = [
  { icon: "FileText", title: "Journal Hosting", desc: "Reliable and scalable hosting for peer-reviewed journals with custom domains and branding." },
  { icon: "Settings2", title: "Editorial Workflow", desc: "Streamline submission, review, editing, and publication with smart workflows." },
  { icon: "BarChart3", title: "Indexing & Visibility", desc: "Get indexed in major databases and increase the visibility of your research." },
  { icon: "ShieldCheck", title: "Security & Compliance", desc: "Robust security, regular backups, and adherence to publishing standards and ethics." },
  { icon: "Users", title: "Author & Reviewer Tools", desc: "Intuitive tools for authors, reviewers, and editors to collaborate efficiently." },
  { icon: "PieChart", title: "Reports & Analytics", desc: "Track performance, downloads, citations, and other key metrics in real-time." },
];

const SDGS = [
  { num: 3, title: "Good Health and Well-being", color: "bg-green-600" },
  { num: 4, title: "Quality Education", color: "bg-red-600" },
  { num: 9, title: "Industry, Innovation and Infrastructure", color: "bg-orange-600" },
  { num: 17, title: "Partnerships for the Goals", color: "bg-blue-900" },
];

export default function About() {
  return (
    <>
      <Seo
        title="About the Journal"
        description="Learn about Technical Journals — a secure, scalable platform built exclusively for universities to host, manage, and publish peer-reviewed journals with global visibility."
        path="/about"
      />
      <PageHero
        eyebrow="About Technical Journals"
        title={<>Empowering Academic Publishing. <span className="text-blue-300">Exclusively for Universities.</span></>}
        subtitle="Technical Journals is a secure, scalable, and innovative platform built exclusively for universities to host, manage, and publish peer-reviewed journals. We provide end-to-end tools and infrastructure to enhance research visibility, streamline editorial workflows, and uphold the highest publishing standards."
        bg={aboutBg}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-16">
        <StatBar />
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 grid sm:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-xl p-7 flex gap-4">
          <span className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" />
          </span>
          <div>
            <h2 className="font-display font-bold text-lg text-green-800 mb-2">Our Mission</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To empower universities worldwide by providing a dedicated platform for academic journals that ensures secure hosting, efficient workflows, and global visibility for research.
            </p>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-7 flex gap-4">
          <span className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Eye className="w-6 h-6" />
          </span>
          <div>
            <h2 className="font-display font-bold text-lg text-blue-800 mb-2">Our Vision</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be the world's most trusted and preferred journal hosting platform for universities, driving innovation in academic publishing and advancing knowledge for a better future.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <SectionHeading title="Why Universities Trust Technical Journals" />
        <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-5">
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
      </section>

      <section className="bg-slate-50 py-16 mb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What We Offer to Universities" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFER.map((o) => (
              <div key={o.title} className="bg-white rounded-lg border border-slate-200 p-5">
                <span className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                  <Icon name={o.icon} className="w-5 h-5" />
                </span>
                <h3 className="font-semibold text-sm text-slate-900 mb-1">{o.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{o.desc}</p>
                <a href="/services" className="text-xs font-semibold text-blue-700">Learn More →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <SectionHeading title="Trusted by Leading Universities Worldwide" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {UNIVERSITIES.slice(0, 6).map((u) => (
            <div key={u.name} className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-center h-24">
              <Icon name="Landmark" className="w-6 h-6 text-blue-800 mb-1.5" />
              <p className="text-[11px] font-bold text-slate-800 leading-tight">{u.abbr}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-green-50 rounded-xl p-7 sm:p-8 grid sm:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h2 className="font-display font-bold text-lg text-green-800 mb-1.5">Our Commitment to Sustainable Development</h2>
            <p className="text-sm text-slate-600 mb-1">
              We support the United Nations Sustainable Development Goals by promoting open knowledge, ethical publishing, and research that addresses global challenges.
            </p>
            <a href="/sdg-commitment" className="text-xs font-semibold text-green-700 border border-green-600 rounded-md px-3 py-1.5 inline-block mt-3">Explore SDG Alignment →</a>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {SDGS.map((s) => (
              <div key={s.num} className={`${s.color} text-white rounded-md w-16 h-16 flex flex-col items-center justify-center text-center p-1`}>
                <span className="font-bold text-sm leading-none">{s.num}</span>
                <span className="text-[7px] leading-tight mt-0.5">{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to Elevate Your University's Research?"
        subtitle="Join hundreds of universities worldwide and host your journals on a platform built exclusively for academic excellence."
        secondary={{ label: "Request a Demo", to: "/contact" }}
      />
    </>
  );
}
