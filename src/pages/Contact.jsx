import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { FacebookIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "../components/ui/SocialIcons";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import Accordion from "../components/ui/Accordion";
import CtaBanner from "../components/common/CtaBanner";
import { Label, ErrorText, Input, Textarea, Select, SubmitButton } from "../components/forms/FormField";
import { validate, rules } from "../utils/validation";
import { submitContactForm } from "../services/mockApi";
import networkBg from "../assets/backgrounds/network-bg.jpg";
import { SITE, FAQS } from "../data/site";

const contactFaqs = FAQS.filter((f) => [11, 15, 6, 12, 17].includes(f.id));

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function onChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validate(values, {
      name: [rules.required("Please enter your full name.")],
      email: [rules.required("Please enter your email address."), rules.email()],
      subject: [rules.required("Please select a subject.")],
      message: [rules.required("Please enter your message."), rules.min(10, "Message should be at least 10 characters.")],
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    await submitContactForm(values);
    setLoading(false);
    setSent(true);
    setValues({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with the Technical Journals team for inquiries, support, or collaboration opportunities. We're here to help universities publish with impact."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Technical Journals",
        }}
      />
      <PageHero
        title="Contact Us"
        subtitle="We're here to help! Reach out to us for any inquiries, support, or collaboration opportunities."
        bg={networkBg}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-14">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Mail, title: "Email Us", lines: [SITE.email, SITE.supportEmail], color: "text-blue-600 bg-blue-100" },
            { icon: Phone, title: "Call Us", lines: [SITE.phone, "Mon - Fri: 9:00 AM - 6:00 PM (GMT)"], color: "text-green-600 bg-green-100" },
            { icon: MapPin, title: "Visit Us", lines: [SITE.address], color: "text-purple-600 bg-purple-100" },
            { icon: MessageCircle, title: "Live Chat", lines: ["Chat with our support team", "Mon - Fri: 9:00 AM - 6:00 PM (GMT)"], color: "text-orange-600 bg-orange-100" },
          ].map((c) => (
            <div key={c.title} className="flex gap-3">
              <span className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${c.color}`}>
                <c.icon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-semibold text-sm text-slate-900">{c.title}</h3>
                {c.lines.map((l) => <p key={l} className="text-xs text-slate-500">{l}</p>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 grid lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-1">Send Us a Message</h2>
          <p className="text-sm text-slate-500 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>

          {sent && (
            <div className="mb-5 flex items-start gap-2 bg-green-50 border border-green-200 text-green-800 text-sm rounded-md px-4 py-3">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              Your message has been sent successfully. Our team will respond shortly.
            </div>
          )}

          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div>
              <Label htmlFor="name" required>Full Name</Label>
              <Input id="name" name="name" value={values.name} onChange={onChange} placeholder="Enter your full name" error={errors.name} />
              <ErrorText id="name-error">{errors.name}</ErrorText>
            </div>
            <div>
              <Label htmlFor="email" required>Email Address</Label>
              <Input id="email" name="email" type="email" value={values.email} onChange={onChange} placeholder="Enter your email address" error={errors.email} />
              <ErrorText id="email-error">{errors.email}</ErrorText>
            </div>
            <div>
              <Label htmlFor="subject" required>Subject</Label>
              <Select id="subject" name="subject" value={values.subject} onChange={onChange} error={errors.subject}>
                <option value="">Select a subject</option>
                <option>General Inquiry</option>
                <option>Journal Hosting</option>
                <option>Conference Partnership</option>
                <option>Technical Support</option>
                <option>Billing & Pricing</option>
                <option>Other</option>
              </Select>
              <ErrorText id="subject-error">{errors.subject}</ErrorText>
            </div>
            <div>
              <Label htmlFor="message" required>Message</Label>
              <Textarea id="message" name="message" rows={5} value={values.message} onChange={onChange} placeholder="Write your message here..." error={errors.message} />
              <ErrorText id="message-error">{errors.message}</ErrorText>
            </div>
            <SubmitButton loading={loading}>
              <Send className="w-4 h-4" /> Send Message
            </SubmitButton>
          </form>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-display font-bold text-lg text-slate-900 mb-3">Our Location</h2>
            <div className="rounded-xl overflow-hidden border border-slate-200 h-64">
              <iframe
                title="Technical Journals office location map"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Covent+Garden,+London&output=embed"
              />
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-sm text-slate-900 mb-1">Connect With Us</h3>
            <p className="text-xs text-slate-500 mb-4">Follow us on our social media channels for the latest updates, news, and announcements.</p>
            <div className="flex gap-3">
              {[
                { Icon: FacebookIcon, href: SITE.social.facebook, label: "Facebook" },
                { Icon: LinkedinIcon, href: SITE.social.linkedin, label: "LinkedIn" },
                { Icon: TwitterIcon, href: SITE.social.twitter, label: "Twitter" },
                { Icon: YoutubeIcon, href: SITE.social.youtube, label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-blue-700 hover:text-white hover:border-blue-700">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-slate-900">Frequently Asked Questions</h2>
          <Link to="/faq" className="text-sm font-semibold text-blue-700">View All FAQs →</Link>
        </div>
        <Accordion items={contactFaqs.map((f) => ({ id: f.id, q: f.q, a: f.a }))} />
      </section>

      <CtaBanner
        icon="Mail"
        title="Still Have Questions?"
        subtitle="Our support team is ready to assist you with anything you need."
        primary={{ label: "Contact Support", to: "/contact" }}
        secondary={{ label: "Visit Help Center", to: "/help-center" }}
      />
    </>
  );
}
