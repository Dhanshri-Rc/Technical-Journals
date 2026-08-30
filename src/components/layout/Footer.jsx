import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../ui/SocialIcons";

import logo from "../../assets/images/foot.png";

import {
  SITE,
  FOOTER_LINKS,
  CONTACT_INFO,
} from "../../data/site";


/* =========================================================
   SOCIAL LINKS
========================================================= */

const socialLinks = [
  {
    Icon: FacebookIcon,
    key: "facebook",
    label: "Facebook",
  },
  {
    Icon: LinkedinIcon,
    key: "linkedin",
    label: "LinkedIn",
  },
  {
    Icon: TwitterIcon,
    key: "twitter",
    label: "Twitter",
  },
  {
    Icon: YoutubeIcon,
    key: "youtube",
    label: "YouTube",
  },
];


/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-[#071936]
        text-white
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND DECORATION
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-[120px]
          top-[10px]
          h-[300px]
          w-[300px]
          rounded-full
          bg-[#1457ba]/[0.06]
          blur-[90px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-[100px]
          bottom-[10px]
          h-[280px]
          w-[280px]
          rounded-full
          bg-[#1457ba]/[0.05]
          blur-[90px]
        "
      />


      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1440px]
          px-5
          py-9

          sm:px-7
          sm:py-10

          md:px-8

          lg:px-10
          lg:py-4

          xl:px-14
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-x-7
            gap-y-10

            sm:grid-cols-2

            md:grid-cols-3

            lg:grid-cols-[minmax(220px,1.35fr)_minmax(120px,0.8fr)_minmax(145px,0.95fr)_minmax(120px,0.8fr)_minmax(220px,1.3fr)]
            lg:gap-x-0
            lg:gap-y-0
          "
        >

          {/* =================================================
              LOGO + DESCRIPTION
          ================================================= */}

          <div
            className="
              min-w-0

              sm:col-span-2

              md:col-span-3

              lg:col-span-1
              lg:pr-7

              xl:pr-9
            "
          >
            <Link
              to="/"
              aria-label={`${SITE.name} home`}
              className="
                inline-flex
                rounded-md

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-400
              "
            >
              <img
                src={logo}
                alt={`${SITE.name} logo`}
                className="
                  h-auto
                  w-full
                  max-w-[155px]
                  object-contain

                  sm:max-w-[165px]
                "
              />
            </Link>


            <p
              className="
                mt-3
                max-w-[280px]
                text-[12px]
                font-normal
                leading-[1.7]
                text-slate-300

                sm:text-[13px]
              "
            >
              A secure, scalable, and feature-rich platform exclusively for
              hosting peer-reviewed journals of universities worldwide.
            </p>


            {/* SOCIAL ICONS */}

            <div
              className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-2.5
              "
            >
              {socialLinks.map(({ Icon, key, label }) => {
                const href = SITE.social?.[key];

                if (!href) return null;

                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="
                      group
                      grid
                      h-8
                      w-8
                      shrink-0
                      place-items-center
                      rounded-full
                      border
                      border-white/10
                      bg-[#1457ba]
                      text-white

                      transition-all
                      duration-300

                      hover:-translate-y-[2px]
                      hover:border-blue-300/40
                      hover:bg-blue-500
                      hover:shadow-[0_6px_15px_rgba(37,99,235,0.3)]

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-blue-400
                    "
                  >
                    <Icon
                      className="
                        h-[15px]
                        w-[15px]
                        transition-transform
                        duration-300

                        group-hover:scale-110
                      "
                    />
                  </a>
                );
              })}
            </div>
          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <FooterSection>
            <FooterCol
              title="Quick Links"
              links={FOOTER_LINKS.quickLinks}
            />
          </FooterSection>


          {/* =================================================
              RESOURCES
          ================================================= */}

          <FooterSection>
            <FooterCol
              title="Resources"
              links={FOOTER_LINKS.resources}
            />
          </FooterSection>


          {/* =================================================
              SUPPORT
          ================================================= */}

          <FooterSection>
            <FooterCol
              title="Support"
              links={FOOTER_LINKS.support}
            />
          </FooterSection>


          {/* =================================================
              GET IN TOUCH
          ================================================= */}

          <FooterSection
            className="
              sm:col-span-2

              md:col-span-1

              lg:col-span-1
            "
            showDivider={false}
          >
            <div
              className="
                min-w-0
                w-full
              "
            >
              <FooterHeading>
                Get in Touch
              </FooterHeading>


              <ul
                className="
                  mt-5
                  space-y-4
                  text-[12px]
                  leading-[1.6]
                  text-slate-300

                  sm:text-[13px]
                "
              >

                {/* =============================================
                    ADDRESS
                ============================================= */}

                <li
                  className="
                    group
                    flex
                    min-w-0
                    items-start
                    gap-3
                  "
                >
                  <span
                    className="
                      mt-[1px]
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.04]
                      text-[#4388ed]

                      transition-all
                      duration-300

                      group-hover:border-[#1457ba]/60
                      group-hover:bg-[#1457ba]
                      group-hover:text-white
                      group-hover:shadow-[0_5px_14px_rgba(20,87,186,0.35)]
                    "
                  >
                    <MapPin
                      className="
                        h-4
                        w-4
                      "
                    />
                  </span>

                  <span
                    className="
                      min-w-0
                      flex-1
                      break-words
                      leading-[1.65]

                      transition-colors
                      duration-300

                      group-hover:text-white
                    "
                  >
                    {CONTACT_INFO.address}
                  </span>
                </li>


                {/* =============================================
                    EMAIL
                ============================================= */}

                <li className="min-w-0">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="
                      group
                      flex
                      min-w-0
                      items-center
                      gap-3

                      transition-colors
                      duration-300

                      hover:text-white
                    "
                  >
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.04]
                        text-[#4388ed]

                        transition-all
                        duration-300

                        group-hover:border-[#1457ba]/60
                        group-hover:bg-[#1457ba]
                        group-hover:text-white
                        group-hover:shadow-[0_5px_14px_rgba(20,87,186,0.35)]
                      "
                    >
                      <Mail
                        className="
                          h-4
                          w-4
                        "
                      />
                    </span>

                    <span
                      className="
                        min-w-0
                        flex-1
                        break-all
                        transition-colors
                        duration-300
                      "
                    >
                      {CONTACT_INFO.email}
                    </span>
                  </a>
                </li>


                {/* =============================================
                    PHONE
                ============================================= */}

                <li className="min-w-0">
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="
                      group
                      flex
                      min-w-0
                      items-center
                      gap-3

                      transition-colors
                      duration-300

                      hover:text-white
                    "
                  >
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.04]
                        text-[#4388ed]

                        transition-all
                        duration-300

                        group-hover:border-[#1457ba]/60
                        group-hover:bg-[#1457ba]
                        group-hover:text-white
                        group-hover:shadow-[0_5px_14px_rgba(20,87,186,0.35)]
                      "
                    >
                      <Phone
                        className="
                          h-4
                          w-4
                        "
                      />
                    </span>

                    <span
                      className="
                        min-w-0
                        flex-1
                        whitespace-normal
                        transition-colors
                        duration-300
                      "
                    >
                      {CONTACT_INFO.phone}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </FooterSection>
        </div>
      </div>


      {/* =====================================================
          COPYRIGHT
      ===================================================== */}

      <div
        className="
          relative
          border-t
          border-white/10
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-[44px]
            max-w-[1440px]
            items-center
            justify-center
            px-5
            py-3
            text-center
            text-[11px]
            leading-[1.5]
            text-slate-400

            sm:px-7
            sm:text-[12px]

            lg:px-10

            xl:px-14
          "
        >
          © {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}


/* =========================================================
   FOOTER SECTION
========================================================= */

function FooterSection({
  children,
  className = "",
  showDivider = true,
}) {
  return (
    <div
      className={`
        relative
        min-w-0
        w-full

        lg:px-5

        xl:px-6

        ${className}
      `}
    >
      {/* DESKTOP VERTICAL SEPARATOR */}

      {showDivider && (
        <span
          className="
            pointer-events-none
            absolute
            bottom-[6px]
            right-0
            top-[6px]
            hidden
            w-px
            bg-white/[0.08]

            lg:block
          "
        />
      )}

      {children}
    </div>
  );
}


/* =========================================================
   FOOTER HEADING
========================================================= */

function FooterHeading({ children }) {
  return (
    <h3
      className="
        relative
        mb-5
        inline-block
        text-[13px]
        font-semibold
        tracking-[-0.01em]
        text-white

        sm:text-[14px]
      "
    >
      {children}

      <span
        className="
          absolute
          -bottom-[7px]
          left-0
          h-[2px]
          w-7
          rounded-full
          bg-blue-500
        "
      />
    </h3>
  );
}


/* =========================================================
   FOOTER LINK COLUMN
========================================================= */

function FooterCol({
  title,
  links = [],
}) {
  return (
    <div
      className="
        min-w-0
        w-full
      "
    >
      <FooterHeading>
        {title}
      </FooterHeading>

      <ul
        className="
          space-y-1
        "
      >
        {links.map((link) => (
          <li
            key={`${title}-${link.to}-${link.label}`}
            className="
              min-w-0
              w-full
            "
          >
            <Link
              to={link.to}
              className="
                group
                relative
                inline
                break-words
                py-1
                text-[12px]
                font-normal
                leading-[1.7]
                text-slate-300

                transition-colors
                duration-200

                hover:text-white

                focus-visible:rounded-sm
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-400

                sm:text-[13px]
              "
            >
              {link.label}

              <span
                className="
                  absolute
                  -bottom-[2px]
                  left-0
                  h-px
                  w-0
                  bg-blue-400

                  transition-[width]
                  duration-300
                  ease-out

                  group-hover:w-full
                "
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}