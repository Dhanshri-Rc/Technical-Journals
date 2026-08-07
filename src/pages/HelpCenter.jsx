import { Link } from "react-router-dom";
import { BookOpen, Send, Users, Settings, HelpCircle, ArrowRight } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import networkBg from "../assets/backgrounds/network-bg.jpg";

const TOPICS = [
  { icon: BookOpen, title: "Journals", desc: "Browsing, subscribing, and finding the right journal for your research.", to: "/journals" },
  { icon: Send, title: "Submissions", desc: "How to submit, track, and manage your manuscript.", to: "/submit-manuscript" },
  { icon: Users, title: "Peer Review", desc: "Understanding review types and becoming a reviewer.", to: "/review-process" },
  { icon: Settings, title: "Account & Billing", desc: "Managing your account, plans, and payments.", to: "/pricing" },
];

export default function HelpCenter() {
  return (
    <>
      <Seo title="Help Center" description="Find help articles, guides, and support resources for using the Technical Journals platform." path="/help-center" />
      <PageHero title="Help Center" subtitle="Find guides and answers to help you get the most out of Technical Journals." bg={networkBg} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {TOPICS.map((t) => (
            <Link key={t.title} to={t.to} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow group">
              <span className="w-11 h-11 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <t.icon className="w-5 h-5" />
              </span>
              <h3 className="font-semibold text-sm text-slate-900 mb-1 group-hover:text-blue-700">{t.title}</h3>
              <p className="text-xs text-slate-500 mb-3">{t.desc}</p>
              <span className="text-xs font-semibold text-blue-700 inline-flex items-center gap-1">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>

        <div className="bg-slate-50 rounded-xl p-8 text-center border border-slate-200">
          <HelpCircle className="w-10 h-10 text-blue-700 mx-auto mb-3" />
          <h2 className="font-display font-bold text-lg text-slate-900 mb-2">Still need help?</h2>
          <p className="text-sm text-slate-500 mb-5 max-w-md mx-auto">Browse our full FAQ library or reach out directly to our support team.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/faq" className="px-5 py-2.5 rounded-md border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-white">View FAQs</Link>
            <Link to="/contact" className="px-5 py-2.5 rounded-md bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800">Contact Support</Link>
          </div>
        </div>
      </section>
    </>
  );
}
