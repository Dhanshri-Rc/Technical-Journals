import { Link } from "react-router-dom";
import { FacebookIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "../ui/SocialIcons";
import logo from "../../assets/logos/logo.png";
import { SITE, FOOTER_LINKS } from "../../data/site";

export default function Footer() {
  return (
    <footer className="bg-[#0a1a3f] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <img src={logo} alt={`${SITE.name} logo`} className="h-9 w-auto object-contain" />
            <span className="font-display font-bold text-white text-sm leading-tight">
              TECHNICAL<br />JOURNALS
            </span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            A secure, scalable, and feature-rich platform exclusively for hosting peer-reviewed journals of universities worldwide.
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { Icon: FacebookIcon, href: SITE.social.facebook, label: "Facebook" },
              { Icon: LinkedinIcon, href: SITE.social.linkedin, label: "LinkedIn" },
              { Icon: TwitterIcon, href: SITE.social.twitter, label: "Twitter" },
              { Icon: YoutubeIcon, href: SITE.social.youtube, label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-600 text-slate-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Quick Links" links={FOOTER_LINKS.quickLinks} />
        <FooterCol title="Resources" links={FOOTER_LINKS.resources} />
        <FooterCol title="Support" links={FOOTER_LINKS.support} />

        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wide">Our Commitment</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            We are committed to advancing knowledge and supporting sustainable development goals through research.
          </p>
          <Link to="/sdg-commitment" className="inline-block">
            <span className="text-xs font-bold tracking-wide bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
              SUSTAINABLE DEVELOPMENT GOALS
            </span>
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-700/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4 text-sm tracking-wide">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-slate-400 hover:text-white transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
