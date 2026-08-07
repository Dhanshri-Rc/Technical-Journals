import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  FileText,
  Globe2,
  GraduationCap,
  Headphones,
  HeartPulse,
  LockKeyhole,
  Network,
  Orbit,
  SearchCheck,
  ShieldCheck,
  Target,
  Users,
  Workflow,
  Eye,
  BookMarked,
  LineChart,
} from "lucide-react";

import Seo from "../components/common/Seo";
import homeBg from "../assets/images/homebg.png";
import { SITE } from "../data/site";

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const stats = [
  {
    icon: BookOpen,
    value: "100+",
    label: "University Journals",
    sub: "Hosted",
    iconClass: "bg-[#E7EEFF] text-[#165DFF]",
  },
  {
    icon: FileText,
    value: "10,000+",
    label: "Articles",
    sub: "Published",
    iconClass: "bg-[#EAF8EE] text-[#16A34A]",
  },
  {
    icon: Globe2,
    value: "50+",
    label: "Countries",
    sub: "Worldwide",
    iconClass: "bg-[#FFF1E5] text-[#F97316]",
  },
  {
    icon: GraduationCap,
    value: "500+",
    label: "Universities",
    sub: "Trust Us",
    iconClass: "bg-[#F0EAFF] text-[#7C3AED]",
  },
  {
    icon: ShieldCheck,
    value: "99.9%",
    label: "Uptime & Reliable",
    sub: "Performance",
    iconClass: "bg-[#E8F1FF] text-[#1465D7]",
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Exclusive Platform",
    desc: "Strictly for universities. No commercial content.",
    iconClass: "bg-[#EDF4FF] text-[#1769E0]",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    desc: "Expand your research impact worldwide.",
    iconClass: "bg-[#EAF8EE] text-[#16A34A]",
  },
  {
    icon: Workflow,
    title: "End-to-End Workflow",
    desc: "From submission to publication — streamline seamlessly.",
    iconClass: "bg-[#FFF1E7] text-[#F97316]",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    desc: "Real-time insights on downloads, citations, and performance.",
    iconClass: "bg-[#F3EDFF] text-[#7C3AED]",
  },
  {
    icon: LockKeyhole,
    title: "Secure & Compliant",
    desc: "Enterprise-grade security & data protection with global standards.",
    iconClass: "bg-[#E9F7FF] text-[#0891B2]",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Expert support team committed to your success.",
    iconClass: "bg-[#FFF0F0] text-[#EF4444]",
  },
];

const services = [
  {
    icon: BookOpen,
    title: "Journal Hosting",
    desc: "Reliable and scalable hosting for peer-reviewed journals with custom domains and branding.",
    iconClass: "bg-[#EAF1FF] text-[#1769E0]",
  },
  {
    icon: Workflow,
    title: "Editorial Workflow",
    desc: "Streamline submissions, review, editing, and publication with smart workflows.",
    iconClass: "bg-[#EAF8EE] text-[#16A34A]",
  },
  {
    icon: LineChart,
    title: "Indexing & Visibility",
    desc: "Get indexed in major databases and increase the visibility of your research.",
    iconClass: "bg-[#FFF3E7] text-[#F59E0B]",
  },
  {
    icon: LockKeyhole,
    title: "Security & Compliance",
    desc: "Robust security, regular backups, and adherence to publishing ethics and standards.",
    iconClass: "bg-[#F2ECFF] text-[#7C3AED]",
  },
  {
    icon: Users,
    title: "Author & Reviewer Tools",
    desc: "Intuitive tools for authors, reviewers, and editors to collaborate efficiently.",
    iconClass: "bg-[#EAF4FF] text-[#2385E9]",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    desc: "Track performance, downloads, citations, and other key metrics in real time.",
    iconClass: "bg-[#FFF0F1] text-[#F43F5E]",
  },
];

