import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import networkBg from "../assets/backgrounds/network-bg.jpg";
import { SITE } from "../data/site";

const SECTIONS = [
  { id: "introduction", title: "1. Introduction", body: `${SITE.name} ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.` },
  { id: "information-we-collect", title: "2. Information We Collect", list: [
    "Personal Information: Name, email address, affiliation, and contact details provided during registration or submissions.",
    "Account Information: Username, password, profile information, and preferences.",
    "Usage Information: IP address, browser type, pages visited, time spent, and referring URLs.",
    "Submission Information: Manuscripts, reviews, and other content you submit to our platform.",
  ]},
  { id: "how-we-use", title: "3. How We Use Your Information", list: [
    "Provide, operate, and maintain our services.",
    "Process submissions and peer review.",
    "Communicate with you about your account, submissions, or updates.",
    "Improve our website, services, and user experience.",
    "Comply with legal obligations.",
  ]},
  { id: "how-we-share", title: "4. How We Share Your Information", body: "We do not sell or rent your personal information. We may share your information with:", list: [
    "Trusted service providers who assist us in operating our platform.",
    "Academic institutions or publishers, where necessary for journal or conference management.",
    "Legal authorities if required by law or to protect our rights and users.",
  ]},
  { id: "data-security", title: "5. Data Security", body: "We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure." },
  { id: "rights", title: "6. Your Rights and Choices", body: "You have the right to access, update, or delete your personal information. You may also opt out of certain communications. To exercise your rights, please contact us." },
  { id: "cookies", title: "7. Cookies and Tracking Technologies", body: "We use cookies and similar technologies to enhance your experience, analyze usage, and personalize content. You can manage your cookie preferences in your browser settings." },
  { id: "third-party", title: "8. Third-Party Links", body: "Our platform may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. Please review their privacy policies." },
  { id: "data-retention", title: "9. Data Retention", body: "We retain your information for as long as necessary to fulfill the purposes outlined in this policy or as required by law." },
  { id: "childrens-privacy", title: "10. Children's Privacy", body: "Our services are not intended for children under 13. We do not knowingly collect personal information from children." },
  { id: "international-transfers", title: "11. International Data Transfers", body: "Your information may be transferred to and stored in countries outside your own. We ensure appropriate safeguards are in place to protect your data." },
  { id: "changes", title: "12. Changes to This Policy", body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically." },
  { id: "contact-us", title: "13. Contact Us", body: "If you have any questions or concerns about this Privacy Policy, please contact us:", contact: true },
];

export default function PrivacyPolicy() {
  const [active, setActive] = useState(SECTIONS[0].id);

  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Read the Technical Journals Privacy Policy to learn how we collect, use, protect, and disclose your information."
        path="/privacy-policy"
      />
      <PageHero
        title="Privacy Policy"
        subtitle="Your privacy is important to us. This Privacy Policy explains how Technical Journals collects, uses, protects, and discloses your information."
        bg={networkBg}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-[260px_1fr] gap-10">
        <aside className="space-y-5 lg:sticky lg:top-24 self-start">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h2 className="font-semibold text-sm text-slate-900 mb-3">On This Page</h2>
            <nav className="flex flex-col gap-1">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActive(s.id)}
                  className={`text-xs px-2.5 py-1.5 rounded-md ${active === s.id ? "bg-blue-100 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <ShieldCheck className="w-6 h-6 text-blue-700 mb-2" />
            <h3 className="font-semibold text-sm text-slate-900 mb-1">Questions?</h3>
            <p className="text-xs text-slate-500 mb-3">If you have any questions about this Privacy Policy, please contact us.</p>
            <Link to="/contact" className="text-xs font-semibold text-blue-700 border border-blue-600 rounded-md px-3 py-1.5 inline-block">Contact Us →</Link>
          </div>
        </aside>

        <div>
          <p className="text-xs text-slate-400 mb-8 text-right">Last updated: 15 May, 2024</p>
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id} className="mb-8 scroll-mt-24">
              <h2 className="font-display font-bold text-lg text-slate-900 mb-2">{s.title}</h2>
              {s.body && <p className="text-sm text-slate-600 leading-relaxed mb-2">{s.body}</p>}
              {s.list && (
                <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
              {s.contact && (
                <div className="flex flex-col sm:flex-row gap-4 mt-3 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-blue-700" /> {SITE.supportEmail}</span>
                  <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-blue-700" /> {SITE.phone}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-700" /> {SITE.address}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
