import { Link } from "react-router-dom";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../ui/SocialIcons";

import logo from "../../assets/images/foot.png";
import sdgGoals from "../../assets/images/fsidelogo.png";
import { SITE, FOOTER_LINKS } from "../../data/site";

const socialLinks = [
  { Icon: FacebookIcon, key: "facebook", label: "Facebook" },
  { Icon: LinkedinIcon, key: "linkedin", label: "LinkedIn" },
  { Icon: TwitterIcon, key: "twitter", label: "Twitter" },
  { Icon: YoutubeIcon, key: "youtube", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a1a3f] text-white">
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-blue-500/10 blur-[90px]"
      />

      {/* Main footer */}
      <div className="relative mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-7 lg:px-10 lg:py-8 xl:px-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.9fr_0.9fr_0.9fr_1.35fr] lg:items-start lg:gap-0">
          {/* Logo and description */}
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-8">
            <Link
              to="/"
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label={`${SITE.name} home`}
            >
              <img
                src={logo}
                alt={`${SITE.name} logo`}
                className="h-auto w-full max-w-[155px] object-contain"
              />
            </Link>

            <p className="mt-3 max-w-[270px] text-[13px] leading-[1.6] text-slate-300">
              A secure, scalable, and feature-rich platform exclusively for
              hosting peer-reviewed journals of universities worldwide.
            </p>

            <div className="mt-4 flex items-center gap-2.5">
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
                    className="group grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-[#1457ba] text-white transition-[background-color,border-color,box-shadow] duration-200 hover:border-blue-300/40 hover:bg-blue-500 hover:shadow-[0_5px_14px_rgba(37,99,235,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <Icon className="h-[15px] w-[15px] transition-opacity duration-200 group-hover:opacity-90" />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterSection>
            <FooterCol
              title="Quick Links"
              links={FOOTER_LINKS.quickLinks}
            />
          </FooterSection>

          <FooterSection>
            <FooterCol
              title="Resources"
              links={FOOTER_LINKS.resources}
            />
          </FooterSection>

          <FooterSection>
            <FooterCol
              title="Support"
              links={FOOTER_LINKS.support}
            />
          </FooterSection>

          {/* Our Commitment */}
          <FooterSection className="sm:col-span-2 lg:col-span-1">
            <FooterHeading>Our Commitment</FooterHeading>

            <p className="max-w-[270px] text-[13px] leading-[1.6] text-slate-300">
              We are committed to advancing knowledge and supporting
              sustainable development goals through research.
            </p>

            <Link
              to="/sdg-commitment"
              className="group  inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="View Sustainable Development Goals"
            >
              <img
                src={sdgGoals}
                alt="Sustainable Development Goals"
                className="h-auto w-full max-w-[205px] -mt-4 -ml-4 object-contain opacity-95 transition-[opacity,filter] duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_5px_10px_rgba(0,0,0,0.2)]"
              />
            </Link>
          </FooterSection>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex min-h-[42px] max-w-[1440px] items-center justify-center px-5 py-2 text-center text-[12px] text-slate-400">
          © {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

/* Short vertical separator */
function FooterSection({ children, className = "" }) {
  return (
    <div className={`relative lg:px-7 xl:px-8 ${className}`}>
      <span
        aria-hidden="true"
        className="absolute left-0 top-6 hidden h-[190px] w-px bg-white/15 lg:block"
      />

      {children}
    </div>
  );
}

function FooterHeading({ children }) {
  return (
    <h3 className="relative mb-4 inline-block text-[14px] font-[550] tracking-[0.01em] text-white">
      {children}

      <span className="absolute -bottom-1.5 left-0 h-[2px] w-7 rounded-full bg-blue-500" />
    </h3>
  );
}

function FooterCol({ title, links = [] }) {
  return (
    <div>
      <FooterHeading>{title}</FooterHeading>

      <ul className="space-y-1.5">
        {links.map((link) => (
          <li key={`${title}-${link.to}-${link.label}`}>
            <Link
              to={link.to}
              className="group relative inline-block py-0.5 text-[13px] leading-2 text-slate-300 transition-colors duration-200 hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              {link.label}

              {/* Professional underline hover */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-blue-400 transition-[width] duration-300 ease-out group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}