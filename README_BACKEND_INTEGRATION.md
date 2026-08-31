# Technical Journals — Full-Stack Platform

React (Vite) frontend + Node.js/Express/MySQL backend.

## What was implemented

- **Backend** (`backend/`): Express REST API, MySQL schema + seed data,
  JWT auth (user + admin), bcrypt password hashing, server-side search /
  filter / sort / pagination for journals and conferences, Multer image
  uploads, Nodemailer contact emails, full admin CRUD API for journals,
  conferences, universities, and enquiries.
- **Frontend**: existing pages rewired to call the real API instead of
  hardcoded arrays / localStorage — `Home`, `Journals`, `JournalDetail`,
  `Conferences`, `ConferenceDetail`, `ForUniversities`, `Contact`, `Login`
  (with User/Admin toggle), `Register`. Design, animations, and layout are
  unchanged.
- **Admin Dashboard** (new): `/admin` with a protected layout, dashboard
  stats, and full create/edit/delete pages for Journals, Conferences,
  Universities, and Enquiries.

## Files created

```
backend/                          — entire Express + MySQL API (new)
backend/database/schema.sql       — MySQL schema
backend/database/seed.sql         — seed data migrated from src/data/site.js
backend/README.md                 — backend-specific setup instructions

src/services/api.js               — central fetch client (JWT, error handling)
src/services/authService.js
src/services/journalService.js
src/services/conferenceService.js
src/services/universityService.js
src/services/contactService.js
src/services/dashboardService.js
src/hooks/useDebounce.js

src/components/admin/AdminLayout.jsx
src/components/admin/ProtectedRoute.jsx
src/components/admin/ConfirmDeleteModal.jsx
src/pages/admin/AdminDashboardHome.jsx
src/pages/admin/AdminJournalsList.jsx / AdminJournalForm.jsx
src/pages/admin/AdminConferencesList.jsx / AdminConferenceForm.jsx
src/pages/admin/AdminUniversitiesList.jsx / AdminUniversityForm.jsx
src/pages/admin/AdminEnquiries.jsx
```

## Files modified

```
src/App.jsx                — added /admin routes
src/pages/Home.jsx          — featured journals + universities now from API
src/pages/Journals.jsx      — server-side search/filter/sort/pagination
src/pages/Conferences.jsx   — server-side search/filter/sort/pagination
src/pages/JournalDetail.jsx — loads by slug/id from API
src/pages/ConferenceDetail.jsx — loads by slug/id from API
src/pages/ForUniversities.jsx — universities from API
src/pages/Login.jsx         — User/Admin toggle, real auth
src/pages/Register.jsx      — real registration
src/pages/Contact.jsx       — real submission (removed fake setTimeout)
src/services/mockApi.js     — trimmed to only the unrelated manuscript
                               submit/track mock (out of scope for this build)
```

## Installation

**1. Backend**

```bash
cd backend
npm install
cp .env.example .env        # then edit — see backend/README.md
mysql -u root -p < database/schema.sql
mysql -u root -p technical_journals < database/seed.sql
npm run dev
```

**2. Frontend** (from the project root)

```bash
npm install
cp .env.example .env        # VITE_API_BASE_URL=http://localhost:5000/api
npm run dev
```

Open `http://localhost:5173`.

## Admin login

Admin credentials are **not** a database row — they live in the backend's
`.env` as `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` (a bcrypt hash, never a
plaintext password). Generate a hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('YourPassword123!', 10))"
```

Then log in at `/login`, switch to the **Admin Login** tab, and use that
email/password. You'll land on `/admin`.

## SMTP

Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, and
`CONTACT_RECEIVER_EMAIL` in `backend/.env`. If left blank, the app still
runs correctly — contact enquiries still save to MySQL — email sending is
just skipped (and logged as skipped).

## Testing results (verified in this environment before delivery)

```
Frontend build (vite build):        PASS
Backend startup + MySQL connection: PASS
Database schema + seed import:      PASS (10 journals, 8 universities, 5 conferences)
Registration + duplicate blocking:  PASS
Login (user + admin) + JWT:         PASS
Admin route protection (401/403):   PASS
Journal/Conference/University CRUD: PASS (create/edit/delete verified via live UI)
Enquiry system (save + status):     PASS
Contact form → DB → email:          PASS (DB save verified; SMTP send is
                                      wired correctly but skipped since no
                                      real SMTP credentials were provided)
Home/Journals/Conferences/ForUniversities render real DB data in-browser:
                                     PASS (headless-browser smoke test)
```

## Remaining external setup

- Real MySQL credentials for your environment (a local root/dev setup was
  used for testing here).
- Real SMTP credentials if you want contact-form emails to actually send.
- A production domain / `VITE_API_BASE_URL` + backend `FRONTEND_URL` pair
  once you deploy, instead of `localhost`.
