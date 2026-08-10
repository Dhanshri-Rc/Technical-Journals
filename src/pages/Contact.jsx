import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import contactBg from "../assets/images/contactbg.png";
import contactCta from "../assets/images/contactcta.png";
import { FAQS, SITE } from "../data/site";

const SUBJECTS = [
  "General Inquiry",
  "Journal Hosting",
  "Conference Partnership",
  "Technical Support",
  "Billing & Pricing",
  "Other",
];

const FALLBACK_FAQS = [
  { id: 1, q: "How can I submit my journal to your platform?", a: "Contact our journal hosting team through this form. We will review your requirements and guide you through onboarding, setup, and launch." },
  { id: 2, q: "How can I host a conference with you?", a: "Select Conference Partnership in the form and share your event details. Our team will contact you with available publishing and hosting options." },
  { id: 3, q: "What is the typical response time?", a: "Our support team generally replies within one business day, Monday through Friday." },
  { id: 4, q: "What support do you provide for universities?", a: "We provide journal setup, editorial workflow assistance, hosting, publishing support, technical maintenance, and visibility guidance." },
  { id: 5, q: "Do you offer training for editorial teams?", a: "Yes. We provide platform onboarding and workflow training for editors, reviewers, and university publishing teams." },
  { id: 6, q: "Can you help with journal indexing?", a: "We can help your team understand indexing requirements and improve journal readiness, although acceptance is determined by each indexing database." },
];

const fieldClass = (hasError) =>
  `h-11 w-full rounded-[5px] border bg-white px-3 text-[11px] text-[#132849] outline-none transition-all duration-200 placeholder:text-[#8b99ad] ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-[#d7dfeb] hover:border-[#a9b9ce] focus:border-[#0756cf] focus:ring-2 focus:ring-[#0756cf]/10"
  }`;

function FacebookMark({ className = "" }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M13.6 22v-9h3l.45-3.5H13.6V7.27c0-1.02.28-1.7 1.75-1.7h1.87V2.44a25 25 0 0 0-2.73-.14c-2.7 0-4.55 1.65-4.55 4.68V9.5H6.88V13h3.06v9h3.66Z" /></svg>;
}

function LinkedinMark({ className = "" }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M6.5 8.25H3V21h3.5V8.25ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.7c0-3.84-2.05-5.63-4.78-5.63a4.13 4.13 0 0 0-3.73 2.05V8.25H9V21h3.5v-6.31c0-1.66.31-3.27 2.37-3.27 2.03 0 2.05 1.9 2.05 3.38V21H21v-7.3Z" /></svg>;
}

function TwitterMark({ className = "" }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M21.2 7.1c.02.2.02.4.02.6 0 6.1-4.64 13.13-13.13 13.13A13 13 0 0 1 1 18.76c.37.04.72.06 1.1.06a9.23 9.23 0 0 0 5.73-1.97 4.62 4.62 0 0 1-4.31-3.2c.28.04.56.07.86.07.42 0 .84-.06 1.23-.16a4.61 4.61 0 0 1-3.7-4.52v-.06c.62.34 1.34.55 2.1.58A4.6 4.6 0 0 1 2.58 3.4a13.1 13.1 0 0 0 9.5 4.82 5.18 5.18 0 0 1-.12-1.05 4.61 4.61 0 0 1 7.98-3.15 9.1 9.1 0 0 0 2.92-1.11 4.6 4.6 0 0 1-2.02 2.54 9.2 9.2 0 0 0 2.64-.72A9.9 9.9 0 0 1 21.2 7.1Z" /></svg>;
}

