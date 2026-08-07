import { ArrowRight, Info } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Icon from "../components/ui/Icon";
import reviewBg from "../assets/backgrounds/review-bg.jpg";
import { REVIEW_TYPES, REVIEW_WORKFLOW } from "../data/site";

const COLOR_MAP = {
  blue: { bg: "bg-blue-50", ring: "bg-blue-100 text-blue-700", title: "text-blue-700", chip: "text-blue-700", note: "bg-blue-100 text-blue-800" },
  green: { bg: "bg-green-50", ring: "bg-green-100 text-green-700", title: "text-green-700", chip: "text-green-700", note: "bg-green-100 text-green-800" },
  purple: { bg: "bg-purple-50", ring: "bg-purple-100 text-purple-700", title: "text-purple-700", chip: "text-purple-700", note: "bg-purple-100 text-purple-800" },
};

export default function ReviewProcess() {
  return (
    <>
      <Seo
        title="Review Process"
        description="Technical Journals follows a rigorous and transparent peer review process — single blind, double blind, and open review — to ensure quality, integrity, and credibility."
        path="/review-process"
      />
      <PageHero
        title="Review Process"
        subtitle="We follow a rigorous and transparent peer review process to ensure the quality, integrity, and credibility of every publication on our platform."
        bg={reviewBg}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <SectionHeading
          eyebrow=""
          title="Our Peer Review Approach"
          subtitle="Peer review is the cornerstone of academic publishing. It helps validate research, improve quality, and maintain the trust of the scholarly community. We offer three review models to suit the needs of different disciplines and publication types."
        />

        <h2 className="text-center font-display font-bold text-xl text-slate-900 mb-8">Types of Peer Review</h2>
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {REVIEW_TYPES.map((r) => {
            const c = COLOR_MAP[r.color];
            return (
              <div key={r.title} className={`${c.bg} rounded-xl p-6 border border-slate-100`}>
                <span className={`w-12 h-12 rounded-full ${c.ring} flex items-center justify-center mb-4`}>
                  <Icon name="UserCheck" className="w-5 h-5" />
                </span>
                <h3 className={`font-display font-bold ${c.title} mb-2`}>{r.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{r.desc}</p>
                <p className={`text-xs font-semibold ${c.chip} mb-2`}>How it works</p>
                <ul className="space-y-2 mb-4">
                  {r.steps.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-xs text-slate-600">
                      <Icon name="CheckCircle2" className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
                <div className={`${c.note} text-xs rounded-md px-3 py-2.5 flex gap-2`}>
                  <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {r.note}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100">
          <h2 className="text-center font-display font-bold text-xl text-slate-900 mb-8">Our Review Workflow</h2>
          <div className="grid sm:grid-cols-5 gap-6">
            {REVIEW_WORKFLOW.map((w, i) => (
              <div key={w.step} className="text-center flex flex-col items-center">
                <div className="flex items-center w-full mb-3">
                  <span className="w-12 h-12 mx-auto rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Icon name={w.icon} className="w-5 h-5" />
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-slate-900 mb-1">{w.step}. {w.title}</h3>
                <p className="text-xs text-slate-500">{w.desc}</p>
                {i < REVIEW_WORKFLOW.length - 1 && <ArrowRight className="w-4 h-4 text-slate-300 mt-3 hidden sm:block" />}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 mt-8 flex items-center justify-center gap-2">
            <Info className="w-4 h-4 text-blue-600" /> The entire process is managed through our secure platform to ensure confidentiality, efficiency, and timely communication.
          </p>
        </div>
      </section>
    </>
  );
}
