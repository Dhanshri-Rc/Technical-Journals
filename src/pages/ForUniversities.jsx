import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Seo from "../components/common/Seo";
import Icon from "../components/ui/Icon";

import uniBg from "../assets/images/uniBg.png";
import ctaImg from "../assets/images/unicta.png";
import l1 from "../assets/images/l1.png";
import l2 from "../assets/images/l2.png";
import l3 from "../assets/images/l3.png";
import l4 from "../assets/images/l4.png";
import l5 from "../assets/images/l5.png";
import l6 from "../assets/images/l6.png";
import l7 from "../assets/images/l7.png";
import l8 from "../assets/images/l8.png";

/* =========================================================
   UNIVERSITY DATA
========================================================= */

const UNIVERSITIES = [
  {
    logo: l1,
    name: "University of Oxford",
    country: "United Kingdom",
    journals: 12,
  },
  {
    logo: l2,
    name: "National University of Singapore",
    country: "Singapore",
    journals: 8,
  },
  {
    logo: l3,
    name: "The University of Melbourne",
    country: "Australia",
    journals: 9,
  },
  {
    logo: l4,
    name: "University of Toronto",
    country: "Canada",
    journals: 15,
  },
  {
    logo: l5,
    name: "Technical University of Munich",
    country: "Germany",
    journals: 7,
  },
  {
    logo: l6,
    name: "University of Cape Town",
    country: "South Africa",
    journals: 6,
  },
  {
    logo: l7,
    name: "University of Sydney",
    country: "Australia",
    journals: 5,
  },
  {
    logo: l8,
    name: "King's College London",
    country: "United Kingdom",
    journals: 7,
  },
];


/* =========================================================
   WHY UNIVERSITIES CHOOSE US
========================================================= */

const WHY = [
  {
    icon: "ShieldCheck",
    title: "Exclusive Platform",
    desc: "Built exclusively for universities with no commercial content.",
    iconBg: "bg-[#EDF4FF]",
    iconColor: "text-[#1769E8]",
    hoverBg: "group-hover:bg-[#E3EEFF]",
  },
  {
    icon: "Globe2",
    title: "Global Visibility",
    desc: "Increase research visibility and impact worldwide.",
    iconBg: "bg-[#ECF9F0]",
    iconColor: "text-[#22A85A]",
    hoverBg: "group-hover:bg-[#E1F6E8]",
  },
  {
    icon: "Headphones",
    title: "End-to-End Support",
    desc: "From setup to publication, our team supports you at every step.",
    iconBg: "bg-[#FFF4E8]",
    iconColor: "text-[#FF8F13]",
    hoverBg: "group-hover:bg-[#FFEDDA]",
  },
  {
    icon: "Server",
    title: "Advanced Technology",
    desc: "Modern, scalable, and AI-enabled solutions for academic publishing.",
    iconBg: "bg-[#F2EDFF]",
    iconColor: "text-[#7650D8]",
    hoverBg: "group-hover:bg-[#EAE3FF]",
  },
  {
    icon: "Lock",
    title: "Secure & Reliable",
    desc: "Enterprise-grade security with 99.9% uptime and data protection.",
    iconBg: "bg-[#EDF4FF]",
    iconColor: "text-[#1769E8]",
    hoverBg: "group-hover:bg-[#E3EEFF]",
  },
];


/* =========================================================
   PLATFORM FEATURES
========================================================= */