function YoutubeMark({ className = "" }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.55 3.57 12 3.57 12 3.57s-7.55 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.85.51 9.4.51 9.4.51s7.55 0 9.4-.5a3 3 0 0 0 2.1-2.13A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.55 15.6V8.4L15.82 12l-6.27 3.6Z" /></svg>;
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = `Contact Us | ${SITE?.name || "Technical Journals"}`;
  }, []);

  const contactFaqs = useMemo(() => {
    const selected = (FAQS || []).filter((faq) => [11, 15, 6, 12, 17, 1].includes(faq.id));
    return (selected.length >= 6 ? selected.slice(0, 6) : FALLBACK_FAQS);
  }, []);

  const email = SITE?.email || "info@technicaljournals.org";
  const supportEmail = SITE?.supportEmail || "support@technicaljournals.org";
  const phone = SITE?.phone || "+44 20 7946 0958";
  const address = SITE?.address || "71–75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom";

  const details = [
    { icon: Mail, title: "Email Us", lines: [email, supportEmail], tone: "bg-[#eaf3ff] text-[#0865e8]" },
    { icon: Phone, title: "Call Us", lines: [phone, "Mon - Fri: 9:00 AM - 6:00 PM (GMT)"], tone: "bg-[#eaf8ee] text-[#23a54e]" },
    { icon: MapPin, title: "Visit Us", lines: [address], tone: "bg-[#f2eaff] text-[#8b3ff1]" },
    { icon: MessageCircle, title: "Live Chat", lines: ["Chat with our support team", "Mon - Fri: 9:00 AM - 6:00 PM (GMT)"], tone: "bg-[#fff0e4] text-[#f77b18]" },
  ];

  function onChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    if (sent) setSent(false);
  }

  function validateForm() {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!values.email.trim()) next.email = "Please enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Please enter a valid email address.";
    if (!values.subject) next.subject = "Please select a subject.";
    if (!values.message.trim()) next.message = "Please enter your message.";
    else if (values.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    return next;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      // Replace this Promise with your production API request when available.
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      setSent(true);
      setValues({ name: "", email: "", subject: "", message: "" });
    } finally {
      setLoading(false);
    }
  }

  const socials = [
    { Icon: FacebookMark, href: SITE?.social?.facebook || "#", label: "Facebook", hover: "hover:bg-[#1877f2] hover:border-[#1877f2]" },
    { Icon: LinkedinMark, href: SITE?.social?.linkedin || "#", label: "LinkedIn", hover: "hover:bg-[#0a66c2] hover:border-[#0a66c2]" },
    { Icon: TwitterMark, href: SITE?.social?.twitter || "#", label: "Twitter", hover: "hover:bg-[#1da1f2] hover:border-[#1da1f2]" },
    { Icon: YoutubeMark, href: SITE?.social?.youtube || "#", label: "YouTube", hover: "hover:bg-[#ff0000] hover:border-[#ff0000]" },
  ];

  return (
    <main className="overflow-hidden bg-white text-[#091f49]">
      {/* Hero */}
      <section
        className="relative min-h-[340px] bg-[#041b48] bg-cover bg-[70%_center] text-white sm:min-h-[360px] lg:bg-center"
        style={{ backgroundImage: `linear-gradient(90deg,rgba(2,18,51,.96) 0%,rgba(2,18,51,.73) 48%,rgba(2,18,51,.18) 100%),url(${contactBg})` }}
      >
        <div className="mx-auto flex min-h-[340px] w-full max-w-[1440px] items-center px-5 pb-12 pt-10 sm:min-h-[360px] sm:px-8 lg:px-16 xl:px-20">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .55 }} className="max-w-[500px]">
            <h1 className="text-[31px] font-[600] leading-tight tracking-[-.03em] sm:text-[38px]">Contact Us</h1>
            <p className="mt-4 max-w-[460px] text-[14px] leading-7 text-white/90 sm:text-[15px]">
              We’re here to help! Reach out to us for any inquiries,<br className="hidden sm:block" /> support, or collaboration opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact details */}
      <section className="relative z-10 mx-auto -mt-8 w-full max-w-[1440px] px-4 sm:px-8 lg:px-16 xl:px-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .12 }} className="grid overflow-hidden rounded-[10px] border border-[#e2e8f1] bg-white px-4 py-2 shadow-[0_8px_25px_rgba(10,35,78,.08)] sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-2 lg:py-4">
          {details.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.title} whileHover={{ y: -3 }} className={`group flex min-h-[80px] gap-3 px-3 py-3 sm:px-5 lg:py-1 ${index % 2 === 0 ? "sm:border-r sm:border-[#e2e8f0]" : ""} ${index !== 3 ? "lg:border-r lg:border-[#e2e8f0]" : "lg:border-r-0"}`}>
                <span className={`grid h-13 w-13 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 ${item.tone}`}><Icon className="h-6 w-6" /></span>
                <div className="min-w-0">
                  <h2 className="text-[14px] font-[550] text-[#0b2350]">{item.title}</h2>
                  <div className="mt-2 space-y-1">
                    {item.lines.map((line) => <p key={line} className="break-words text-[11px] leading-[1.55] text-[#42526b]">{line}</p>)}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      {/* Form and location */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 lg:px-16 lg:py-10 xl:px-20">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} className="grid overflow-hidden rounded-[10px] border border-[#e5eaf1] bg-white shadow-[0_5px_20px_rgba(14,41,78,.05)] lg:grid-cols-2">
          <div className="border-b border-[#e7ebf1] p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
            <h2 className="text-[20px] font-[550] text-[#092351]">Send Us a Message</h2>
            <p className="mt-2 text-[14px] text-[#4e607b]">Fill out the form below and we’ll get back to you as soon as possible.</p>

            <AnimatePresence>
              {sent && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-5 flex items-start gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-[11px] text-green-800">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> Your message has been sent successfully. Our team will respond shortly.
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
              {[{ name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" }, { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email address" }].map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="mb-2 block text-[13px] font-semibold text-[#172b4d]">{field.label} <span className="text-red-500">*</span></label>
                  <input id={field.name} name={field.name} type={field.type} value={values[field.name]} onChange={onChange} placeholder={field.placeholder} aria-invalid={Boolean(errors[field.name])} className={fieldClass(errors[field.name])} />
                  {errors[field.name] && <p className="mt-1.5 text-[12px] text-red-600">{errors[field.name]}</p>}
                </div>
              ))}

              <div>
                <label htmlFor="subject" className="mb-2 block text-[13px] font-semibold text-[#172b4d]">Subject <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select id="subject" name="subject" value={values.subject} onChange={onChange} aria-invalid={Boolean(errors.subject)} className={`${fieldClass(errors.subject)} appearance-none pr-10`}>
                    <option value="">Select a subject</option>
                    {SUBJECTS.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#49617f]" />
                </div>
                {errors.subject && <p className="mt-1.5 text-[12px] text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-[13px] font-semibold text-[#172b4d]">Message <span className="text-red-500">*</span></label>
                <textarea id="message" name="message" rows={6} value={values.message} onChange={onChange} placeholder="Write your message here..." aria-invalid={Boolean(errors.message)} className={`${fieldClass(errors.message)} h-[125px] resize-y py-3`} />
                {errors.message && <p className="mt-1.5 text-[12px] text-red-600">{errors.message}</p>}
              </div>

              <motion.button whileHover={{ y: -2, boxShadow: "0 8px 18px rgba(7,86,207,.25)" }} whileTap={{ scale: .98 }} type="submit" disabled={loading} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[5px] bg-[#0756cf] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#0649ad] disabled:cursor-wait disabled:opacity-70 sm:w-auto">
                <Send className="h-4 w-4" /> {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </div>

          <div className="p-5 sm:p-7 lg:p-8">
            <h2 className="text-[20px] font-[550] text-[#092351]">Our Location</h2>
            <motion.div whileHover={{ boxShadow: "0 10px 25px rgba(14,41,78,.12)" }} className="mt-5 h-[265px] overflow-hidden rounded-[7px] border border-[#d9e1ec] sm:h-[300px] lg:h-[310px]">
              <iframe title="Technical Journals office location map" className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Covent+Garden,+London&output=embed" />
            </motion.div>

            <div className="mt-6 rounded-[8px] bg-[#f8fafd] p-5 sm:p-6">
              <h3 className="text-[15px] font-[550] text-[#092351]">Connect With Us</h3>
              <p className="mt-2 max-w-[460px] text-[12px] leading-[1.55] text-[#53647d]">Follow us on our social media channels for the latest updates, news, and announcements.</p>
              <div className="mt-4 flex gap-3">
                {socials.map(({ Icon, href, label, hover }) => <motion.a key={label} whileHover={{ y: -3 }} href={href} target={href === "#" ? undefined : "_blank"} rel={href === "#" ? undefined : "noopener noreferrer"} aria-label={label} className={`grid h-10 w-10 place-items-center rounded-full border border-[#d6dfeb] bg-white text-[#0756cf] transition-all duration-300 hover:text-white hover:shadow-md ${hover}`}><Icon className="h-5 w-5" /></motion.a>)}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pb-8 sm:px-8 lg:px-16 xl:px-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[9px] bg-[#fafbfd] p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="text-[20px] font-[550] text-[#092351]">Frequently Asked Questions</h2><p className="mt-2 text-[13px] text-[#52637c]">Find quick answers to common questions.</p></div>
            <Link to="/faq" className="group inline-flex items-center text-[12px] font-semibold text-[#0756cf]">View All FAQs <span className="ml-1 transition-transform group-hover:translate-x-1">→</span></Link>
          </div>
          <div className="mt-5 grid items-start gap-x-6 gap-y-2 lg:grid-cols-2">
            {contactFaqs.map((faq, index) => {
              const key = faq.id ?? index;
              const isOpen = openFaq === key;
              return <div key={key} className="overflow-hidden rounded-[5px] border border-[#dde5ef] bg-white transition-shadow hover:shadow-[0_4px_12px_rgba(14,41,78,.07)]"><button type="button" onClick={() => setOpenFaq(isOpen ? null : key)} aria-expanded={isOpen} className="flex min-h-[38px] w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-[13px] font-[450] text-[#132b57]"><span>{faq.q}</span><ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#0756cf]" : ""}`} /></button><AnimatePresence initial={false}>{isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .25 }}><p className="border-t border-[#edf1f5] px-4 py-3 text-[12px] leading-5 text-[#586a82]">{faq.a}</p></motion.div>}</AnimatePresence></div>;
            })}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pb-7 sm:px-8 lg:px-16 xl:px-20">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[8px] bg-[#062766] text-white shadow-[0_8px_22px_rgba(4,30,80,.13)]">
          <div className="grid min-h-[116px] items-center sm:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="relative hidden h-full overflow-hidden sm:block"><img src={contactCta} alt="Contact support" className="absolute inset-0 h-full w-full object-contain p-3 opacity-90" /><div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-[#062766]" /></div>
            <div className="grid items-center gap-6 px-6 py-7 md:grid-cols-[minmax(0,1fr)_auto] lg:px-8">
              <div><h2 className="text-[18px] font-[550] sm:text-[20px]">Still Have Questions?</h2><p className="mt-2 text-[14px] leading-5 text-white/80">Our support team is ready to assist you with anything you need.</p></div>
              <motion.a whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,.12)" }} whileTap={{ scale: .98 }} href={`mailto:${supportEmail}`} className="inline-flex h-11 w-full items-center justify-center rounded-[5px] border border-white/65 px-6 text-[13px] font-semibold text-white sm:w-[150px]">Contact Support</motion.a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}