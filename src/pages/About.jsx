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
  Landmark,
  Send,
  ChartNoAxesCombined,
} from "lucide-react";

import Seo from "../components/common/Seo";
import homeBg from "../assets/images/homebg.png";
import l1 from "../assets/images/l1.png";
import l2 from "../assets/images/l2.png";
import l3 from "../assets/images/l3.png";
import l4 from "../assets/images/l4.png";
import l5 from "../assets/images/l5.png";
import l6 from "../assets/images/l6.png";
import { SITE } from "../data/site";
import sdg3 from "../assets/images/h1.png";
import sdg4 from "../assets/images/h2.png";
import sdg9 from "../assets/images/h3.png";
import sdg17 from "../assets/images/h4.png";

const sdgs = [
  {
    id: 3,
    image: sdg3,
    alt: "SDG 3 Good Health and Well-Being",
  },
  {
    id: 4,
    image: sdg4,
    alt: "SDG 4 Quality Education",
  },
  {
    id: 9,
    image: sdg9,
    alt: "SDG 9 Industry Innovation and Infrastructure",
  },
  {
    id: 17,
    image: sdg17,
    alt: "SDG 17 Partnerships for the Goals",
  },
];

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
    value: "100+",
    label: "University Journals",
    sub: "Hosted",
    icon: BookOpen,
    iconBg: "bg-[#0B4AD8]",
    iconRing: "ring-[#DCE7FF]",
  },
  {
    value: "10,000+",
    label: "Articles",
    sub: "Published",
    icon: FileText,
    iconBg: "bg-[#10A83B]",
    iconRing: "ring-[#DCF6E4]",
  },
  {
    value: "50+",
    label: "Countries",
    sub: "Worldwide",
    icon: Globe2,
    iconBg: "bg-[#FF7A00]",
    iconRing: "ring-[#FFF0DE]",
  },
  {
    value: "500+",
    label: "Universities",
    sub: "Trust Us",
    icon: Landmark,
    iconBg: "bg-[#6E20C9]",
    iconRing: "ring-[#EFE1FF]",
  },
  {
    value: "99.9%",
    label: "Uptime & Reliable",
    sub: "Performance",
    icon: ShieldCheck,
    iconBg: "bg-[#0757D8]",
    iconRing: "ring-[#DCE8FF]",
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Exclusive Platform",
    desc: "Strictly for universities. No commercial content.",
    iconBg: "bg-[#EAF2FF]",
    iconColor: "text-[#1769E0]",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    desc: "Expand your research impact worldwide.",
    iconBg: "bg-[#EAF7ED]",
    iconColor: "text-[#20A447]",
  },
  {
    icon: Workflow,
    title: "End-to-End Workflow",
    desc: "From submission to publication - managed seamlessly.",
    iconBg: "bg-[#FFF1E5]",
    iconColor: "text-[#F97316]",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Advanced Analytics",
    desc: "Real-time insights on downloads, citations, and performance.",
    iconBg: "bg-[#F2ECFF]",
    iconColor: "text-[#7C3AED]",
  },
  {
    icon: LockKeyhole,
    title: "Secure & Compliant",
    desc: "Enterprise-grade security with compliance to global standards.",
    iconBg: "bg-[#E7F5FB]",
    iconColor: "text-[#168DB7]",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Expert support team committed to your success.",
    iconBg: "bg-[#FFF0F2]",
    iconColor: "text-[#F21D42]",
  },
];

