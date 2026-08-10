import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  FileText,
  Globe2,
  GraduationCap,
  Headphones,
  Landmark,
  Languages,
  LineChart,
  LockKeyhole,
  Search,
  Send,
  SendIcon,
  Settings2,
  ShieldCheck,
  Star,
  Users,
  Workflow,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

import Seo from "../components/common/Seo";
import { SITE } from "../data/site";
import heroBg from "../assets/images/hbg.png";
import solutionsImg from "../assets/images/solution.png";
import h1 from "../assets/images/h1.png";
import h2 from "../assets/images/h2.png";
import h3 from "../assets/images/h3.png";
import h4 from "../assets/images/h4.png";
import l1 from "../assets/images/l1.png";
import l2 from "../assets/images/l2.png";
import l3 from "../assets/images/l3.png";
import l4 from "../assets/images/l4.png";
import l5 from "../assets/images/l5.png";
import l6 from "../assets/images/l6.png";
import j1 from "../assets/images/j1.png";
import j2 from "../assets/images/j2.png";
import j3 from "../assets/images/j3.png";
import j4 from "../assets/images/j4.png";
import j5 from "../assets/images/j5.png";

export default function Home() {
  const ease = [0.22, 1, 0.36, 1];

  const reveal = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  /* =========================================================
     STATS
  ========================================================= */

 const stats = [
  {
    icon: BookOpen,
    value: "100+",
    title: "University Journals",
    subtitle: "Hosted",
    iconBg: "bg-[#1769E0]",
    glow: "shadow-[0_0_22px_rgba(23,105,224,0.50)]",
  },
  {
    icon: FileText,
    value: "10,000+",
    title: "Articles Published",
    subtitle: "",
    iconBg: "bg-[#18B8C8]",
    glow: "shadow-[0_0_22px_rgba(24,184,200,0.48)]",
  },
  {
    icon: Globe2,
    value: "50+",
    title: "Countries",
    subtitle: "",
    iconBg: "bg-[#FF6B27]",
    glow: "shadow-[0_0_22px_rgba(255,107,39,0.48)]",
  },
  {
    icon: Landmark,
    value: "500+",
    title: "Universities",
    subtitle: "Worldwide",
    iconBg: "bg-[#7058D9]",
    glow: "shadow-[0_0_22px_rgba(112,88,217,0.48)]",
  },
  {
    icon: ShieldCheck,
    value: "99.9%",
    title: "Uptime & Reliable",
    subtitle: "Performance",
    iconBg: "bg-[#1769E0]",
    glow: "shadow-[0_0_22px_rgba(23,105,224,0.50)]",
  },
];

  /* =========================================================
     JOURNALS
  ========================================================= */

const journals = [
  {
    id: 1,
    image: j1,
    title: "International Journal of Computer Science",
    category: "Computer Science",
    issn: "ISSN: 2456-9940",
    detailsLink: "/journals",
    journalLink: "/journals",
  },
  {
    id: 2,
    image: j2,
    title: "Journal of Environmental Studies",
    category: "Environmental Science",
    issn: "ISSN: 2456-8821",
    detailsLink: "/journals",
    journalLink: "/journals",
  },
  {
    id: 3,
    image: j3,
    title: "Journal of Electrical Engineering",
    category: "Electrical Engineering",
    issn: "ISSN: 2456-4782",
    detailsLink: "/journals",
    journalLink: "/journals",
  },
  {
    id: 4,
    image: j4,
    title: "International Journal of Mechanical Engineering",
    category: "Mechanical Engineering",
    issn: "ISSN: 2456-1290",
    detailsLink: "/journals",
    journalLink: "/journals",
  },
  {
    id: 5,
    image: j5,
    title: "Journal of Advanced Materials Research",
    category: "Materials Science",
    issn: "ISSN: 2456-5999",
    detailsLink: "/journals",
    journalLink: "/journals",
  },
{
    id: 1,
    image: j1,
    title: "International Journal of Computer Science",
    category: "Computer Science",
    issn: "ISSN: 2456-9940",
    detailsLink: "/journals",
    journalLink: "/journals",
  },
  {
    id: 2,
    image: j2,
    title: "Journal of Environmental Studies",
    category: "Environmental Science",
    issn: "ISSN: 2456-8821",
    detailsLink: "/journals",
    journalLink: "/journals",
  },
  {
    id: 3,
    image: j3,
    title: "Journal of Electrical Engineering",
    category: "Electrical Engineering",
    issn: "ISSN: 2456-4782",
    detailsLink: "/journals",
    journalLink: "/journals",
  },
  {
    id: 4,
    image: j4,
    title: "International Journal of Mechanical Engineering",
    category: "Mechanical Engineering",
    issn: "ISSN: 2456-1290",
    detailsLink: "/journals",
    journalLink: "/journals",
  },
 
];

const [journalSearch, setJournalSearch] = useState("");
const [journalPage, setJournalPage] = useState(0);
const [journalDirection, setJournalDirection] = useState(1);

const journalsPerPage = 5;

const filteredJournals = useMemo(() => {
  const searchValue = journalSearch
    .trim()
    .toLowerCase();

  if (!searchValue) {
    return journals;
  }

  return journals.filter((journal) => {
    return (
      journal.title
        .toLowerCase()
        .includes(searchValue) ||
      journal.category
        .toLowerCase()
        .includes(searchValue) ||
      journal.issn
        .toLowerCase()
        .includes(searchValue)
    );
  });
}, [journalSearch]);

const journalPageCount = Math.max(
  1,
  Math.ceil(
    filteredJournals.length / journalsPerPage
  )
);

const safeJournalPage = Math.min(
  journalPage,
  journalPageCount - 1
);

const visibleJournals = filteredJournals.slice(
  safeJournalPage * journalsPerPage,
  safeJournalPage * journalsPerPage +
    journalsPerPage
);

const handleJournalSearch = (event) => {
  setJournalSearch(event.target.value);
  setJournalPage(0);
  setJournalDirection(1);
};

const previousJournalPage = () => {
  setJournalDirection(-1);

  setJournalPage((currentPage) => {
    if (currentPage <= 0) {
      return journalPageCount - 1;
    }

    return currentPage - 1;
  });
};

const nextJournalPage = () => {
  setJournalDirection(1);

  setJournalPage((currentPage) => {
    if (
      currentPage >=
      journalPageCount - 1
    ) {
      return 0;
    }

    return currentPage + 1;
  });
};

const goToJournalPage = (page) => {
  setJournalDirection(
    page > safeJournalPage ? 1 : -1
  );

  setJournalPage(page);
};

  /* =========================================================
     SERVICES
  ========================================================= */

  const services = [
  {
    icon: FileText,
    title: "Journal Hosting",
    desc: "Secure and scalable hosting exclusively for university journals.",
    bg: "bg-[#E8F0FF]",
    color: "text-[#1769E0]",
    linkColor: "text-[#1769E0]",
  },
  {
    icon: Workflow,
    title: "Editorial Workflow",
    desc: "Streamline submission, review, editing, and publication seamlessly.",
    bg: "bg-[#EAF7ED]",
    color: "text-[#1FA24A]",
    linkColor: "text-[#1FA24A]",
  },
  {
    icon: BarChart3,
    title: "Indexing & Visibility",
    desc: "Get indexed in major databases and increase global research visibility.",
    bg: "bg-[#FFF0E4]",
    color: "text-[#F97316]",
    linkColor: "text-[#23974A]",
  },
  {
    icon: LockKeyhole,
    title: "Security & Compliance",
    desc: "Enterprise-grade security with regular backups and data protection.",
    bg: "bg-[#F0EAFF]",
    color: "text-[#7255D9]",
    linkColor: "text-[#23974A]",
  },
  {
    icon: Users,
    title: "Author & Reviewer Tools",
    desc: "Intuitive tools for authors, reviewers, and editors to collaborate efficiently.",
    bg: "bg-[#E7F6FA]",
    color: "text-[#1597B7]",
    linkColor: "text-[#23974A]",
  },
];

  /* =========================================================
     TRUST
  ========================================================= */

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

  /* =========================================================
     UNIVERSITIES
  ========================================================= */

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

  /* =========================================================
     SOLUTIONS
  ========================================================= */

 const solutions = [
  {
    icon: FileText,
    title: "Institutional Repository Integration",
    desc: "Connect journals with your institutional repository for long-term preservation.",
    bg: "bg-[#EEF4FF]",
    color: "text-[#3B82F6]",
  },
  {
    icon: Building2,
    title: "Custom Branding",
    desc: "Showcase your university identity with custom domains and branding.",
    bg: "bg-[#EEF5FF]",
    color: "text-[#2563EB]",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    desc: "Track submissions, downloads, citations, and performance in real-time.",
    bg: "bg-[#EEF4F1]",
    color: "text-[#5F8C76]",
  },
  {
    icon: Languages,
    title: "Multi-language Support",
    desc: "Reach a global audience with multilingual interface and support.",
    bg: "bg-[#FFF0E9]",
    color: "text-[#FF6B35]",
  },
];

  /* =========================================================
     TESTIMONIALS
  ========================================================= */

 const testimonials = [
  {
    quote:
      "Technical Journals has transformed the way we manage our publications. The platform is secure, easy to use, and has significantly increased our global visibility.",
    name: "Prof. Sarah Johnson",
    university: "University of Oxford",
    image: h1,
  },
  {
    quote:
      "The editorial workflow is seamless, and the support team is exceptional. Highly recommended for any university looking to elevate its research publishing.",
    name: "Dr. Michael Tan",
    university: "National University of Singapore",
    image: h2,
  },
  {
    quote:
      "A robust and reliable platform built exclusively for universities. It supports our mission to disseminate research for a better world.",
    name: "Prof. Anika Patel",
    university: "University of Toronto",
    image: h3,
  },

  // Extra testimonials for working carousel pages
  {
    quote:
      "The platform has helped our editorial team simplify peer review and provide a much better experience for researchers and authors.",
    name: "Dr. Emily Carter",
    university: "University of Melbourne",
    image: h4,
  },
  {
    quote:
      "We value the platform's reliability, global accessibility, and excellent support throughout the complete publishing workflow.",
    name: "Prof. Daniel Lee",
    university: "Technical University of Munich",
    image: h1,
  },
  {
    quote:
      "Technical Journals gives our institution the tools and visibility required to expand the impact of our academic publications.",
    name: "Prof. Maria Khan",
    university: "University of Cape Town",
    image: h2,
  },
];

const [testimonialPage, setTestimonialPage] = useState(0);

const testimonialsPerPage = 3;

const testimonialPages = Math.ceil(
  testimonials.length / testimonialsPerPage
);

const visibleTestimonials = testimonials.slice(
  testimonialPage * testimonialsPerPage,
  testimonialPage * testimonialsPerPage + testimonialsPerPage
);

const nextTestimonials = () => {
  setTestimonialPage((prev) =>
    prev === testimonialPages - 1 ? 0 : prev + 1
  );
};

const previousTestimonials = () => {
  setTestimonialPage((prev) =>
    prev === 0 ? testimonialPages - 1 : prev - 1
  );
};



  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE?.name || "Technical Journals",
    url: SITE?.url || "/",
  };

  return (
    <>
      <Seo
        title="Secure Hosting. Seamless Publishing. Stronger Research Impact."
        description="Secure and scalable journal hosting exclusively for universities."
        path="/"
        jsonLd={jsonLd}
      />

      <main className="overflow-x-hidden bg-white text-[#203451]">
{/* =====================================================
    HERO SECTION
===================================================== */}
<section
  className="
    relative
    isolate
    w-full
    overflow-hidden
    bg-[#F7FBFF]

    min-h-[560px]
sm:min-h-[540px]
 md:min-h-[520px]
lg:h-[510px]
 lg:min-h-[510px]
 xl:h-[510px]
    xl:min-h-[510px]
  "
>
  {/* BACKGROUND IMAGE */}
  <div
    className="
      absolute
      inset-0
      -z-20
      bg-cover
      bg-no-repeat

      bg-[45%_center]

      sm:bg-[53%_center]

      md:bg-[35%_center]

      lg:bg-[68%_center]

      xl:bg-right
    "
    style={{
      backgroundImage: `url(${heroBg})`,
    }}
  />

 

  {/* MAIN CONTENT */}
  <div
    className="
      mx-auto
      grid
      h-full
      w-full
      max-w-[1240px]
      items-center

      px-5
      py-8

      sm:px-7
      sm:py-8

      md:px-8

      lg:h-[500px]
      lg:grid-cols-[46%_54%]
      lg:px-12
      lg:py-0

      xl:grid-cols-[44%_56%]
      
    "
  >
    {/* LEFT CONTENT */}
    <motion.div
      initial={{
        opacity: 0,
        x: -28,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        z-10
        max-w-[560px]
      "
    >
      {/* TOP BADGE */}
      <motion.div
        initial={{
          opacity: 0,
          y: -8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          delay: 0.08,
        }}
        className="
          mb-4
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-[#83b4f4]
          bg-white/90
          px-3
          py-[6px]
          shadow-[0_4px_14px_rgba(18,68,135,.08)]
          backdrop-blur-sm
        "
      >
        <GraduationCap
          className="
            h-[13px]
            w-[13px]
            text-[#0566f7]
          "
          strokeWidth={2}
        />

        <span
          className="
            text-[8px]
            font-bold
            uppercase
            tracking-[.04em]
            text-[#3a7ddc]

            sm:text-[8.5px]
          "
        >
          Exclusive to Universities
        </span>
      </motion.div>

      {/* HEADING */}
      <h1
        className="
          max-w-[560px]
          text-[36px]
          font-[600]
          leading-[1.06]
          tracking-[-0.035em]
          text-[#10275D]

          sm:text-[42px]

          md:text-[45px]

          lg:text-[44px]

          
        "
      >
        Secure{" "}
        <span className="text-[#169447]">
          Hosting.
        </span>

        <br />

        Seamless{" "}
        <span className="text-[#6144CF]">
          Publishing.
        </span>

        <br />

        Stronger{" "}
        <span className="text-[#1769E0]">
          Research Impact.
        </span>
      </h1>

      {/* DESCRIPTION */}
      <p
        className="
          mt-4
          max-w-[385px]
          text-[13px]
          font-medium
          leading-[1.8]
          text-[#58677C]

          sm:text-[11.5px]

          lg:max-w-[415px]
          lg:text-[13.5px]

          xl:text-[14px]
        "
      >
        Technical Journals provides secure, reliable, and scalable hosting
        exclusively for university journals. Empower your institution with a
        platform designed for academic excellence and global visibility.
      </p>

      {/* BUTTONS ONLY - NO BOTTOM FEATURE SECTION */}
      <div
        className="
          mt-5
          flex
          flex-col
          gap-3

          sm:flex-row
        "
      >
        {/* HOST JOURNAL */}
        <motion.div
          whileHover={{
            y: -3,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="w-full sm:w-auto"
        >
          <Link
            to="/register"
            className="
              group
              inline-flex
              min-h-[40px]
              w-full
              items-center
              justify-center
              gap-3
              rounded-[4px]
              bg-[#1769E0]
              px-6
              text-[12px]
              font-semibold
              text-white
              shadow-[0_7px_16px_rgba(23,105,224,.18)]
              transition-all
              duration-300

              hover:bg-[#0E58C8]
              hover:shadow-[0_10px_22px_rgba(23,105,224,.23)]

              sm:w-auto
              sm:min-w-[148px]
              sm:text-[13px]
            "
          >
            Host Your Journal

            <ArrowRight
              className="
                h-[13px]
                w-[13px]
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
              strokeWidth={2.3}
            />
          </Link>
        </motion.div>

        {/* EXPLORE JOURNALS */}
        <motion.div
          whileHover={{
            y: -3,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="w-full sm:w-auto"
        >
          <Link
            to="/journals"
            className="
              group
              inline-flex
              min-h-[40px]
              w-full
              items-center
              justify-center
              gap-3
              rounded-[4px]
              border
              border-[#65B879]
              bg-white
              px-6
              text-[12px]
              font-semibold
              text-[#219653]
              shadow-[0_4px_10px_rgba(36,130,65,.04)]
              transition-all
              duration-300

              hover:bg-[#219653]
              hover:text-white
              hover:shadow-[0_8px_18px_rgba(33,150,83,.15)]

              sm:w-auto
              sm:min-w-[148px]
              sm:text-[13px]
            "
          >
            Explore Journals

            <ArrowRight
              className="
                h-[13px]
                w-[13px]
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
              strokeWidth={2.3}
            />
          </Link>
        </motion.div>
      </div>


{/* =====================================================
    BOTTOM 3 FEATURES
    Add this directly below the buttons
===================================================== */}
<motion.div
  initial="hidden"
  animate="show"
  variants={{
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  }}
  className="
    mt-5
    grid
    w-full
    max-w-[555px]
    grid-cols-1
    gap-2

    sm:grid-cols-3
    sm:gap-2

    md:mt-9

    lg:mt-9
    lg:max-w-[540px]
    lg:gap-2
  "
>
  {/* Secure by Design */}
  <motion.div
    variants={{
      hidden: {
        opacity: 0,
        y: 12,
      },
      show: {
        opacity: 1,
        y: 0,
      },
    }}
    transition={{
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    }}
    whileHover={{
      y: -4,
    }}
    className="
      group
      flex
      min-w-0
      items-start
      gap-3
    "
  >
    <motion.span
      whileHover={{
        scale: 1.08,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 18,
      }}
      className="
        grid
        h-[38px]
        w-[38px]
        shrink-0
        place-items-center
        rounded-full
        border
        border-[#95bff5]
        bg-[#e2eaf6]
        text-[#0665f4]
        shadow-[0_4px_12px_rgba(23,105,224,0.07)]

        sm:h-[36px]
        sm:w-[36px]

        lg:h-[38px]
        lg:w-[38px]
      "
    >
      <ShieldCheck
        className="
          h-[19px]
          w-[19px]

          sm:h-[18px]
          sm:w-[18px]

          lg:h-[19px]
          lg:w-[19px]
        "
        strokeWidth={2.2}
      />
    </motion.span>

    <div className="min-w-0">
      <p
        className="
          text-[11px]
          font-bold
          leading-[1.25]
          text-[#17366B]

         

          sm:text-[11.5px]
        "
      >
        Secure by Design
      </p>

      <p
        className="
          mt-1
          max-w-[125px]
          text-[8px]
          font-medium
          leading-[1.5]
          text-[#525e70]

        

          sm:text-[9px]
        "
      >
        Enterprise-grade security 
         <br className="hidden lg:block" />
         and data protection
      </p>
    </div>
  </motion.div>

  {/* 100% University Focused */}
  <motion.div
    variants={{
      hidden: {
        opacity: 0,
        y: 12,
      },
      show: {
        opacity: 1,
        y: 0,
      },
    }}
    transition={{
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    }}
    whileHover={{
      y: -4,
    }}
    className="
      group
      flex
      min-w-0
      items-start
      gap-3
    "
  >
    <motion.span
      whileHover={{
        scale: 1.08,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 18,
      }}
      className="
        grid
        h-[38px]
        w-[38px]
        shrink-0
        place-items-center
        rounded-full
        border
        border-[#98dbf6]
        bg-[#d5eef7]
        text-[#23bef7]
        shadow-[0_4px_12px_rgba(37,168,216,0.07)]

        sm:h-[36px]
        sm:w-[36px]

        lg:h-[38px]
        lg:w-[38px]
      "
    >
      <GraduationCap
        className="
          h-[21px]
          w-[21px]

          sm:h-[20px]
          sm:w-[20px]

          lg:h-[21px]
          lg:w-[21px]
        "
        strokeWidth={2.2}
      />
    </motion.span>

    <div className="min-w-0">
      <p
        className="
          text-[11px]
          font-bold
          leading-[1.25]
          text-[#17366B]

          

          sm:text-[11.5px]
        "
      >
        University Focused
      </p>

      <p
        className="
          mt-1
          max-w-[125px]
          text-[9px]
          font-medium
          leading-[1.5]
         text-[#525e70]

          

          sm:text-[9px]
        "
      >
        Only for university 
        <br className="hidden lg:block" />
        journals worldwide
      </p>
    </div>
  </motion.div>

  {/* 99.9% Uptime */}
  <motion.div
    variants={{
      hidden: {
        opacity: 0,
        y: 12,
      },
      show: {
        opacity: 1,
        y: 0,
      },
    }}
    transition={{
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    }}
    whileHover={{
      y: -4,
    }}
    className="
      group
      flex
      min-w-0
      items-start
      gap-3
    "
  >
    <motion.span
      whileHover={{
        scale: 1.08,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 18,
      }}
      className="
        grid
        h-[38px]
        w-[38px]
        shrink-0
        place-items-center
        rounded-full
        border
        border-[#9fdbf5]
        bg-[#e1f1f7]
        text-[#1798C8]
        shadow-[0_4px_12px_rgba(23,152,200,0.07)]

        sm:h-[36px]
        sm:w-[36px]

        lg:h-[38px]
        lg:w-[38px]
      "
    >
      <LockKeyhole
        className="
          h-[19px]
          w-[19px]

          sm:h-[18px]
          sm:w-[18px]

          lg:h-[19px]
          lg:w-[19px]
        "
        strokeWidth={2.2}
      />
    </motion.span>

    <div className="min-w-0">
      <p
        className="
          text-[11px]
          font-bold
          leading-[1.25]
          text-[#17366B]

      

          sm:text-[11.5px]
        "
      >
        99.9% Uptime
      </p>

      <p
        className="
          mt-1
          max-w-[125px]
          text-[9px]
          font-medium
          leading-[1.5]
          text-[#525e70]

        

          sm:text-[9px]
        "
      >
        Reliable hosting you
        <br className="hidden lg:block" />
        can always count on
      </p>
    </div>
  </motion.div>
</motion.div>

    </motion.div>

 
    <div className="hidden lg:block" />
  </div>
</section>

       {/* =====================================================
    STATISTICS BAR
===================================================== */}
<section
  className="
    relative
    z-20
    w-full
    bg-white
    px-4
    py-5

    sm:px-6
    sm:py-6

    lg:px-10
  "
>
  <motion.div
    initial={{
      opacity: 0,
      y: 18,
      scale: 0.99,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    viewport={{
      once: true,
      amount: 0.25,
    }}
    transition={{
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      mx-auto
      w-full
      max-w-[1140px]
      overflow-hidden
      rounded-[16px]
      border
      border-[#113A78]
      bg-[linear-gradient(100deg,#06245D_0%,#06275F_46%,#082C67_100%)]
      shadow-[0_10px_28px_rgba(4,31,78,0.14)]
    "
  >
    <div
      className="
        grid
        grid-cols-1

        sm:grid-cols-2

        md:grid-cols-3

        lg:grid-cols-5
      "
    >
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.value}
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.42,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -4,
            }}
            className={`
              group
              relative
              flex
              min-h-[105px]
              items-center
              justify-start
              gap-4
              px-6
              py-5

              sm:min-h-[110px]
              sm:px-5

              lg:min-h-[104px]
              lg:px-6

              xl:px-8

              ${
                index !== stats.length - 1
                  ? `
                    border-b
                    border-white/10

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
            {/* HOVER BACKGROUND */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-white/[0.035]
                opacity-0
                transition-opacity
                duration-300

                group-hover:opacity-100
              "
            />

            {/* ICON */}
            <motion.span
              whileHover={{
                scale: 1.1,
                rotate: 2,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 17,
              }}
              className={`
                relative
                z-10
                grid
                h-[50px]
                w-[50px]
                shrink-0
                place-items-center
                rounded-full
                text-white

                sm:h-[50px]
                sm:w-[50px]

                lg:h-[50px]
                lg:w-[50px]

                xl:h-[50px]
                xl:w-[50px]

                ${item.iconBg}
                ${item.glow}
              `}
            >
              <Icon
                className="
                  h-[25px]
                  w-[25px]

                  sm:h-[27px]
                  sm:w-[27px]
                "
                strokeWidth={1.9}
              />
            </motion.span>

            {/* TEXT */}
            <div
              className="
                relative
                z-10
                min-w-0
                text-left
              "
            >
              <p
                className="
                  whitespace-nowrap
                  text-[22px]
                  font-semibold
                  leading-none
                  tracking-[-0.025em]
                  text-white

                  sm:text-[21px]

                  lg:text-[20px]

                  xl:text-[21px]
                "
              >
                {item.value}
              </p>

              <p
                className="
                  mt-2
                  text-[10px]
                  font-semibold
                  leading-[1.25]
                  text-white/95

                  sm:text-[10.5px]

                  lg:text-[9px]

                  xl:text-[10.5px]
                "
              >
                {item.title}
              </p>

              {item.subtitle && (
                <p
                  className="
                    mt-[3px]
                    text-[9px]
                    font-medium
                    leading-[1.2]
                    text-white/85

                    lg:text-[9.5px]

                    xl:text-[10.5px]
                  "
                >
                  {item.subtitle}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
</section>

{/* =====================================================
    EXPLORE UNIVERSITY JOURNALS
===================================================== */}
<section
  className="
    relative
    w-full
    overflow-hidden
    bg-white
    py-9

    sm:py-10

    lg:py-8
  "
>
  <div
    className="
      mx-auto
      w-full
      max-w-[1200px]
      px-4

      sm:px-6

      lg:px-10

      
    "
  >
    {/* =================================================
        TOP AREA
    ================================================= */}
    <motion.div
      initial={{
        opacity: 0,
        y: 14,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        mb-6
        flex
        flex-col
        gap-5

        md:flex-row
        md:items-end
        md:justify-between
      "
    >
      {/* LEFT HEADING */}
      <div>
        <h2
          className="
            text-[23px]
            font-[600]
            leading-[1.15]
            tracking-[-0.02em]
            text-[#102D63]

            sm:text-[23px]

            lg:text-[25px]
          "
        >
          Explore University Journals
        </h2>

        <p
          className="
            mt-2
            text-[11px]
            font-medium
            leading-[1.5]
            text-[#6B7789]

            sm:text-[12px]
          "
        >
          Discover peer-reviewed research
          across diverse disciplines.
        </p>
      </div>

      {/* SEARCH + VIEW ALL */}
      <div
        className="
          flex
          w-full
          flex-col
          gap-3

          sm:flex-row

          md:w-auto
          md:items-center
        "
      >
        {/* SEARCH */}
        <div
          className="
            flex
            h-[40px]
            w-full
            items-center
            overflow-hidden
            rounded-[6px]
            border
            border-[#DDE4EF]
            bg-white
            shadow-[0_2px_8px_rgba(26,62,110,0.04)]

            sm:w-[315px]

            lg:w-[350px]
          "
        >
          <input
            type="text"
            value={journalSearch}
            onChange={handleJournalSearch}
            placeholder="Search journals by title, subject or ISSN..."
            aria-label="Search journals"
            className="
              min-w-0
              flex-1
              bg-transparent
              px-4
              text-[10px]
              font-medium
              text-[#43546A]
              outline-none

              placeholder:text-[#97A3B3]

              sm:text-[11px]
            "
          />

          <button
            type="button"
            aria-label="Search journals"
            className="
              grid
              h-full
              w-[43px]
              shrink-0
              place-items-center
              border-l
              border-[#E5EAF2]
              bg-white
              text-[#344A75]
              transition-all
              duration-300

              hover:bg-[#F4F8FF]
              hover:text-[#1769E0]
            "
          >
            <Search
              size={15}
              strokeWidth={2.1}
            />
          </button>
        </div>

        {/* VIEW ALL JOURNALS */}
        <motion.div
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="w-full sm:w-auto"
        >
          <Link
            to="/journals"
            className="
              inline-flex
              h-[40px]
              w-full
              items-center
              justify-center
              rounded-[5px]
              bg-[#1769E0]
              px-4
              text-[12px]
              font-[600]
              text-white
              shadow-[0_5px_13px_rgba(23,105,224,0.16)]
              transition-all
              duration-300

              hover:-translate-y-[1px]
              hover:bg-[#0C58C5]
              hover:shadow-[0_8px_18px_rgba(23,105,224,0.22)]

              sm:w-auto
              sm:min-w-[122px]

              lg:min-w-[128px]
              lg:text-[12.5px]
            "
          >
            View All Journals
          </Link>
        </motion.div>
      </div>
    </motion.div>

    {/* =================================================
        JOURNAL CAROUSEL
    ================================================= */}
    <div className="relative">
      {/* LEFT ARROW */}
      {journalPageCount > 1 && (
        <motion.button
          type="button"
          onClick={previousJournalPage}
          aria-label="Previous journals"
          whileHover={{
            scale: 1.08,
            x: -2,
          }}
          whileTap={{
            scale: 0.94,
          }}
          className="
            absolute
            left-[-22px]
            top-1/2
            z-30
            hidden
            h-[38px]
            w-[38px]
            -translate-y-1/2
            place-items-center
            rounded-full
            border
            border-[#DCE4F0]
            bg-white
            text-[#58739B]
            shadow-[0_5px_16px_rgba(28,61,108,0.10)]
            transition-all
            duration-300

            hover:border-[#BBD0EC]
            hover:text-[#1769E0]

            xl:grid
          "
        >
          <ChevronLeft
            size={16}
            strokeWidth={2.1}
          />
        </motion.button>
      )}

      {/* ===============================================
          JOURNAL CARDS / EMPTY RESULT
      =============================================== */}
      {visibleJournals.length > 0 ? (
        <div className="overflow-hidden">
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.div
              key={`${safeJournalPage}-${journalSearch}`}
              initial={{
                opacity: 0,
                x:
                  journalDirection > 0
                    ? 28
                    : -28,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x:
                  journalDirection > 0
                    ? -28
                    : 28,
              }}
              transition={{
                duration: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                grid
                grid-cols-1
                gap-4

                sm:grid-cols-2

                md:grid-cols-3

                lg:grid-cols-5

                xl:gap-[10px]
              "
            >
              {visibleJournals.map(
                (journal, index) => (
                  <motion.article
                    key={journal.id}
                    initial={{
                      opacity: 0,
                      y: 18,
                      scale: 0.985,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.045,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    whileHover={{
                      y: -7,
                      boxShadow:
                        "0 16px 34px rgba(22,61,112,0.11)",
                    }}
                    className="
                      group
                      flex
                      min-h-[274px]
                      flex-col
                      overflow-hidden
                      rounded-[9px]
                      border
                      border-[#E0E7F0]
                      bg-white
                      p-[8px]
                      transition-colors
                      duration-300

                      hover:border-[#C2D5ED]
                    "
                  >
                    {/* IMAGE */}
                    <div
                      className="
                        relative
                        h-[110px]
                        shrink-0
                        overflow-hidden
                        rounded-[5px]
                        bg-[#EFF3F7]

                        sm:h-[115px]

                        lg:h-[122px]

                        xl:h-[122px]
                      "
                    >
                      <img
                        src={journal.image}
                        alt={journal.title}
                        loading="lazy"
                        draggable="false"
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          ease-out

                          group-hover:scale-[1.055]
                        "
                      />

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-[#0B2A63]/0
                          transition-colors
                          duration-300

                          group-hover:bg-[#0B2A63]/[0.035]
                        "
                      />
                    </div>

                    {/* CONTENT */}
                    <div
                      className="
                        flex
                        flex-1
                        flex-col
                        px-1
                        pb-1
                        pt-3
                      "
                    >
                      {/* TITLE */}
                      <h3
                        className="
                          min-h-[36px]
                          text-[14px]
                          font-[600]
                          leading-[1.3]
                          text-[#17366B]

                          sm:text-[13px]

                          lg:text-[14px]

                          xl:text-[14px]
                        "
                      >
                        {journal.title}
                      </h3>

                      {/* CATEGORY */}
                      <p
                        className="
                          mt-2
                          text-[11px]
                          font-medium
                          leading-tight
                          text-[#66768C]

                          lg:text-[11px]

                          xl:text-[11px]
                        "
                      >
                        {journal.category}
                      </p>

                      {/* ISSN */}
                      <p
                        className="
                          mt-2
                          text-[10.5px]
                          font-medium
                          leading-tight
                          text-[#758397]

                          xl:text-[11px]
                        "
                      >
                        {journal.issn}
                      </p>

                      {/* BUTTONS */}
                      <div
                        className="
                          mt-auto
                          flex
                          gap-2
                          pt-4
                        "
                      >
                        <Link
                          to={
                            journal.detailsLink
                          }
                          className="
                            inline-flex
                            min-h-[28px]
                            flex-1
                            items-center
                            justify-center
                            rounded-[4px]
                            border
                            border-[#9DC0EC]
                            bg-white
                            px-2
                            text-center
                            text-[10px]
                            font-[600]
                            text-[#1769E0]
                            transition-all
                            duration-300

                            hover:border-[#1769E0]
                            hover:bg-[#1769E0]
                            hover:text-white
                            hover:shadow-[0_4px_10px_rgba(23,105,224,0.12)]

                            sm:text-[11.5px]
                          "
                        >
                          View Details
                        </Link>

                        <Link
                          to={
                            journal.journalLink
                          }
                          className="
                            inline-flex
                            min-h-[28px]
                            flex-1
                            items-center
                            justify-center
                            rounded-[4px]
                            border
                            border-[#95D1A7]
                            bg-white
                            px-2
                            text-center
                            text-[10px]
                            font-[600]
                            text-[#219653]
                            transition-all
                            duration-300

                            hover:border-[#219653]
                            hover:bg-[#219653]
                            hover:text-white
                            hover:shadow-[0_4px_10px_rgba(33,150,83,0.12)]

                            sm:text-[11.5px]
                          "
                        >
                          Visit Journal
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* NO SEARCH RESULTS */
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            flex
            min-h-[220px]
            flex-col
            items-center
            justify-center
            rounded-[10px]
            border
            border-dashed
            border-[#D9E3EF]
            bg-[#FBFDFF]
            px-5
            text-center
          "
        >
          <span
            className="
              grid
              h-12
              w-12
              place-items-center
              rounded-full
              bg-[#EAF2FF]
              text-[#1769E0]
            "
          >
            <Search
              size={19}
              strokeWidth={2}
            />
          </span>

          <p
            className="
              mt-4
              text-[12px]
              font-bold
              text-[#17366B]
            "
          >
            No journals found
          </p>

          <p
            className="
              mt-1
              text-[9px]
              text-[#758397]
            "
          >
            Try another title, subject,
            or ISSN.
          </p>

          <button
            type="button"
            onClick={() => {
              setJournalSearch("");
              setJournalPage(0);
            }}
            className="
              mt-4
              rounded-[4px]
              border
              border-[#AFC9E9]
              bg-white
              px-4
              py-2
              text-[8px]
              font-bold
              text-[#1769E0]
              transition

              hover:bg-[#1769E0]
              hover:text-white
            "
          >
            Clear Search
          </button>
        </motion.div>
      )}

      {/* RIGHT ARROW */}
      {journalPageCount > 1 && (
        <motion.button
          type="button"
          onClick={nextJournalPage}
          aria-label="Next journals"
          whileHover={{
            scale: 1.08,
            x: 2,
          }}
          whileTap={{
            scale: 0.94,
          }}
          className="
            absolute
            right-[-18px]
            top-1/2
            z-30
            hidden
            h-[38px]
            w-[38px]
            -translate-y-1/2
            place-items-center
            rounded-full
            border
            border-[#DCE4F0]
            bg-white
            text-[#58739B]
            shadow-[0_5px_16px_rgba(28,61,108,0.10)]
            transition-all
            duration-300

            hover:border-[#BBD0EC]
            hover:text-[#1769E0]

            xl:grid
          "
        >
          <ChevronRight
            size={16}
            strokeWidth={2.1}
          />
        </motion.button>
      )}
    </div>

    {/* =================================================
        WORKING PAGINATION DOTS
    ================================================= */}
    {filteredJournals.length > 0 &&
      journalPageCount > 1 && (
        <div
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-[6px]
          "
        >
          {Array.from({
            length: journalPageCount,
          }).map((_, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={() =>
                goToJournalPage(index)
              }
              whileHover={{
                scale: 1.12,
              }}
              whileTap={{
                scale: 0.92,
              }}
              aria-label={`Show journal page ${
                index + 1
              }`}
              aria-current={
                safeJournalPage === index
                  ? "page"
                  : undefined
              }
              className={`
                h-[6px]
                rounded-full
                transition-all
                duration-300

                ${
                  safeJournalPage === index
                    ? `
                      w-[17px]
                      bg-[#1769E0]
                      shadow-[0_2px_5px_rgba(23,105,224,0.20)]
                    `
                    : `
                      w-[9px]
                      bg-[#C8D0DB]

                      hover:bg-[#96A5B9]
                    `
                }
              `}
            />
          ))}
        </div>
      )}

    {/* =================================================
        MOBILE / TABLET CAROUSEL CONTROLS

        Desktop uses side arrows.
        These buttons prevent the carousel from becoming
        unusable on widths where side arrows are hidden.
    ================================================= */}
    {journalPageCount > 1 && (
      <div
        className="
          mt-4
          flex
          items-center
          justify-center
          gap-3

          xl:hidden
        "
      >
        <motion.button
          type="button"
          onClick={previousJournalPage}
          aria-label="Previous journals"
          whileTap={{
            scale: 0.94,
          }}
          className="
            grid
            h-9
            w-9
            place-items-center
            rounded-full
            border
            border-[#DCE4F0]
            bg-white
            text-[#58739B]
            shadow-sm
            transition-all

            hover:border-[#1769E0]
            hover:bg-[#F5F9FF]
            hover:text-[#1769E0]
          "
        >
          <ArrowLeft
            size={15}
            strokeWidth={2}
          />
        </motion.button>

        <span
          className="
            min-w-[58px]
            text-center
            text-[8px]
            font-semibold
            text-[#718096]
          "
        >
          {safeJournalPage + 1} /{" "}
          {journalPageCount}
        </span>

        <motion.button
          type="button"
          onClick={nextJournalPage}
          aria-label="Next journals"
          whileTap={{
            scale: 0.94,
          }}
          className="
            grid
            h-9
            w-9
            place-items-center
            rounded-full
            border
            border-[#DCE4F0]
            bg-white
            text-[#58739B]
            shadow-sm
            transition-all

            hover:border-[#1769E0]
            hover:bg-[#F5F9FF]
            hover:text-[#1769E0]
          "
        >
          <ArrowRight
            size={15}
            strokeWidth={2}
          />
        </motion.button>
      </div>
    )}
  </div>
</section>


     {/* =====================================================
    EVERYTHING YOU NEED
===================================================== */}
<section
  className="
    w-full
    border-y
    border-[#EEF2F6]
    bg-white
    py-9

    sm:py-10

    lg:py-11
  "
>
  <div
    className="
      mx-auto
      w-full
      max-w-[1230px]
      px-4

      sm:px-6

      lg:px-10

      xl:px-12
    "
  >
    {/* =================================================
        HEADING
    ================================================= */}
    <motion.div
      initial={{
        opacity: 0,
        y: 14,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.35,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        mb-7
        text-center

        sm:mb-8
      "
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
        Everything You Need to Publish and Manage Journals
      </h2>

      {/* SAME MULTICOLOR UNDERLINE */}
      <div
        className="
          mx-auto
          mt-3
          flex
          h-[3.5px]
          w-[92px]
          overflow-hidden
          rounded-full
        "
      >
        <span className="h-full flex-[2] bg-[#1769E0]" />

        <span className="h-full flex-1 bg-[#FF5A4E]" />

        <span className="h-full flex-1 bg-[#FFC43D]" />

        <span className="h-full flex-1 bg-[#25C7D9]" />

        <span className="h-full flex-[2] bg-[#7255D9]" />
      </div>
    </motion.div>

    {/* =================================================
        SERVICE CARDS
    ================================================= */}
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

        lg:grid-cols-5

        xl:gap-[10px]
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
                y: 18,
                scale: 0.985,
              },

              show: {
                opacity: 1,
                y: 0,
                scale: 1,
              },
            }}
            transition={{
              duration: 0.46,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -7,
              boxShadow:
                "0 16px 34px rgba(22,61,112,0.10)",
            }}
            className="
              group
              flex
              min-h-[215px]
              flex-col
              rounded-[10px]
              border
              border-[#E2E8F1]
              bg-white
              p-5
              transition-colors
              duration-300

              hover:border-[#C6D7EC]

              sm:min-h-[210px]

              lg:min-h-[215px]
              lg:p-4

              xl:min-h-[215px]
              xl:p-5
            "
          >
            {/* ICON */}
            <motion.span
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
                h-[50px]
                w-[50px]
                shrink-0
                place-items-center
                rounded-[10px]

                sm:h-[52px]
                sm:w-[52px]

                ${item.bg}
                ${item.color}
              `}
            >
              <Icon
                className="
                  h-[24px]
                  w-[24px]

                  sm:h-[25px]
                  sm:w-[25px]
                "
                strokeWidth={2.1}
              />
            </motion.span>

            {/* TITLE */}
            <h3
              className="
                mt-4
                text-[14px]
                font-[600]
                leading-[1.25]
                text-[#17366B]

                sm:text-[14.5px]

                lg:text-[15px]

                xl:text-[15.5px]
              "
            >
              {item.title}
            </h3>

            {/* DESCRIPTION */}
            <p
              className="
                mt-3
                flex-1
                text-[12px]
                font-medium
                leading-[1.65]
                text-[#66758A]

                sm:text-[11.5px]

                lg:text-[12px]

                xl:text-[12.5px]
              "
            >
              {item.desc}
            </p>

            {/* LEARN MORE */}
            {/* <Link
              to="/services"
              className={`
                mt-5
                inline-flex
                w-fit
                items-center
                gap-2
                text-[8px]
                font-bold
                transition-all
                duration-300

                group-hover:gap-3

                sm:text-[8.5px]

                ${item.linkColor}
              `}
            >
              Learn More

              <ArrowRight
                className="
                  h-[11px]
                  w-[11px]
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

        {/* =====================================================
            TRUST
        ===================================================== */}

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
                      text-[13px]
                      font-bold
                      leading-[1.25]
                      text-[#102D63]
      
                      sm:text-[13px]
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
                      text-[11px]
                      font-medium
                      leading-[1.65]
                      text-[#5F6F87]
      
                      sm:text-[11px]
      
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

        {/* =====================================================
            UNIVERSITY LOGOS
        ===================================================== */}

      <section className="w-full bg-white py-8">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 ">
      
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

    

      {/* =====================================================
    SOLUTIONS TAILORED FOR UNIVERSITIES
===================================================== */}
<section
  className="
    w-full
    bg-white
    py-6
  "
>
  <div
    className="
      mx-auto
      w-full
      max-w-[1210px]
      px-4

      sm:px-6

      lg:px-10
    "
  >
    {/* =================================================
        HEADING
    ================================================= */}
    <motion.div
      initial={{
        opacity: 0,
        y: 14,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.35,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        mb-7
        text-center

        sm:mb-8
      "
    >
      <h2
        className="
          text-[24px]
          font-[600]
          leading-tight
          tracking-[-0.02em]
          text-[#1769E0]

          sm:text-[25px]

          lg:text-[26px]
        "
      >
        Solutions Tailored for Universities
      </h2>

      {/* MULTICOLOR UNDERLINE */}
      <div
        className="
          mx-auto
          mt-3
          flex
          h-[3.5px]
          w-[92px]
          overflow-hidden
          rounded-full
        "
      >
        <span className="h-full flex-[2] bg-[#1769E0]" />

        <span className="h-full flex-1 bg-[#FF5A4E]" />

        <span className="h-full flex-1 bg-[#FFC43D]" />

        <span className="h-full flex-1 bg-[#25C7D9]" />

        <span className="h-full flex-[2] bg-[#7255D9]" />
      </div>
    </motion.div>

    {/* =================================================
        MAIN SOLUTION BOX
    ================================================= */}
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
        scale: 0.99,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        grid
        overflow-hidden
        rounded-[12px]
        border
        border-[#E3E9F1]
        bg-white
        shadow-[0_5px_20px_rgba(22,61,112,0.035)]

        md:grid-cols-[34%_66%]

        lg:grid-cols-[37%_63%]
      "
    >
      {/* =================================================
          LEFT IMAGE
      ================================================= */}
      <motion.div
        initial={{
          opacity: 0,
          x: -18,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.55,
          delay: 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          group
          relative
          min-h-[250px]
          overflow-hidden

          sm:min-h-[280px]

          md:min-h-[290px]

          lg:min-h-[300px]
        "
      >
        <img
          src={solutionsImg}
          alt="University research library"
          loading="lazy"
          className="
            h-full
            min-h-[250px]
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out

            group-hover:scale-[1.035]

            sm:min-h-[280px]

            md:min-h-[290px]

            lg:min-h-[300px]
          "
        />

        {/* subtle image overlay */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[#0B2A63]/0
            transition-colors
            duration-500

            group-hover:bg-[#0B2A63]/[0.025]
          "
        />
      </motion.div>

      {/* =================================================
          RIGHT CONTENT
      ================================================= */}
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
          content-center
          gap-1
        

          lg:px-8
         
        "
      >
        {solutions.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              variants={{
                hidden: {
                  opacity: 0,
                  x: 14,
                },

                show: {
                  opacity: 1,
                  x: 0,
                },
              }}
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                x: 5,
              }}
              className="
                group
                flex
                items-start
                gap-4
                rounded-[8px]
                px-2
                py-3
                transition-colors
                duration-300

                hover:bg-[#F8FBFF]
              "
            >
              {/* ICON */}
              <motion.span
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
                  h-[36px]
                  w-[36px]
                  shrink-0
                  place-items-center
                  rounded-full

                  sm:h-[38px]
                  sm:w-[38px]

                  ${item.bg}
                  ${item.color}
                `}
              >
                <Icon
                  className="
                    h-[17px]
                    w-[17px]

                    sm:h-[18px]
                    sm:w-[18px]
                  "
                  strokeWidth={2.1}
                />
              </motion.span>

              {/* TEXT */}
              <div className="min-w-0 pt-[1px]">
                <h3
                  className="
                    text-[15px]
                    font-[600]
                    leading-[1.25]
                    text-[#17366B]

                    sm:text-[15px]

                    lg:text-[16px]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-1
                    text-[13px]
                    font-medium
                    leading-[1.55]
                    text-[#68768A]

                    sm:text-[12px]

                    lg:text-[13px]
                  "
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  </div>
</section>

     

 

        {/* =====================================================
            CTA
        ===================================================== */}

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
              text-[12px]
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