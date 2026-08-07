import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Search, LogIn, UserPlus } from "lucide-react";
import { NAV_LINKS, SITE } from "../../data/site";
import logo from "../../assets/logos/logo.png";
import SearchModal from "../common/SearchModal";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label={`${SITE.name} home`}>
            <img src={logo} alt={`${SITE.name} logo`} className="h-11 w-auto object-contain" />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-bold text-[#0a1a3f] text-lg tracking-tight">
                TECHNICAL <span className="text-orange-500">JOURNALS</span>
              </span>
              <span className="text-[10px] text-slate-500 tracking-wide mt-0.5">
                JOURNAL HOSTING PLATFORM
                <span className="mx-1">—</span>
                <span className="text-blue-700">EXCLUSIVE TO UNIVERSITIES</span>
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors pb-1 border-b-2 ${
                    isActive
                      ? "text-blue-700 border-blue-700"
                      : "text-slate-700 border-transparent hover:text-blue-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-blue-700 transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" strokeWidth={2} />
            </button>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-md border border-blue-600 text-blue-700 hover:bg-blue-50 transition-colors"
            >
              <LogIn className="w-4 h-4" /> Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-colors"
            >
              <UserPlus className="w-4 h-4" /> Register
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" ref={menuRef} className="lg:hidden border-t border-slate-100 bg-white">
          <nav className="px-4 py-3 flex flex-col" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-sm font-medium border-b border-slate-100 ${
                    isActive ? "text-blue-700" : "text-slate-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex gap-3 mt-4">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center text-sm font-medium px-4 py-2.5 rounded-md border border-blue-600 text-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center text-sm font-medium px-4 py-2.5 rounded-md bg-blue-700 text-white"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