const services = [
  {
    icon: FileText,
    title: "Journal Hosting",
    desc: "Reliable and scalable hosting for peer-reviewed journals with custom domains and branding.",
    iconBg: "bg-[#EAF2FF]",
    iconColor: "text-[#146CDB]",
  },
  {
    icon: Workflow,
    title: "Editorial Workflow",
    desc: "Streamline submission, review, editing, and publication with smart workflows.",
    iconBg: "bg-[#EAF7ED]",
    iconColor: "text-[#22A447]",
  },
  {
    icon: BarChart3,
    title: "Indexing & Visibility",
    desc: "Get indexed in major databases and increase the visibility of your research.",
    iconBg: "bg-[#FFF1E5]",
    iconColor: "text-[#F97816]",
  },
  {
    icon: LockKeyhole,
    title: "Security & Compliance",
    desc: "Robust security, regular backups, and adherence to publishing ethics and standards.",
    iconBg: "bg-[#F2EBFF]",
    iconColor: "text-[#7635D5]",
  },
  {
    icon: Users,
    title: "Author & Reviewer",
    desc: "Intuitive tools for authors, reviewers, and editors to collaborate efficiently.",
    iconBg: "bg-[#EAF4FF]",
    iconColor: "text-[#1682DC]",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Reports & Analytics",
    desc: "Track performance, downloads, citations, and other key metrics in real-time.",
    iconBg: "bg-[#FFF0F2]",
    iconColor: "text-[#F21942]",
  },
];