const universities = [
  { short: "UNIVERSITY OF", name: "OXFORD", className: "text-[#173C6A]" },
  { short: "NUS", name: "National University of Singapore", className: "text-[#174A8B]" },
  { short: "THE UNIVERSITY OF", name: "MELBOURNE", className: "text-[#204472]" },
  { short: "UNIVERSITY OF", name: "TORONTO", className: "text-[#1F4775]" },
  { short: "TUM", name: "Technical University of Munich", className: "text-[#0B69B7]" },
  { short: "UNIVERSITY OF", name: "CAPE TOWN", className: "text-[#2A5B84]" },
];

const sdgs = [
  {
    number: "3",
    title: "GOOD HEALTH\nAND WELL-BEING",
    icon: HeartPulse,
    cardClass: "bg-[#239447]",
  },
  {
    number: "4",
    title: "QUALITY\nEDUCATION",
    icon: BookMarked,
    cardClass: "bg-[#C8273D]",
  },
  {
    number: "9",
    title: "INDUSTRY, INNOVATION\nAND INFRASTRUCTURE",
    icon: Network,
    cardClass: "bg-[#E86B1E]",
  },
  {
    number: "17",
    title: "PARTNERSHIPS\nFOR THE GOALS",
    icon: Orbit,
    cardClass: "bg-[#1A4A76]",
  },
];

function SectionTitle({ children }) {
  return (
    <div className="mb-7 text-center sm:mb-8">
      <h2 className="text-[21px] font-bold leading-tight text-[#14295F] sm:text-[24px] lg:text-[27px]">
        {children}
      </h2>
      <div className="mx-auto mt-2 h-[3px] w-12 rounded-full bg-[#1F6DFF]" />
    </div>
  );
}

