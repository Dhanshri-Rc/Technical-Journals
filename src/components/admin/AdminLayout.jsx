import { useState } from "react";

import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Landmark,
  Mail,
  FileText,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Settings,
} from "lucide-react";

import {
  logoutUser,
  getSessionUser,
} from "../../services/authService";

import logo from "../../assets/images/technical-journals-footer-academic-publishing-background.webp";

/* ======================================================
   ADMIN SIDEBAR NAVIGATION
====================================================== */

const NAV_ITEMS = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/admin/journals",
    label: "Journals",
    icon: BookOpen,
  },
  {
    to: "/admin/conferences",
    label: "Conferences",
    icon: CalendarDays,
  },
  {
    to: "/admin/universities",
    label: "Universities",
    icon: Landmark,
  },
  {
    to: "/admin/manuscripts",
    label: "Manuscripts",
    icon: FileText,
  },
  {
    to: "/admin/enquiries",
    label: "Enquiries",
    icon: Mail,
  },
  {
    to: "/admin/footer-settings",
    label: "Footer Settings",
    icon: Settings,
  },
];

/* ======================================================
   ADMIN LAYOUT
====================================================== */

export default function AdminLayout() {
  const navigate = useNavigate();

  const user =
    getSessionUser();

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  /* ====================================================
     LOGOUT
  ==================================================== */

  function handleLogout() {
    logoutUser();

    setSidebarOpen(false);

    navigate("/login", {
      replace: true,
    });
  }

  /* ====================================================
     CLOSE SIDEBAR
  ==================================================== */

  function closeSidebar() {
    setSidebarOpen(false);
  }

  /* ====================================================
     UI
  ==================================================== */

  return (
    <div
      className="
        min-h-screen
        bg-[#F4F7FB]
      "
    >

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={
            closeSidebar
          }
          className="
            fixed
            inset-0
            z-[80]
            bg-slate-950/55
            backdrop-blur-[1px]

            lg:hidden
          "
        />
      )}

      {/* =================================================
          FIXED SIDEBAR
      ================================================= */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-[90]

          flex
          h-screen
          w-[250px]
          shrink-0
          flex-col

          overflow-hidden

          bg-[#0F172A]
          text-slate-200

          shadow-[5px_0_20px_rgba(15,23,42,0.10)]

          transition-transform
          duration-300
          ease-in-out

          sm:w-[210px]

          lg:w-[216px]
          lg:translate-x-0

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* ===============================================
            LOGO / BRAND
        =============================================== */}

        <div
          className="
            flex
            min-h-[76px]
            shrink-0
            items-center
            justify-between

            border-b
            border-slate-800

            px-3
            py-3

            sm:px-4
          "
        >

          {/* LOGO */}

          <Link
            to="/admin"
            onClick={
              closeSidebar
            }
            className="
              flex
              min-w-0
              flex-1
              items-center
              justify-center

              lg:justify-start
            "
          >
            <img
              src={logo}
              alt="Technical Journals"
              draggable="false"
              className="
                block
                h-auto
                w-auto
                object-contain

                max-h-[45px]
                max-w-[165px]

                sm:max-h-[47px]
                sm:max-w-[170px]

                lg:max-h-[48px]
                lg:max-w-[175px]
              "
            />
          </Link>

          {/* MOBILE CLOSE BUTTON */}

          <button
            type="button"
            onClick={
              closeSidebar
            }
            aria-label="Close sidebar"
            className="
              ml-2

              grid
              h-9
              w-9
              shrink-0
              place-items-center

              rounded-[6px]

              text-slate-400

              transition

              hover:bg-slate-800
              hover:text-white

              lg:hidden
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ===============================================
            NAVIGATION
        =============================================== */}

        <nav
          className="
            flex-1
            overflow-y-auto

            px-2.5
            py-4

            sm:px-3

            [scrollbar-width:thin]
            [scrollbar-color:#334155_transparent]
          "
        >
          <div className="space-y-1">
            {NAV_ITEMS.map(
              ({
                to,
                label,
                icon: Icon,
                end,
              }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={
                    closeSidebar
                  }
                  className={({
                    isActive,
                  }) =>
                    `
                      group

                      flex
                      min-h-[42px]
                      items-center
                      gap-3

                      rounded-[7px]

                      px-3

                      text-[12px]
                      font-medium

                      transition-all
                      duration-200

                      sm:text-[12.5px]

                      ${
                        isActive
                          ? `
                            bg-[#1769E0]
                            text-white
                            shadow-[0_4px_12px_rgba(23,105,224,0.22)]
                          `
                          : `
                            text-slate-300

                            hover:bg-slate-800
                            hover:text-white
                          `
                      }
                    `
                  }
                >
                  {({
                    isActive,
                  }) => (
                    <>
                      <Icon
                        className={`
                          h-[17px]
                          w-[17px]
                          shrink-0

                          transition

                          ${
                            isActive
                              ? "text-white"
                              : "text-slate-400 group-hover:text-white"
                          }
                        `}
                      />

                      <span
                        className="
                          min-w-0
                          truncate
                        "
                      >
                        {label}
                      </span>
                    </>
                  )}
                </NavLink>
              ),
            )}
          </div>
        </nav>

        {/* ===============================================
            SIDEBAR BOTTOM
        =============================================== */}

        <div
          className="
            shrink-0

            space-y-1

            border-t
            border-slate-800

            bg-[#0F172A]

            px-2.5
            py-4

            sm:px-3
          "
        >

          {/* VIEW SITE */}

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              min-h-[42px]
              items-center
              gap-3

              rounded-[7px]

              px-3

              text-[12px]
              font-medium
              text-slate-300

              transition

              hover:bg-slate-800
              hover:text-white

              sm:text-[12.5px]
            "
          >
            <ExternalLink
              className="
                h-[17px]
                w-[17px]
                shrink-0

                text-slate-400
              "
            />

            <span>
              View Site
            </span>
          </a>

          {/* LOGOUT */}

          <button
            type="button"
            onClick={
              handleLogout
            }
            className="
              flex
              min-h-[42px]
              w-full
              items-center
              gap-3

              rounded-[7px]

              px-3

              text-left
              text-[12px]
              font-medium
              text-slate-300

              transition

              hover:bg-red-500/10
              hover:text-red-300

              sm:text-[12.5px]
            "
          >
            <LogOut
              className="
                h-[17px]
                w-[17px]
                shrink-0
              "
            />

            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* =================================================
          RIGHT CONTENT AREA
      ================================================= */}

      <div
        className="
          min-h-screen
          min-w-0

          lg:pl-[216px]
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <header
          className="
            sticky
            top-0
            z-[60]

            flex
            h-14
            items-center
            justify-between

            border-b
            border-[#E2E8F0]

            bg-white/95

            px-3

            backdrop-blur

            sm:px-5

            md:px-6

            lg:justify-end
          "
        >

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(
                true,
              )
            }
            aria-label="Open admin menu"
            className="
              grid
              h-9
              w-9
              place-items-center

              rounded-[6px]

              border
              border-[#E2E8F0]

              bg-white

              text-[#334155]

              transition

              hover:border-[#1769E0]
              hover:text-[#1769E0]

              lg:hidden
            "
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* USER */}

          <div
            className="
              min-w-0
              text-right
            "
          >
            <p
              className="
                max-w-[190px]
                truncate

                text-[11px]
                text-slate-500

                min-[400px]:max-w-[260px]

                sm:text-[12px]
              "
            >
              Signed in as{" "}

              <span
                className="
                  font-semibold
                  text-slate-800
                "
              >
                {user?.name ||
                  "Administrator"}
              </span>
            </p>
          </div>
        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main
          className="
            min-w-0

            px-3
            py-4

            sm:px-5
            sm:py-5

            md:px-6
            md:py-6

            xl:px-7
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}