const universities = [
  {
    name: "University of Oxford",
    logo: l1,
  },
  {
    name: "National University of Singapore",
    logo: l2,
  },
  {
    name: "University of Melbourne",
    logo: l3,
  },
  {
    name: "University of Toronto",
    logo: l4,
  },
  {
    name: "Technical University of Munich",
    logo: l5,
  },
  {
    name: "University of Cape Town",
    logo: l6,
  },
];
const universityReveal = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};


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
          flex h-[38px] w-[38px] shrink-0 items-center justify-center
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
            h-[23px] w-[23px] text-[#1769E0]
            transition-all duration-300
            group-hover:scale-110
            group-hover:text-white
          "
        />
      </div>

      <div className="pt-[2px]">
        <h3 className="text-[12px] font-bold leading-[1.3] text-[#172B54] sm:text-[13px]">
          {title}
        </h3>

        <p className="mt-[5px] max-w-[150px] text-[9.5px] font-medium leading-[1.55] text-[#64728A] sm:text-[10.5px]">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export default function About() {
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
              mb-[19px]
              inline-flex
              items-center
              text-[10px]
              font-bold
              uppercase
              tracking-[0.015em]
              text-[#1769E0]
    
              sm:text-[10.5px]
              lg:text-[13px]
            "
          >
            <span className="absolute -bottom-[5px] left-0 h-[2.5px] w-[25px] bg-[#F58220] rounded-full" />
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
              font-bold
              leading-[1.08]
              tracking-[-0.015em]
              text-[#10275C]

              sm:text-[40px]
              md:text-[44px]

              lg:text-[47px]
              lg:leading-[1.04]

              xl:text-[43px]
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
              mt-[26px]
              max-w-[520px]
              text-[11px]
              font-medium
              leading-[1.82]
              text-[#53627A]

              sm:text-[12px]

              md:text-[13px]

              lg:max-w-[415px]
              lg:text-[14px]
              lg:leading-[1.8]
              text-justify 
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
              mt-[36px]
              grid
              max-w-[420px]
              grid-cols-1
              

              xs:grid-cols-2

              sm:grid-cols-2
            
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
              desc="Increase research and citation impact worldwide."
            />
          </motion.div>
        </motion.div>
      </div>
    </section>

        {/* STATS */}
       <section
      className="
        relative z-20
        mx-auto
        -mt-[6px]
        w-full
        max-w-[1220px]
        px-4
        sm:px-5
        lg:px-6
      "
    >
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 0.55,
          ease,
        }}
        className="
          overflow-hidden
          rounded-[13px]
          border border-[#E5EBF3]
          bg-white
          shadow-[0_9px_30px_rgba(24,58,108,0.10)]
        "
      >
        <div
          className="
            grid
            grid-cols-1

            sm:grid-cols-2

            lg:grid-cols-5
          "
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.value}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                }}
                transition={{
                  duration: 0.22,
                  ease,
                }}
                className={`
                  group
                  relative
                  flex
                  min-h-[95px]
                  items-center
                  justify-start
                  gap-[12px]
                  px-5
                  py-[18px]

                  sm:min-h-[100px]
                  sm:px-6

                  lg:min-h-[116px]
                  lg:justify-center
                  lg:px-[18px]

                  xl:px-[24px]

                  ${
                    index !== stats.length - 1
                      ? `
                        border-b border-[#E7ECF3]
                        sm:border-b
                        lg:border-b-0
                        lg:border-r
                        lg:border-[#E3E9F1]
                      `
                      : ""
                  }
                `}
              >
                {/* Icon */}
                <motion.span
                  whileHover={{
                    rotate: 4,
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 0.22,
                    ease,
                  }}
                  className={`
                    grid
                    h-[48px]
                    w-[48px]
                    shrink-0
                    place-items-center
                    rounded-full

                    ${item.iconBg}

                    ring-[5px]
                    ${item.iconRing}

                    shadow-[0_4px_12px_rgba(20,61,126,0.12)]

                    transition-all
                    duration-300

                    
                  `}
                >
                  <Icon
                    size={23}
                    strokeWidth={2}
                    className="text-white"
                  />
                </motion.span>

                {/* Content */}
                <div className="min-w-0">
                  <p
                    className="
                      whitespace-nowrap
                      text-[19px]
                      font-bold
                      leading-none
                      tracking-[-0.02em]
                      text-[#102B5C]

                      sm:text-[20px]

                      lg:text-[18px]

                      xl:text-[19px]
                    "
                  >
                    {item.value}
                  </p>

                  <p
                    className="
                      mt-[6px]
                      whitespace-nowrap
                      text-[10px]
                      font-bold
                      leading-[1.15]
                      text-[#223D6A]

                      xl:text-[12px]
                    "
                  >
                    {item.label}
                  </p>

                  <p
                    className="
                      mt-[2px]
                      whitespace-nowrap
                      text-[9.5px]
                      font-semibold
                      leading-[1.15]
                      text-[#536681]

                      xl:text-[11px]
                    "
                  >
                    {item.sub}
                  </p>
                </div>

                {/* soft hover glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-b
                    from-[#F8FBFF]/0
                    to-[#EEF5FF]/0
                    opacity-0
                    transition-all
                    duration-300
                    
                  "
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>

        {/* MISSION / VISION */}
         <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease }}
        className="
          mx-auto
          grid
          w-full
          max-w-[1170px]
          overflow-hidden
          rounded-[11px]
          border
          border-[#D9E5F2]
          bg-[linear-gradient(90deg,#F9FCFF_0%,#F7FAFF_50%,#F8FBFF_100%)]
          shadow-[0_4px_14px_rgba(33,79,136,0.04)]
          
          md:grid-cols-2
        "
      >
        {/* Mission */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.22, ease }}
          className="
            group
            flex
            items-center
            gap-5
            px-5
            py-3

            sm:px-7
            

            md:min-h-[174px]
            md:px-8
            

            lg:gap-6
            lg:px-10
          "
        >
          <motion.div
            whileHover={{ scale: 1.07, rotate: -3 }}
            transition={{ duration: 0.25, ease }}
            className="
              grid
              h-[82px]
              w-[82px]
              shrink-0
              place-items-center
              rounded-full
              bg-[#E6F6E9]
              text-[#10A43B]
              transition-all
              duration-300
              group-hover:shadow-[0_8px_22px_rgba(16,164,59,0.14)]

              sm:h-[86px]
              sm:w-[86px]
            "
          >
            <Target
              size={46}
              strokeWidth={2.3}
              className="text-[#0AA33A]"
            />
          </motion.div>

          <div className="min-w-0">
            <h3
              className="
                text-[18px]
                font-bold
                leading-none
                text-[#12962D]

                sm:text-[20px]
              "
            >
              Our Mission
            </h3>

            <p
              className="
                mt-[10px]
                max-w-[390px]
                text-[12px]
                font-medium
                leading-[1.7]
                text-[#4F5E75]

                sm:text-[13.5px]
              "
            >
              To empower universities worldwide by providing a dedicated
              platform for academic journals that ensures secure hosting,
              efficient workflows, and global visibility for research.
            </p>
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.22, ease }}
          className="
            group
            relative
            flex
            items-center
            gap-5
            border-t
            border-[#DCE5EF]
            px-5
            py-3

          

            md:min-h-[164px]
            md:border-l
            md:border-t-0
            md:px-8
            md:py-5

            lg:gap-6
            lg:px-10
          "
        >
          <motion.div
            whileHover={{ scale: 1.07, rotate: 3 }}
            transition={{ duration: 0.25, ease }}
            className="
              grid
              h-[82px]
              w-[82px]
              shrink-0
              place-items-center
              rounded-full
              bg-[#E8F0FF]
              text-[#1769E0]
              transition-all
              duration-300
              group-hover:shadow-[0_8px_22px_rgba(23,105,224,0.14)]

              sm:h-[86px]
              sm:w-[86px]
            "
          >
            <Eye
              size={46}
              strokeWidth={2.15}
              className="text-[#1769E0]"
            />
          </motion.div>

          <div className="min-w-0">
            <h3
              className="
                text-[18px]
                font-bold
                leading-none
                text-[#1769E0]

                sm:text-[20px]
              "
            >
              Our Vision
            </h3>

            <p
              className="
                mt-[10px]
                max-w-[390px]
                text-[10px]
                font-medium
                leading-[1.7]
                text-[#4F5E75]

                sm:text-[10.5px]
              "
            >
              To be the world&apos;s most trusted and preferred journal
              hosting platform for universities, driving innovation in
              academic publishing and advancing knowledge for a better future.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>

       {/* WHY UNIVERSITIES TRUST */}
<section className="w-full bg-white py-5">
  <div className="mx-auto w-full max-w-[1230px] px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mb-8 text-center sm:mb-9"
    >
      <h2
        className="
          text-[21px]
          font-[600]
          leading-tight
          tracking-[-0.025em]
          text-[#08245A]

          sm:text-[24px]
          lg:text-[26px]
        "
      >
        Why Universities Trust Technical Journals
      </h2>

      {/* exact multicolor underline */}
      <div
        className="
          mx-auto
          mt-3
          flex
          h-[3.5px]
          w-[82px]
          overflow-hidden
          rounded-full
          sm:w-[98px]
        "
      >
        <span className="h-full flex-[2.2] bg-[#1769E0]" />
        <span className="h-full flex-1 bg-[#FF5A4E]" />
        <span className="h-full flex-1 bg-[#FFC43D]" />
        <span className="h-full flex-1 bg-[#25C7D9]" />
        <span className="h-full flex-[2.2] bg-[#1769E0]" />
      </div>
    </motion.div>

    {/* Trust items */}
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06,
          },
        },
      }}
      className="
        grid
        grid-cols-1

        sm:grid-cols-2

        md:grid-cols-3

        lg:grid-cols-6
      "
    >
      {trustItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.article
            key={item.title}
            variants={{
              hidden: {
                opacity: 0,
                y: 18,
                scale: 0.97,
              },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
              },
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -6,
            }}
            className={`
              group
              relative
              flex
              min-h-[182px]
              flex-col
              items-center
              justify-start
              px-5
              py-4
              text-center

              sm:min-h-[190px]

              lg:min-h-[174px]
              lg:px-4

              ${
                index !== trustItems.length - 1
                  ? `
                    border-b
                    border-[#E5EAF1]

                    sm:[&:nth-child(odd)]:border-r

                    md:border-b
                    md:border-r
                    md:[&:nth-child(3n)]:border-r-0

                    lg:border-b-0
                    lg:border-r
                    lg:[&:nth-child(3n)]:border-r
                  `
                  : ""
              }
            `}
          >
            {/* subtle hover background */}
            <div
              className="
                pointer-events-none
                absolute
                inset-1
                rounded-[10px]
                bg-[#F8FBFF]
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />

            {/* icon */}
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: 2,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 18,
              }}
              className={`
                relative
                z-10
                grid
                h-[52px]
                w-[52px]
                shrink-0
                place-items-center
                rounded-full

                sm:h-[55px]
                sm:w-[55px]

                ${item.iconBg}
                ${item.iconColor}
              `}
            >
              <Icon
                className="
                  h-[26px]
                  w-[26px]

                  sm:h-[29px]
                  sm:w-[29px]
                "
                strokeWidth={2.3}
              />
            </motion.div>

            {/* title */}
            <h3
              className="
                relative
                z-10
                mt-4
                text-[12px]
                font-bold
                leading-[1.25]
                text-[#102D63]

                sm:text-[12px]
                lg:text-[13px]
                xl:text-[14px]
              "
            >
              {item.title}
            </h3>

            {/* description */}
            <p
              className="
                relative
                z-10
                mx-auto
                mt-2
                max-w-[145px]
                text-[8.5px]
                font-medium
                leading-[1.65]
                text-[#5F6F87]

                sm:text-[9px]

                xl:text-[11px]
              "
            >
              {item.desc}
            </p>
          </motion.article>
        );
      })}
    </motion.div>
  </div>
</section>

       {/* WHAT WE OFFER */}
<section className="w-full bg-white py-6">
  <div className="mx-auto w-full max-w-[1230px] px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mb-8 text-center sm:mb-9"
    >
      <h2
        className="
          text-[22px]
          font-[600]
          leading-tight
          tracking-[-0.025em]
          text-[#08245A]

          sm:text-[26px]
          lg:text-[26px]
        "
      >
        What We Offer to Universities
      </h2>

      {/* Multicolor line exactly like reference */}
      <div
        className="
          mx-auto
          mt-3
          flex
          h-[3.5px]
          w-[82px]
          overflow-hidden
          rounded-full
          sm:w-[98px]
        "
      >
        <span className="h-full flex-[2.2] bg-[#1769E0]" />
        <span className="h-full flex-1 bg-[#FF5A4E]" />
        <span className="h-full flex-1 bg-[#FFC43D]" />
        <span className="h-full flex-1 bg-[#25C7D9]" />
        <span className="h-full flex-[2.2] bg-[#1769E0]" />
      </div>
    </motion.div>

    {/* Cards */}
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06,
          },
        },
      }}
      className="
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-2
        md:grid-cols-3

        xl:grid-cols-6
        xl:gap-[14px]
      "
    >
      {services.map((item) => {
        const Icon = item.icon;

        return (
          <motion.article
            key={item.title}
            variants={{
              hidden: {
                opacity: 0,
                y: 22,
                scale: 0.98,
              },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
              },
            }}
            transition={{
              duration: 0.48,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -7,
              boxShadow: "0 16px 35px rgba(22, 64, 120, 0.11)",
            }}
            className="
              group
              flex
              min-h-[216px]
              flex-col
              items-center
              rounded-[12px]
              border
              border-[#E4EAF2]
              bg-white
              px-4
              py-5
              text-center
              transition-colors
              duration-300

              hover:border-[#CADAF0]

              sm:min-h-[220px]

              xl:min-h-[216px]
              xl:px-[10px]
            "
          >
            {/* Icon circle */}
            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 2,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 18,
              }}
              className={`
                grid
                h-[60px]
                w-[60px]
                shrink-0
                place-items-center
                rounded-full

                sm:h-[60px]
                sm:w-[60px]

                ${item.iconBg}
                ${item.iconColor}
              `}
            >
              <Icon
                className="
                  h-[29px]
                  w-[29px]

                  sm:h-[31px]
                  sm:w-[31px]
                "
                strokeWidth={2.3}
              />
            </motion.div>

            {/* Title */}
            <h3
              className="
                mt-5
                text-[13px]
                font-bold
                leading-[1.25]
                text-[#102D63]

                sm:text-[14.5px]
              "
            >
              {item.title}
            </h3>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-5
                max-w-[165px]
                flex-1
                text-[12px]
                font-medium
                leading-[1.75]
                text-[#56667F]

                sm:text-[12.5px]
                xl:text-[12px]
              "
            >
              {item.desc}
            </p>

            {/* Learn More */}
            {/* <Link
              to="/services"
              className="
                mt-6
                inline-flex
                items-center
                justify-center
                gap-2
                text-[10.5px]
                font-extrabold
                text-[#1769E0]
                transition-all
                duration-300

                group-hover:gap-3
                group-hover:text-[#0B55C3]

                sm:text-[11px]
              "
            >
              Learn More

              <ArrowRight
                className="
                  h-[15px]
                  w-[15px]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                strokeWidth={2.4}
              />
            </Link> */}
          </motion.article>
        );
      })}
    </motion.div>
  </div>
</section>

     
       {/* Trusted Universities */}
<section className="w-full bg-white py-8">
  <div className="mx-auto w-full max-w-[1230px] px-4 sm:px-6 lg:px-8 ">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mb-6 text-center sm:mb-7 lg:mb-8"
    >
      <h2
        className="
          text-[21px]
          font-[600]
          leading-[1.2]
          tracking-[-0.025em]
          text-[#08245A]
          sm:text-[25px]
          md:text-[26px]
          lg:text-[26px]
        "
      >
        Trusted by Leading Universities Worldwide
      </h2>

      {/* Exact multicolor underline */}
      <div
        className="
          mx-auto
          mt-3
          flex
          h-[3.5px]
          w-[82px]
          overflow-hidden
          rounded-full
          sm:w-[98px]
        "
      >
        <span className="h-full flex-[2.2] bg-[#1769E0]" />
        <span className="h-full flex-1 bg-[#FF5A4E]" />
        <span className="h-full flex-1 bg-[#FFC43D]" />
        <span className="h-full flex-1 bg-[#25C7D9]" />
        <span className="h-full flex-[2.2] bg-[#1769E0]" />
      </div>
    </motion.div>

    {/* Logo Container */}
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.07,
          },
        },
      }}
      className="
        overflow-hidden
        rounded-[14px]
        border
        border-[#E4EAF3]
        bg-white
        shadow-[0_3px_14px_rgba(15,43,89,0.025)]
      "
    >
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-6
        "
      >
        {universities.map((uni, index) => (
          <motion.div
            key={uni.name}
            variants={universityReveal}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -3,
              backgroundColor: "#F8FBFF",
            }}
            className={`
              group
              relative
              flex
              min-h-[94px]
              items-center
              justify-center
              px-5
              py-5
              transition-colors
              duration-300

              ${
                index !== universities.length - 1
                  ? `
                    border-b
                    border-[#E5EAF2]

                    sm:[&:not(:nth-child(2n))]:border-r

                    md:border-b
                    md:border-r
                    md:[&:nth-child(3n)]:border-r-0

                    lg:border-b-0
                    lg:border-r
                    lg:[&:nth-child(3n)]:border-r
                    lg:last:border-r-0
                  `
                  : ""
              }
            `}
          >
            {/* subtle hover glow */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
                bg-[radial-gradient(circle_at_center,rgba(23,105,224,0.055),transparent_68%)]
              "
            />

            <motion.img
              src={uni.logo}
              alt={`${uni.name} logo`}
              loading="lazy"
              draggable="false"
              whileHover={{ scale: 1.045 }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                z-10
                block
                h-auto
                w-auto
                max-h-[48px]
                max-w-[190px]
                object-contain

                sm:max-h-[50px]
                sm:max-w-[185px]

                md:max-h-[52px]
                md:max-w-[180px]

                lg:max-h-[48px]
                lg:max-w-[155px]

              
              "
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
</section>

       
      {/* Sustainable Development */}
<section className="w-full bg-white pb-5 sm:pb-6 lg:pb-7">
  <div className="mx-auto w-full max-w-[1230px] px-4 sm:px-6 lg:px-8 ">

    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        overflow-hidden
        rounded-[12px]
        border
        border-[#DDE9DF]
        bg-[linear-gradient(90deg,#F4FBF5_0%,#F7FBF7_45%,#F3F8F4_100%)]
        shadow-[0_4px_16px_rgba(25,90,48,0.025)]
      "
    >
      <div
        className="
          grid
          items-center
          gap-7
          px-5
          py-7

          sm:px-7
          sm:py-8

          md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)]
          md:gap-8

          lg:grid-cols-[36%_64%]
          lg:px-8
          lg:py-7

          xl:grid-cols-[40%_60%]
          xl:px-10
      "
      >

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[510px]"
        >
          <p
            className="
              text-[14px]
              font-semibold
              leading-none
              text-[#179447]

              sm:text-[16px]
          "
          >
            Our Commitment to
          </p>

          <h2
            className="
              mt-1
              text-[22px]
              font-semibold
              leading-[1.08]
              tracking-[-0.025em]
              text-[#159447]

              sm:text-[24px]
              lg:text-[24px]
          "
          >
            Sustainable Development
          </h2>

          <p
            className="
              mt-2
              max-w-[350px]
              text-[9px]
              font-medium
              leading-[1.7]
              text-[#5C6C62]
text-justify
              sm:text-[11px]
              lg:text-[12.5px]
          "
          >
            We support the United Nations Sustainable Development Goals
            by promoting open knowledge, ethical publishing, and research
            that addresses global challenges.
          </p>

          <motion.div
            whileHover={{
              x: 2,
            }}
            className="mt-4 inline-block"
          >
            <Link
              to="/about"
              className="
                group
                inline-flex
                min-h-[38px]
                items-center
                justify-center
                gap-2
                rounded-[5px]
                border
                border-[#58B873]
                bg-white
                px-4
                text-[12px]
                font-bold
                text-[#159447]
                shadow-[0_2px_5px_rgba(20,120,60,0.03)]
                transition-all
                duration-300

                hover:-translate-y-[1px]
                hover:border-[#159447]
                hover:bg-[#159447]
                hover:text-white
                hover:shadow-[0_6px_16px_rgba(21,148,71,0.15)]

                sm:text-[13px]
              "
            >
              Explore SDG Alignment

              <ArrowRight
                size={12}
                strokeWidth={2.2}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT SDG CARDS */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.07,
                delayChildren: 0.08,
              },
            },
          }}
          className="
            grid
            grid-cols-2
          

            md:grid-cols-2

            lg:grid-cols-4
            
          "
        >
          {sdgs.map((sdg) => (
            <motion.div
              key={sdg.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 18,
                  scale: 0.97,
                },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                },
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -6,
                scale: 1.025,
              }}
              className="
                group
                relative
                flex
                items-center
                justify-center
              "
            >
              <img
                src={sdg.image}
                alt={sdg.alt}
                loading="lazy"
                draggable="false"
                className="
                  block
                  h-auto
                  w-full
                  max-w-[180px]
                  select-none
                  rounded-[7px]
                  object-contain
                  shadow-[0_7px_16px_rgba(20,55,85,0.10)]
                  transition-all
                  duration-300

                  group-hover:shadow-[0_14px_28px_rgba(20,55,85,0.16)]

                  sm:max-w-[190px]

                  md:max-w-[150px]

                  lg:max-w-none
                  xl:max-w-[150px]
                "
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>

  </div>
</section>

        {/* CTA */}
      
<section className="w-full overflow-hidden">
  <div
    className="
      relative
      bg-[linear-gradient(100deg,#0057B8_0%,#0B74D8_20%,#49A04A_42%,#F5C330_58%,#FF8A00_75%,#F20D24_100%)]
    "
  >
    {/* subtle overlay for smooth reference-style blend */}
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,67,164,.18)_0%,transparent_28%,rgba(255,255,255,.05)_53%,transparent_100%)]" />

    <div
      className="
        relative
        z-10
        mx-auto
        flex
        w-full
        max-w-[1240px]
        flex-col
        gap-6
        px-5
        py-6

        sm:px-7
        sm:py-7

        md:flex-row
        md:items-center
        md:justify-between
        md:gap-8

        lg:px-10
        lg:py-[26px]

        xl:px-14
      "
    >
      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          flex
          min-w-0
          items-center
          gap-4

          sm:gap-5

          lg:gap-6
        "
      >
        {/* ICON */}
        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: -4,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 16,
          }}
          className="
            grid
            h-[58px]
            w-[58px]
            shrink-0
            place-items-center
            rounded-full
            bg-white
            text-[#1769E0]
            shadow-[0_8px_22px_rgba(0,0,0,0.13)]

            sm:h-[64px]
            sm:w-[64px]

            lg:h-[60px]
            lg:w-[60px]
          "
        >
          <Send
            className="
              h-[28px]
              w-[28px]

              sm:h-[31px]
              sm:w-[31px]

              lg:h-[34px]
              lg:w-[34px]
            "
            strokeWidth={1.8}
          />
        </motion.div>

        {/* TEXT */}
        <div className="min-w-0">
          <h2
            className="
              text-[17px]
              font-semibold
              leading-[1.15]
              tracking-[-0.018em]
              text-white

              sm:text-[20px]

              lg:text-[23px]
            "
          >
            Ready to Elevate Your University&apos;s Research?
          </h2>

          <p
            className="
              mt-2
              max-w-[570px]
              text-[9.5px]
              font-medium
              leading-[1.55]
              text-white/95

              sm:text-[10.5px]

              lg:text-[13px]
            "
          >
            Join hundreds of universities worldwide and host your journals on
            <br className="hidden lg:block" />
            a platform built exclusively for academic excellence.
          </p>
        </div>
      </motion.div>

      {/* RIGHT BUTTONS */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.55,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          flex
          w-full
          flex-col
          gap-3

          sm:flex-row

          md:w-auto
          md:shrink-0
        "
      >
        {/* HOST YOUR JOURNAL */}
        <motion.div
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <Link
            to="/register"
            className="
              inline-flex
              min-h-[43px]
              w-full
              items-center
              justify-center
              rounded-[5px]
              bg-white
              px-6
              text-[10px]
              font-bold
              text-[#1769E0]
              shadow-[0_5px_14px_rgba(0,0,0,0.10)]
              transition-all
              duration-300

              hover:bg-[#F7FAFF]
              hover:shadow-[0_9px_20px_rgba(0,0,0,0.15)]

              sm:min-w-[145px]
              sm:w-auto

              lg:min-h-[46px]
              lg:min-w-[158px]
              lg:px-5
              lg:text-[13px]
            "
          >
            Host Your Journal
          </Link>
        </motion.div>

        {/* REQUEST DEMO */}
        <motion.div
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <Link
            to="/contact"
            className="
              inline-flex
              min-h-[43px]
              w-full
              items-center
              justify-center
              rounded-[5px]
              border
              border-white
              bg-white/5
              px-4
              text-[12px]
              font-bold
              text-white
              shadow-[0_5px_14px_rgba(0,0,0,0.05)]
              backdrop-blur-[2px]
              transition-all
              duration-300

              hover:bg-white
              hover:text-[#F04A23]
              hover:shadow-[0_9px_20px_rgba(0,0,0,0.14)]

              sm:min-w-[145px]
              sm:w-auto

              lg:min-h-[46px]
              lg:min-w-[158px]
              lg:px-4
              lg:text-[13.5px]
            "
          >
            Request a Demo
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>
      </main>
    </>
  );
}