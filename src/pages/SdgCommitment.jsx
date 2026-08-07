import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import networkBg from "../assets/backgrounds/network-bg.jpg";

const SDGS = [
  { num: 3, title: "Good Health and Well-being", color: "bg-green-600", desc: "Supporting research that advances global health outcomes and medical knowledge." },
  { num: 4, title: "Quality Education", color: "bg-red-600", desc: "Broadening access to academic knowledge and educational resources worldwide." },
  { num: 9, title: "Industry, Innovation and Infrastructure", color: "bg-orange-600", desc: "Enabling scalable, resilient digital infrastructure for scholarly publishing." },
  { num: 17, title: "Partnerships for the Goals", color: "bg-blue-900", desc: "Building global partnerships between universities to advance shared research goals." },
];

export default function SdgCommitment() {
  return (
    <>
      <Seo title="Our Commitment to Sustainable Development" description="Learn how Technical Journals supports the United Nations Sustainable Development Goals through open knowledge and ethical academic publishing." path="/sdg-commitment" />
      <PageHero title="Sustainable Development Commitment" subtitle="We support the United Nations Sustainable Development Goals by promoting open knowledge, ethical publishing, and research that addresses global challenges." bg={networkBg} />

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 gap-6">
          {SDGS.map((s) => (
            <div key={s.num} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-5">
              <span className={`${s.color} text-white rounded-lg w-14 h-14 flex items-center justify-center font-display font-bold text-xl shrink-0`}>
                {s.num}
              </span>
              <div>
                <h2 className="font-semibold text-sm text-slate-900 mb-1">{s.title}</h2>
                <p className="text-xs text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