const PLATFORM_FEATURES = [
  {
    icon: "FileText",
    title: "Journal Management",
    desc: "Manage editorial board, reviewers, and workflows seamlessly.",
    iconBg: "bg-[#EEF5FF]",
    iconColor: "text-[#1570E8]",
  },
  {
    icon: "UsersRound",
    title: "Peer Review System",
    desc: "Advanced peer review with automated and transparent workflows.",
    iconBg: "bg-[#ECF9F0]",
    iconColor: "text-[#20AA57]",
  },
  {
    icon: "BadgeCheck",
    title: "DOI & Indexing",
    desc: "DOI assignment and indexing in major databases.",
    iconBg: "bg-[#FFF3E8]",
    iconColor: "text-[#F28A14]",
    customText: "boi",
  },
  {
    icon: "ChartNoAxesCombined",
    title: "Analytics Dashboard",
    desc: "Real-time insights on submissions, publications, and impact.",
    iconBg: "bg-[#F2EDFF]",
    iconColor: "text-[#7550D8]",
  },
  {
    icon: "Monitor",
    title: "Custom Branding",
    desc: "Custom domain, logo, and branding for your journal.",
    iconBg: "bg-[#EEF5FF]",
    iconColor: "text-[#1570E8]",
  },
  {
    icon: "UsersRound",
    title: "Multiple Access",
    desc: "Role-based access for editors, authors, reviewers, and admins.",
    iconBg: "bg-[#ECF9F0]",
    iconColor: "text-[#20AA57]",
  },
];


/* =========================================================
   STATS DATA
========================================================= */

const STATS = [
  {
    icon: "BookOpen",
    value: "100+",
    label: "University Journals",
    sub: "Hosted",
    iconBg: "bg-[#125CD6]",
  },
  {
    icon: "FileText",
    value: "10,000+",
    label: "Articles",
    sub: "Published",
    iconBg: "bg-[#13A454]",
  },
  {
    icon: "Globe2",
    value: "50+",
    label: "Countries",
    sub: "Worldwide",
    iconBg: "bg-[#F49413]",
  },
  {
    icon: "Landmark",
    value: "500+",
    label: "Universities",
    sub: "Trust Us",
    iconBg: "bg-[#724BD7]",
  },
  {
    icon: "ShieldCheck",
    value: "99.9%",
    label: "Uptime & Reliable",
    sub: "Performance",
    iconBg: "bg-[#1762DA]",
  },
];


/* =========================================================
   ANIMATION SETTINGS
========================================================= */

const fadeUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    amount: 0.15,
  },
  transition: {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
  },
};


/* =========================================================
   PAGE
========================================================= */

