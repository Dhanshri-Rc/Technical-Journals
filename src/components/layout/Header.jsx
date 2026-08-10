import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  LogIn,
  Menu,
  Search,
  UserPlus,
  X,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { NAV_LINKS, SITE } from "../../data/site";
import logo from "../../assets/images/TechnicalLogo.png";
import SearchModal from "../common/SearchModal";

const desktopLinkVariants = {
  initial: { y: 0 },
  hover: { y: -2 },
};

const mobileMenuVariants = {
  hidden: {
    x: "100%",
    opacity: 0.7,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 32,
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
  exit: {
    x: "100%",
    opacity: 0.7,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const mobileLinkVariants = {
  hidden: {
    opacity: 0,
    x: 24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const location = useLocation();

  // Add navbar shadow after scrolling.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Escape key support.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling while the drawer is open.
  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-200 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            : "border-slate-100 bg-white"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:h-[78px] sm:px-6 lg:px-8 ">
          {/* Logo */}
          <Link
            to="/"
            className="group flex min-w-0 shrink-0 items-center"
            aria-label={`${SITE.name} home`}
          >
            <motion.img
              src={logo}
              alt={`${SITE.name} logo`}
              className="h-10 w-auto max-w-[180px] object-contain sm:h-14 sm:max-w-[220px]"
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden items-center  lg:flex"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => (
              <motion.div
                key={link.to}
                variants={desktopLinkVariants}
                initial="initial"
                whileHover="hover"
              >
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `group relative inline-flex h-11 items-center rounded-lg px-3 text-[14px] font-semibold transition-colors duration-200 xl:px-4 ${
                      isActive
                        ? " text-blue-700"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>

                      <span
                        className={`absolute bottom-1.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-blue-700 transition-all duration-300 ${
                          isActive
                            ? "w-[calc(100%-24px)]"
                            : "w-0 group-hover:w-[calc(100%-24px)]"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex xl:gap-3">
           

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/login"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-blue-600 px-4 text-sm font-semibold text-blue-700 transition-all duration-200 hover:bg-blue-50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/register"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(29,78,216,0.2)] transition-all duration-200 hover:bg-blue-800 hover:shadow-[0_10px_24px_rgba(29,78,216,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </motion.div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1.5 lg:hidden">
           

            <motion.button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              whileTap={{ scale: 0.9 }}
              className="grid h-10 w-10 place-items-center rounded-lg bg-blue-700 text-white shadow-sm transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Dark overlay */}
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="absolute inset-0 cursor-default bg-slate-950/45 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobileMenu}
            />

            {/* Right-side drawer */}
            <motion.aside
              id="mobile-menu"
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-[280px] flex-col bg-white shadow-[-20px_0_60px_rgba(15,23,42,0.2)]"
            >
              {/* Drawer header */}
              <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200 px-5 sm:h-[78px]">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  aria-label={`${SITE.name} home`}
                >
                  <img
                    src={logo}
                    alt={`${SITE.name} logo`}
                    className="h-10 w-auto max-w-[190px] object-contain"
                  />
                </Link>

                <motion.button
                  type="button"
                  onClick={closeMobileMenu}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Navigation links */}
              <nav
                className="flex-1 overflow-y-auto px-4 py-5"
                aria-label="Mobile navigation"
              >
                <motion.div className="space-y-1">
                  {NAV_LINKS.map((link) => (
                    <motion.div
                      key={link.to}
                      variants={mobileLinkVariants}
                    >
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          `group flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold transition-all duration-200 ${
                            isActive
                              ? "bg-blue-700 text-white shadow-[0_8px_18px_rgba(29,78,216,0.2)]"
                              : "text-slate-700 hover:translate-x-1 hover:bg-blue-50 hover:text-blue-700"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span>{link.label}</span>

                            <ChevronRight
                              className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 ${
                                isActive
                                  ? "text-white"
                                  : "text-slate-400 group-hover:text-blue-700"
                              }`}
                            />
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  ))}
                </motion.div>
              </nav>

              {/* Mobile actions */}
              <motion.div
                variants={mobileLinkVariants}
                className="shrink-0 border-t border-slate-200 bg-slate-50/80 p-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-blue-600 bg-white text-sm font-semibold text-blue-700 transition-all hover:bg-blue-50 active:scale-[0.98]"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-700 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-800 active:scale-[0.98]"
                  >
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Link>
                </div>
              </motion.div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}