const FeatureMini = ({ icon: Icon, title, desc }) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.015,
      }}
      transition={{
        duration: 0.28,
        ease,
      }}
      className="group flex items-start gap-3"
    >
      <div
        className="
          flex h-[42px] w-[42px] shrink-0 items-center justify-center
          rounded-full border-[1.5px] border-[#4C8EFF]
          bg-white/85 shadow-[0_3px_12px_rgba(23,105,224,0.08)]
          transition-all duration-300
          group-hover:border-[#1769E0]
          group-hover:bg-[#1769E0]
          group-hover:shadow-[0_8px_22px_rgba(23,105,224,0.20)]
        "
      >
        <Icon
          strokeWidth={1.8}
          className="
            h-[20px] w-[20px] text-[#1769E0]
            transition-all duration-300
            group-hover:scale-110
            group-hover:text-white
          "
        />
      </div>

      <div className="pt-[2px]">
        <h3 className="text-[12px] font-bold leading-[1.3] text-[#172B54] sm:text-[12.5px]">
          {title}
        </h3>

        <p className="mt-[5px] max-w-[170px] text-[9.5px] font-medium leading-[1.55] text-[#64728A] sm:text-[10px]">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE?.name || "Technical Journals",
    url: SITE?.url || "/",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE?.url || ""}/journals?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Seo
        title="Empowering Academic Publishing Exclusively for Universities"
        description="Technical Journals is a secure, scalable and innovative journal hosting platform built exclusively for universities."
        path="/"
        jsonLd={jsonLd}
      />

      <main className="overflow-x-hidden bg-white font-sans text-[#24324A]">
        {/* HERO */}
         <section
      className="
        relative isolate w-full overflow-hidden
        bg-[#F8FBFF]
        min-h-[520px]
        sm:min-h-[540px]
        md:min-h-[560px]
        lg:min-h-[500px]
        xl:min-h-[520px]
      "
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="
          absolute inset-0 -z-20
          bg-no-repeat

          max-lg:bg-[length:auto_100%]
          max-lg:bg-[85%_center]

          lg:bg-cover
          lg:bg-center
          xl:bg-right
        "
        style={{
          backgroundImage: `url(${homeBg})`,
        }}
      />

   

      {/* Mobile extra overlay */}
      <div className="absolute inset-0 -z-[5] bg-white/75 lg:hidden" />

      <div
        className="
          mx-auto flex
          min-h-[520px]
          w-full
          max-w-[1280px]
          items-center

          px-5 py-10

          sm:min-h-[540px]
          sm:px-7
          sm:py-11

          md:min-h-[560px]
          md:px-9

          lg:min-h-[500px]
          lg:px-10
          lg:py-8

          xl:min-h-[520px]
          xl:px-[56px]
        "
      >
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          transition={{
            duration: 0.65,
            ease,
          }}
          className="
            relative z-10
            w-full
            max-w-[570px]

            lg:w-[47%]
            lg:max-w-[545px]
          "
        >
          {/* Small heading */}
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.08,
              ease,
            }}
            className="
              relative
              mb-[11px]
              inline-flex
              items-center
              text-[10px]
              font-bold
              uppercase
              tracking-[0.015em]
              text-[#1769E0]

              sm:text-[10.5px]
              lg:text-[12px]
            "
          >
            <span className="absolute -bottom-[3px] left-0 h-[2px] w-[15px] bg-[#F58220]" />
            About Technical Journals
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.12,
              ease,
            }}
            className="
              max-w-[530px]
              text-[34px]
              font-black
              leading-[1.08]
              tracking-[-0.035em]
              text-[#10275C]

              sm:text-[40px]
              md:text-[44px]

              lg:text-[47px]
              lg:leading-[1.04]

              xl:text-[49px]
            "
          >
            Empowering Academic
            <br />
            Publishing.{" "}
            <span className="text-[#1769E8]">
              Exclusively
            </span>
            <br />
            for Universities.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease,
            }}
            className="
              mt-[20px]
              max-w-[520px]
              text-[11px]
              font-medium
              leading-[1.82]
              text-[#53627A]

              sm:text-[11.5px]

              md:text-[12px]

              lg:max-w-[515px]
              lg:text-[12px]
              lg:leading-[1.8]
            "
          >
            Technical Journals is a secure, scalable, and innovative platform
            built exclusively for universities to host, manage, and publish
            peer-reviewed journals. We provide end-to-end tools and
            infrastructure to enhance research visibility, streamline editorial
            workflows, and uphold the highest publishing standards.
          </motion.p>

          {/* Feature row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.28,
              ease,
            }}
            className="
              mt-[27px]
              grid
              max-w-[520px]
              grid-cols-1
              gap-5

              xs:grid-cols-2

              sm:grid-cols-2
              sm:gap-8

              lg:gap-7
            "
          >
            <FeatureMini
              icon={ShieldCheck}
              title="Secure & Trusted"
              desc="Enterprise-grade security and 99.9% uptime guarantee."
            />

            <FeatureMini
              icon={Globe2}
              title="Global Visibility"
              desc="Increase research discoverability and citation impact worldwide."
            />
          </motion.div>
        </motion.div>
      </div>
    </section>

        {/* STATS */}
        <section className="relative z-10 mx-auto -mt-3 max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease }}
            className="grid overflow-hidden rounded-[14px] border border-[#E2EAF5] bg-white px-3 py-5 shadow-[0_12px_34px_rgba(22,58,110,.10)] sm:grid-cols-5 sm:px-1"
          >
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.value}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center justify-center gap-3 px-4 py-3 ${
                    index !== stats.length - 1
                      ? "border-b border-[#E8EDF4] sm:border-b-0 sm:border-r"
                      : ""
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${item.iconClass}`}
                  >
                    <Icon size={21} strokeWidth={2.1} />
                  </span>
                  <div>
                    <p className="text-[18px] font-black leading-none text-[#17356A] sm:text-[17px]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[9.5px] font-bold leading-[1.2] text-[#344760]">
                      {item.label}
                    </p>
                    <p className="text-[9px] font-semibold leading-[1.2] text-[#65758C]">
                      {item.sub}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* MISSION / VISION */}
        <section className="mx-auto max-w-[1180px] px-4 pt-8 sm:px-6 lg:px-8">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease }}
            className="grid rounded-[13px] border border-[#DCE8F7] bg-[linear-gradient(180deg,#F5F9FF_0%,#F8FBFF_100%)] px-5 py-7 sm:grid-cols-2 sm:divide-x sm:divide-[#D6E1EF] sm:px-7 lg:px-10"
          >
            <div className="flex items-center gap-5 pb-6 sm:pr-8 sm:pb-0">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#DFF4E7] text-[#16A34A]">
                <Target size={32} strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="text-[15px] font-bold text-[#16823A]">
                  Our Mission
                </h3>
                <p className="mt-2 max-w-[390px] text-[10px] font-medium leading-[1.72] text-[#51617A] sm:text-[10.5px]">
                  To empower universities worldwide by providing a dedicated
                  platform for academic journals that ensures secure hosting,
                  efficient workflows, and global visibility for research.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 border-t border-[#D6E1EF] pt-6 sm:border-t-0 sm:pl-8 sm:pt-0">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#E4EDFF] text-[#1769E0]">
                <Eye size={34} strokeWidth={2.1} />
              </span>
              <div>
                <h3 className="text-[15px] font-bold text-[#1769E0]">
                  Our Vision
                </h3>
                <p className="mt-2 max-w-[390px] text-[10px] font-medium leading-[1.72] text-[#51617A] sm:text-[10.5px]">
                  To be the world&apos;s most trusted and preferred journal
                  hosting platform for universities, driving innovation in
                  academic publishing and advancing knowledge for a better future.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* WHY TRUST */}
        <section className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <SectionTitle>Why Universities Trust Technical Journals</SectionTitle>

          <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-0">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.42, delay: index * 0.04, ease }}
                  whileHover={{ y: -5 }}
                  className={`px-3 text-center ${
                    index !== trustItems.length - 1
                      ? "lg:border-r lg:border-[#E2E8F0]"
                      : ""
                  }`}
                >
                  <span
                    className={`mx-auto grid h-12 w-12 place-items-center rounded-full ${item.iconClass}`}
                  >
                    <Icon size={21} strokeWidth={2.1} />
                  </span>
                  <h3 className="mt-3 text-[10.5px] font-bold leading-[1.2] text-[#17366B]">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[130px] text-[8.5px] font-medium leading-[1.5] text-[#6B7789]">
                    {item.desc}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* SERVICES */}
        <section className="mx-auto max-w-[1180px] px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12">
          <SectionTitle>What We Offer to Universities</SectionTitle>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {services.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.42, delay: index * 0.04, ease }}
                  whileHover={{
                    y: -7,
                    boxShadow: "0 16px 36px rgba(29, 74, 134, 0.12)",
                  }}
                  className="group flex min-h-[242px] flex-col rounded-[10px] border border-[#E3E9F1] bg-white p-4 transition-colors hover:border-[#BFD3F2]"
                >
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full ${item.iconClass}`}
                  >
                    <Icon size={20} strokeWidth={2.15} />
                  </span>

                  <h3 className="mt-4 text-[11px] font-bold text-[#17366B]">
                    {item.title}
                  </h3>

                  <p className="mt-3 flex-1 text-[9px] font-medium leading-[1.62] text-[#68768A]">
                    {item.desc}
                  </p>

                  <Link
                    to="/services"
                    className="mt-4 inline-flex w-fit items-center gap-1 text-[8.5px] font-bold text-[#1769E0] transition-all group-hover:gap-2"
                  >
                    Learn More <ArrowRight size={11} strokeWidth={2.5} />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* TRUSTED UNIVERSITIES */}
        <section className="mx-auto max-w-[1180px] px-4 pb-10 sm:px-6 lg:px-8">
          <SectionTitle>Trusted by Leading Universities Worldwide</SectionTitle>

          <div className="grid overflow-hidden rounded-[9px] border border-[#E4EAF2] bg-white sm:grid-cols-2 lg:grid-cols-6">
            {universities.map((uni, index) => (
              <motion.div
                key={uni.name}
                whileHover={{ backgroundColor: "#F7FAFF" }}
                className={`flex min-h-[76px] items-center justify-center gap-2 px-3 py-4 text-center ${
                  index !== universities.length - 1
                    ? "border-b border-[#E6EBF2] lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <GraduationCap size={22} className={uni.className} />
                <div className={uni.className}>
                  <p className="text-[7px] font-bold leading-none">{uni.short}</p>
                  <p
                    className={`mt-1 font-black leading-[1.05] ${
                      uni.name.length > 20 ? "text-[8px]" : "text-[10px]"
                    }`}
                  >
                    {uni.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SDG */}
        <section className="mx-auto max-w-[1180px] px-4 pb-7 sm:px-6 lg:px-8">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease }}
            className="grid items-center gap-6 rounded-[10px] border border-[#DDE8E0] bg-[linear-gradient(90deg,#F2FBF2_0%,#F6FBF6_100%)] px-5 py-6 lg:grid-cols-[1.15fr_1fr] lg:px-7"
          >
            <div>
              <p className="text-[11px] font-bold text-[#239447]">
                Our Commitment to
              </p>
              <h2 className="mt-1 text-[24px] font-black leading-none tracking-[-0.02em] text-[#239447] sm:text-[28px]">
                Sustainable Development
              </h2>
              <p className="mt-3 max-w-[520px] text-[9.5px] font-medium leading-[1.65] text-[#5C6E62]">
                We support the United Nations Sustainable Development Goals by
                promoting open knowledge, ethical publishing, and research that
                addresses global challenges.
              </p>
              <Link
                to="/about"
                className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-[#73C886] bg-white px-3 py-2 text-[8.5px] font-bold text-[#239447] transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                Explore SDG Alignment <ArrowRight size={11} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {sdgs.map((sdg) => {
                const Icon = sdg.icon;
                return (
                  <motion.div
                    key={sdg.number}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className={`min-h-[130px] rounded-[6px] p-3 text-white shadow-[0_8px_18px_rgba(20,55,85,.10)] ${sdg.cardClass}`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[27px] font-black leading-none">
                        {sdg.number}
                      </span>
                      <Icon size={25} strokeWidth={1.8} />
                    </div>
                    <p className="mt-2 whitespace-pre-line text-[8px] font-bold leading-[1.2]">
                      {sdg.title}
                    </p>
                    <div className="mt-5 border-t border-white/45 pt-2">
                      <p className="text-[7px] font-bold tracking-[.08em]">
                        SUSTAINABLE DEVELOPMENT GOALS
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="bg-[linear-gradient(90deg,#0758C9_0%,#0B6FE8_35%,#FDB314_68%,#F12B25_100%)]">
          <div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-5 px-5 py-6 sm:px-7 md:flex-row md:items-center lg:px-8">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-[#1769E0] shadow-[0_8px_24px_rgba(0,0,0,.12)]">
                <ArrowRight size={26} className="-rotate-45" strokeWidth={2.1} />
              </span>
              <div>
                <h2 className="text-[17px] font-bold leading-tight text-white sm:text-[20px]">
                  Ready to Elevate Your University&apos;s Research?
                </h2>
                <p className="mt-1 max-w-[560px] text-[9.5px] font-medium leading-[1.5] text-white/90 sm:text-[10px]">
                  Join hundreds of universities worldwide and host your journals on
                  a platform built exclusively for academic excellence.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-3 md:w-auto md:justify-end">
              <Link
                to="/register"
                className="inline-flex min-h-10 flex-1 items-center justify-center rounded-md bg-white px-5 text-[10px] font-bold text-[#1769E0] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg md:flex-none"
              >
                Host Your Journal
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-10 flex-1 items-center justify-center rounded-md border border-white/70 bg-white/10 px-5 text-[10px] font-bold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white hover:text-[#E44729] md:flex-none"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}