export default function ForUniversities() {
  return (
    <>
      <Seo
        title="For Universities"
        description="Empowering universities to host, manage, and publish high-quality academic journals with global visibility."
      />


      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section
        className="
          relative
          min-h-[310px]
          overflow-hidden
          bg-[#061942]
          text-white

          sm:min-h-[430px]

          md:min-h-[380px]

          lg:min-h-[380px]
        "
        style={{
          backgroundImage: `
           
            url(${uniBg})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
       


        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[310px]
            max-w-[1200px]
            items-center
            px-5
            pb-[52px]
            pt-[38px]

            sm:min-h-[330px]
            sm:px-8

            md:min-h-[350px]

            lg:min-h-[360px]
            lg:px-10

            xl:px-12
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              x: -25,
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
              w-full
              max-w-[485px]

              lg:max-w-[500px]
            "
          >
            <h1
              className="
                max-w-[460px]
                text-[29px]
                font-bold
                leading-[1.25]
                tracking-[-0.015em]

                sm:text-[34px]

                md:text-[38px]

                lg:text-[38px]
              "
            >
              Empowering Universities
              <br />
              to Publish with Impact
            </h1>


            <p
              className="
                mt-4
                max-w-[405px]
                text-[12.5px]
                font-medium
                leading-[1.75]
                text-[#E1EBFA]

                sm:text-[12.5px]

                lg:text-[13px]
              "
            >
              A secure, scalable, and feature-rich platform built exclusively
              for universities to host, manage, and publish high-quality
              journals with global visibility.
            </p>


            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-3
              "
            >
              <Link
                to="/register"
                className="
                  inline-flex
                  h-[40px]
                  items-center
                  justify-center
                  rounded-[5px]
                  bg-[#1468E8]
                  px-5
                  text-[10px]
                  font-bold
                  text-white
                  shadow-[0_8px_20px_rgba(0,73,186,0.22)]
                  transition-all
                  duration-300

                  hover:-translate-y-[2px]
                  hover:bg-[#0E5FD9]
                  hover:shadow-[0_11px_26px_rgba(0,73,186,0.32)]

                  sm:px-6
                  sm:text-[11px]
                "
              >
                Host Your Journal
              </Link>


              <Link
                to="/contact"
                className="
                  inline-flex
                  h-[40px]
                  items-center
                  justify-center
                  rounded-[5px]
                  border
                  border-white/60
                  bg-white/[0.02]
                  px-5
                  text-[10px]
                  font-bold
                  text-white
                  backdrop-blur-sm
                  transition-all
                  duration-300

                  hover:-translate-y-[2px]
                  hover:border-white
                  hover:bg-white/10

                  sm:px-6
                  sm:text-[11px]
                "
              >
                Request a Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      {/* =====================================================
          STATS BAR
      ===================================================== */}

      <section
        className="
          relative
          z-20
          mx-auto
          -mt-[30px]
          max-w-[1200px]
          px-4

          sm:px-6

          lg:px-9

          xl:px-11
        "
      >
        <motion.div
          {...fadeUp}
          className="
            grid
            overflow-hidden
            rounded-[9px]
            border
            border-[#E4E9F2]
            bg-white
            shadow-[0_8px_28px_rgba(25,51,91,0.10)]

            grid-cols-1

            sm:grid-cols-2

            lg:grid-cols-5
          "
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{
                y: -3,
              }}
              transition={{
                duration: 0.2,
              }}
              className={`
                group
                flex
                min-h-[96px]
                items-center
                justify-center
                gap-3
                px-4
                py-4
                transition-all
                duration-300

                hover:bg-[#F8FBFF]

                ${
                  index !== STATS.length - 1
                    ? "lg:border-r lg:border-[#EDF0F5]"
                    : ""
                }
              `}
            >
              <div
                className={`
                  ${stat.iconBg}
                  flex
                  h-[45px]
                  w-[45px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-white
                  shadow-sm
                  transition-transform
                  duration-300

                  group-hover:scale-110
                `}
              >
                <Icon
                  name={stat.icon}
                  className="h-[24px] w-[24px]"
                />
              </div>

              <div>
                <div
                  className="
                    text-[18px]
                    font-bold
                    leading-none
                    text-[#102D63]
                  "
                >
                  {stat.value}
                </div>

                <div
                  className="
                    mt-[5px]
                    text-[11px]
                    font-semibold
                    leading-tight
                    text-[#182C50]
                  "
                >
                  {stat.label}
                </div>

                <div
                  className="
                    mt-[2px]
                    text-[10px]
                    font-semibold
                    text-[#8792A4]
                  "
                >
                  {stat.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

 {/* =========================================================
    TRUSTED BY LEADING UNIVERSITIES
========================================================= */}

<section
  className="
    relative
    overflow-hidden
    bg-white
    py-9

    sm:py-10

    md:py-11

    lg:py-12
  "
>
  <div
    className="
      mx-auto
      w-full
      max-w-[1200px]
      px-4

      sm:px-6

      md:px-8

      lg:px-10

      xl:px-12
    "
  >
    {/* =====================================================
        SECTION HEADING
    ===================================================== */}

    <motion.div
      initial={{
        opacity: 0,
        y: 16,
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
        mx-auto
        text-center
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
                lg:text-[26px]]
        "
      >
        Trusted by Leading Universities Worldwide
      </h2>

      {/* ORANGE UNDERLINE */}

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

      <p
        className="
          mx-auto
          mt-3
          max-w-[420px]
          text-[12px]
          font-medium
          leading-[1.65]
          text-[#6D788B]

          sm:text-[12.5px]

          md:text-[13px]
        "
      >
        Join a growing community of universities that trust Technical Journals
        for their scholarly publishing needs.
      </p>
    </motion.div>


    {/* =====================================================
        UNIVERSITY GRID
    ===================================================== */}

    <div
      className="
        mx-auto
        mt-7
        grid
        w-full
        grid-cols-1
        gap-[12px]

        min-[480px]:grid-cols-2

        md:gap-[10px]

        lg:grid-cols-4
        lg:gap-[10px]
      "
    >
      {UNIVERSITIES.map((u, index) => (
        <motion.article
          key={u.name}
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.985,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.48,
            delay: index * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            y: -5,
          }}
          className="
            group
            relative
            flex
            min-h-[178px]
            w-full
            flex-col
            items-center
            justify-center
            overflow-hidden
            rounded-[4px]
            border
            border-[#E8ECF2]
            bg-white
            px-4
            pb-[10px]
            pt-[10px]
            text-center
            shadow-[0_2px_8px_rgba(21,48,92,0.025)]
            transition-[border-color,box-shadow,background-color]
            duration-300
            ease-out

            hover:border-[#C9D9F3]
            hover:bg-[#FFFFFF]
            hover:shadow-[0_10px_26px_rgba(16,45,99,0.085)]

            sm:min-h-[182px]

            lg:min-h-[184px]
          "
        >
        


        

          <div
            className="
              flex
              h-[48px]
              w-full
              items-center
              justify-center

              sm:h-[50px]

              lg:h-[59px]
            "
          >
            <img
              src={u.logo}
              alt={`${u.name} logo`}
              loading="lazy"
              draggable="false"
              className="
                block
                max-h-[49px]
                max-w-[175px]
                object-contain
                object-center
                transition-transform
                duration-500
                ease-out

                group-hover:scale-[1.045]

                sm:max-h-[49px]
                sm:max-w-[180px]

                lg:max-h-[55px]
                lg:max-w-[190px]
              "
            />
          </div>
 <h3
            className="
              mt-[12px]
              max-w-[175px]
              text-[11.5px]
              font-bold
              leading-[1.35]
              tracking-[-0.012em]
              text-[#132D59]
              transition-colors
              duration-300

              group-hover:text-[#155FC4]

              sm:text-[11.5px]

              lg:text-[12px]
            "
          >
            {u.name}
          </h3>


          {/* COUNTRY */}

          <p
            className="
              mt-[4px]
              text-[10px]
              font-medium
              leading-none
              text-[#7F8998]

              sm:text-[10.2px]
            "
          >
            {u.country}
          </p>


          {/* JOURNAL COUNT */}

          <span
            className="
              mt-[12px]
              inline-flex
              min-h-[19px]
              min-w-[55px]
              items-center
              justify-center
              rounded-full
              bg-[#F3F6FA]
              px-[10px]
              py-[4px]
              text-[8.5px]
              font-bold
              leading-none
              text-[#53647D]
              transition-all
              duration-300

              group-hover:bg-[#EBF3FF]
              group-hover:text-[#1763C9]

              sm:text-[9.8px]
            "
          >
            {u.journals} Journals
          </span>


          {/* SOFT BACKGROUND GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -bottom-[45px]
              left-1/2
              h-[70px]
              w-[130px]
              -translate-x-1/2
              rounded-full
              bg-[#1763D7]/[0.04]
              opacity-0
              blur-[22px]
              transition-opacity
              duration-500

              group-hover:opacity-100
            "
          />
        </motion.article>
      ))}
    </div>


  
  </div>
</section>


     

    {/* =========================================================
    WHY UNIVERSITIES CHOOSE TECHNICAL JOURNALS
========================================================= */}

<section
  className="
    relative
    overflow-hidden
    bg-white
    py-4

  
  "
>
  <div
    className="
      mx-auto
      w-full
      max-w-[1200px]
      px-4

      sm:px-6

      md:px-8

      lg:px-8

     
    "
  >

    {/* =====================================================
        SECTION HEADING
    ===================================================== */}

    <motion.div
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
        amount: 0.3,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center"
    >
      <h2
        className="
           text-[21px]
                font-[600]
                leading-tight
                tracking-[-0.025em]
                text-[#08245A]
      
                sm:text-[24px]
                lg:text-[26px]]
        "
      >
        Why Universities Choose Technical Journals
      </h2>
  {/* ORANGE UNDERLINE */}

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


    {/* =====================================================
        WHY ITEMS
    ===================================================== */}

    <div
      className="
        mt-7
        grid
        grid-cols-1

        sm:grid-cols-2

        md:grid-cols-3

        lg:grid-cols-5
      "
    >
      {WHY.map((item, index) => (
        <motion.div
          key={item.title}
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.45,
            delay: index * 0.055,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`
            group
            relative
            flex
            min-h-[92px]
            items-start
            gap-[11px]
            px-4
            py-3

            transition-all
            duration-300
            ease-out

            hover:-translate-y-[2px]

            ${
              index !== WHY.length - 1
                ? "lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:h-[52px] lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-[#E5E9F0]"
                : ""
            }

            sm:px-5

            lg:px-5

            xl:px-6
          `}
        >

          {/* =================================================
              ICON
          ================================================= */}

          <div
            className={`
              ${item.iconBg}
              ${item.iconColor}
              ${item.hoverBg}

              flex
              h-[43px]
              w-[43px]
              shrink-0
              items-center
              justify-center
              rounded-full

              transition-all
              duration-300
              ease-out

              group-hover:-translate-y-[2px]
              group-hover:scale-[1.08]

              sm:h-[44px]
              sm:w-[44px]

              lg:h-[45px]
              lg:w-[45px]
            `}
          >
            <Icon
              name={item.icon}
              className="
                h-[19px]
                w-[19px]
                stroke-[2.2]

                sm:h-[20px]
                sm:w-[20px]
              "
            />
          </div>


          {/* =================================================
              CONTENT
          ================================================= */}

          <div
            className="
              min-w-0
              flex-1
              pt-[1px]
            "
          >
            <h3
              className="
                text-[13px]
                font-bold
                leading-[1.25]
                tracking-[-0.015em]
                text-[#102D63]

                transition-colors
                duration-300

                group-hover:text-[#145FCC]

                sm:text-[13px]

                lg:text-[13.2px]

                xl:text-[13.5px]
              "
            >
              {item.title}
            </h3>


            <p
              className="
                mt-[7px]
                max-w-[155px]
                text-[10.5px]
                font-medium
                leading-[1.65]
                text-[#637188]

                sm:max-w-[165px]
                sm:text-[10.2px]

                lg:max-w-[155px]
                lg:text-[10.5px]

               
              "
            >
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


   {/* =========================================================
    OUR PLATFORM FEATURES
========================================================= */}

<section
  className="
    relative
    overflow-hidden
    bg-white
    py-8

    
  "
>
  <div
    className="
      mx-auto
      w-full
      max-w-[1200px]
      px-4

      sm:px-6

      md:px-8

      lg:px-12

     
    "
  >
    {/* =====================================================
        HEADING
    ===================================================== */}

    <motion.div
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
        amount: 0.3,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center"
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
        Our Platform Features
      </h2>

      {/* MULTI COLOR LINE */}

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


    {/* =====================================================
        FEATURE CARDS
    ===================================================== */}

    <div
      className="
        mt-6
        grid
        grid-cols-1
        gap-[12px]

        min-[480px]:grid-cols-2

        md:grid-cols-3

        lg:grid-cols-6
        lg:gap-[10px]
      "
    >
      {PLATFORM_FEATURES.map((feature, index) => (
        <motion.article
          key={feature.title}
          initial={{
            opacity: 0,
            y: 16,
            scale: 0.985,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.45,
            delay: index * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            y: -5,
          }}
          className="
            group
            relative
            flex
            min-h-[185px]
            flex-col
            items-center
            overflow-hidden
            rounded-[7px]
            border
            border-[#E5E9F0]
            bg-white
            px-[10px]
            pb-[18px]
            pt-[18px]
            text-center

            shadow-[0_2px_8px_rgba(24,54,95,0.025)]

            transition-[border-color,box-shadow,background-color]
            duration-300
            ease-out

            hover:border-[#C8D7EF]
            hover:bg-[#FFFFFF]
            hover:shadow-[0_12px_28px_rgba(26,59,108,0.09)]

            sm:min-h-[190px]

            lg:min-h-[195px]
          "
        >
          


          {/* =================================================
              ICON AREA
          ================================================= */}

          <div
            className="
              flex
              h-[58px]
              w-full
              items-center
              justify-center
            "
          >
            {feature.customText === "boi" ? (
              <div
                className="
                  flex
                  h-[39px]
                  w-[39px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F79013]
                  text-[16px]
                  font-bold
                  lowercase
                  leading-none
                  text-white

                  transition-all
                  duration-300
                  ease-out

                  group-hover:scale-[1.08]
                "
              >
                boi
              </div>
            ) : (
              <div
                className={`
                  ${feature.iconBg}
                  ${feature.iconColor}

                  flex
                  h-[44px]
                  w-[44px]
                  items-center
                  justify-center
                  rounded-[8px]

                  transition-all
                  duration-300
                  ease-out

                  group-hover:-translate-y-[2px]
                  group-hover:scale-[1.08]
                `}
              >
                <Icon
                  name={feature.icon}
                  className="
                    h-[23px]
                    w-[23px]
                    stroke-[2]

                    sm:h-[24px]
                    sm:w-[24px]
                  "
                />
              </div>
            )}
          </div>


          {/* =================================================
              TITLE
          ================================================= */}

          <h3
            className="
              mt-[10px]
              text-[13.5px]
              font-bold
              leading-[1.3]
              tracking-[-0.012em]
              text-[#102D63]

              transition-colors
              duration-300

              group-hover:text-[#145FC8]

              sm:text-[13.5px]

              lg:text-[14px]

             
            "
          >
            {feature.title}
          </h3>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              mx-auto
              mt-[8px]
              max-w-[132px]
              text-[12px]
              font-medium
              leading-[1.65]
              text-[#647086]

              sm:max-w-[145px]
              sm:text-[12px]

              lg:max-w-[125px]
              lg:text-[12px]

          
            "
          >
            {feature.desc}
          </p>


          {/* SOFT HOVER GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -bottom-[40px]
              left-1/2
              h-[65px]
              w-[115px]
              -translate-x-1/2
              rounded-full
              bg-[#1768D7]/[0.035]
              opacity-0
              blur-[20px]

              transition-opacity
              duration-500

              group-hover:opacity-100
            "
          />
        </motion.article>
      ))}
    </div>
  </div>
</section>


{/* =========================================================
    CTA SECTION
========================================================= */}

<section
  className="
    mx-auto
    w-full
    max-w-[1280px]
    px-4
    pb-4

    sm:px-6

    lg:px-12
  "
>
  <motion.div
    initial={{
      opacity: 0,
      y: 18,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
    }}
    viewport={{
      once: true,
      amount: 0.2,
    }}
    transition={{
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      relative
      overflow-hidden
      rounded-[10px]
      border
      border-[#172E7A]
      bg-[#071858]
      text-white
      shadow-[0_8px_24px_rgba(7,24,88,0.14)]
    "
  >
    <div
      className="
        relative
        z-10
        flex
        min-h-[145px]
        flex-col
        items-center
        gap-6
        px-5
        py-6

        sm:px-7

        md:items-stretch
        md:px-6
        md:py-5

        lg:min-h-[130px]
        lg:flex-row
        lg:items-center
        lg:justify-between
        lg:gap-5
        lg:px-5
        lg:py-0
      "
    >
      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <div
        className="
          flex
          w-full
          flex-col
          items-center
          gap-4

          sm:flex-row
          sm:items-center

          md:flex-1

          lg:w-auto
          lg:min-w-0
        "
      >
        {/* CTA IMAGE */}

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex
            h-[88px]
            w-[145px]
            shrink-0
            items-center
            justify-center

            sm:h-[96px]
            sm:w-[155px]

            md:h-[100px]
            md:w-[160px]

            lg:h-[115px]
            lg:w-[170px]
          "
        >
          <img
            src={ctaImg}
            alt="University research publishing"
            draggable="false"
            className="
              block
              h-full
              w-full
              select-none
              object-contain
              object-center
            "
          />
        </motion.div>

        {/* TEXT */}

        <div
          className="
            min-w-0
            flex-1
            text-center

            sm:text-left
          "
        >
          <h2
            className="
              text-[21px]
              font-semibold
              leading-[1.25]
              tracking-[-0.02em]
              text-white

              sm:text-[21px]

              md:text-[21px]

              lg:text-[22px]
            "
          >
            Ready to Elevate Your University's Research?
          </h2>

          <p
            className="
              mx-auto
              mt-[12px]
              max-w-[350px]
              text-[12px]
              font-medium
              leading-[1.6]
              text-[#d7dbe6]

              sm:mx-0
              sm:text-[12px]

              lg:text-[13px]
            "
          >
            Host your journal on a platform trusted by universities
            worldwide and make an impact.
          </p>
        </div>
      </div>

      {/* =====================================================
          BUTTONS
      ===================================================== */}

      <div
        className="
          flex
          w-full
          flex-col
          gap-[22px]

          min-[480px]:w-auto
          min-[480px]:flex-row

          md:ml-auto
          md:shrink-0
          md:self-end

          lg:ml-0
          lg:self-auto
      "
      >
        {/* HOST YOUR JOURNAL */}

        <Link
          to="/register"
          className="
            group
            inline-flex
            h-[39px]
            min-w-[120px]
            items-center
            justify-center
            rounded-[5px]
            border
            border-white
            bg-white
            px-[18px]
            text-[13px]
            font-bold
            text-[#155DC8]
            shadow-[0_3px_10px_rgba(255,255,255,0.10)]
            transition-all
            duration-300
            ease-out

            hover:-translate-y-[2px]
            hover:bg-[#F2F6FF]
            hover:text-[#0D4FB6]
            hover:shadow-[0_8px_18px_rgba(255,255,255,0.16)]

            sm:min-w-[128px]
            sm:text-[13.5px]

            lg:h-[40px]
            lg:min-w-[135px]
          "
        >
          <span
            className="
              transition-transform
              duration-300

              group-hover:scale-[1.02]
            "
          >
            Host Your Journal
          </span>
        </Link>

        {/* REQUEST DEMO */}

        <Link
          to="/contact"
          className="
            group
            inline-flex
            h-[39px]
            min-w-[120px]
            items-center
            justify-center
            rounded-[5px]
            border
            border-[#D8E3FF]
            bg-transparent
            px-[18px]
            text-[13px]
            font-bold
            text-white
            transition-all
            duration-300
            ease-out

            hover:-translate-y-[2px]
            hover:border-white
            hover:bg-white/[0.08]
            hover:shadow-[0_8px_18px_rgba(0,0,0,0.10)]

            sm:min-w-[128px]
            sm:text-[13.5px]

            lg:h-[40px]
            lg:min-w-[135px]
          "
        >
          <span
            className="
              transition-transform
              duration-300

              group-hover:scale-[1.02]
            "
          >
            Request a Demo
          </span>
        </Link>
      </div>
    </div>
  </motion.div>
</section>
    </>
  );
}