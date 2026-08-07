# Technical Journals — Journal Hosting Platform

A React + Vite + Tailwind CSS site for **Technical Journals**, a journal hosting platform exclusive to universities, built from the supplied reference screenshots and assets.

## Technology Stack

- **React 19** + **Vite 8** (rolldown-powered build)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, theme tokens in `src/index.css`)
- **React Router DOM v7** — client-side routing with lazy-loaded routes
- **Framer Motion** — entrance/scroll animations
- **react-helmet-async** — per-route SEO metadata
- **lucide-react** — icon set (see "Icons" note below)
- **oxlint** — linting (this Vite template ships with oxlint rather than ESLint)

## Folder Structure

```text
technical-journals/
├── public/                  # robots.txt, sitemap.xml, manifest, favicons, social preview
├── src/
│   ├── assets/
│   │   ├── backgrounds/     # hero/section background images (from supplied "bg *.png" files)
│   │   ├── icons/           # iconset.png reference sheet (see Icons note)
│   │   ├── images/
│   │   └── logos/           # logo.png (from supplied "logo 2.png")
│   ├── components/
│   │   ├── common/          # Seo, PageHero, StatBar, CtaBanner, Accordion helpers, etc.
│   │   ├── forms/            # reusable form field primitives + validation UI
│   │   ├── layout/           # Header, Footer, RootLayout
│   │   ├── sections/         # JournalCard, ConferenceCard
│   │   └── ui/               # Icon resolver, Tabs, Accordion, social icons
│   ├── data/site.js          # centralized content: journals, conferences, FAQs, pricing, etc.
│   ├── pages/                # one file per route
│   ├── services/mockApi.js   # localStorage-backed mock service layer (see below)
│   ├── utils/validation.js   # form validation helpers
│   ├── App.jsx                # route table (lazy-loaded)
│   └── main.jsx
├── deployment-configs/        # one example config per host — see its own README
├── .env.example
└── package.json
```

## Installation & Running

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

### Production build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

### Linting

```bash
npm run lint
```

## Routes Implemented

`/`, `/about`, `/journals`, `/journals/:id`, `/conferences`, `/conferences/:id`, `/services`, `/for-universities`, `/contact`, `/privacy-policy`, `/faq`, `/review-process`, `/pricing`, `/login`, `/register`, `/forgot-password`, `/submit-manuscript`, `/track-manuscript`, `/author-guidelines`, `/reviewer-guidelines`, `/publication-ethics`, `/open-access-policy`, `/copyright-policy`, `/apc`, `/indexing`, `/terms`, `/help-center`, `/blog`, `/sdg-commitment`, plus a catch-all 404.

## Forms & Mock Backend

There is no real backend. Contact, Login, Register, Submit Manuscript, and Track Manuscript forms validate client-side and persist to `localStorage` via `src/services/mockApi.js`, which simulates network latency. Every function in that file has a `// TODO: replace with ...` comment marking exactly where to wire up a real API endpoint. Submitted manuscripts get a generated tracking ID (`TJ-XXXXXX`) you can look up on the Track Manuscript page in the same browser session.

## SEO

- `src/components/common/Seo.jsx` sets a unique title, meta description, canonical URL, Open Graph/Twitter tags, and robots directives per route via `react-helmet-async`.
- JSON-LD structured data is included for the homepage (`WebSite`/`SearchAction`), FAQ page (`FAQPage`), journal detail pages (`Periodical`), conference detail pages (`Event`), and the contact page (`ContactPage`).
- `public/robots.txt` and `public/sitemap.xml` are included (sitemap covers all static routes; dynamic `/journals/:id` and `/conferences/:id` pages are intentionally excluded since IDs are illustrative sample data).
- `public/site.webmanifest` and favicons (generated from the supplied logo) are included.

**Known limitation — no prerendering:** This app is client-side rendered only. `react-helmet-async` updates `<title>`/meta tags in the browser after JavaScript runs, so the *initial* HTML response (view-source) does not yet contain route-specific content or metadata — only the default tags in `index.html`. Modern search engines generally render JavaScript before indexing, but for guaranteed crawlable metadata in the raw HTML you would need to add a prerendering step (e.g. `vite-plugin-prerender`) or migrate to a framework with SSR/SSG (Next.js, Astro, Remix). This was not implemented here; treat SEO as "route metadata is correct once rendered," not "present in the raw HTML response."

## Assets

- **Logo & backgrounds**: extracted directly from the supplied ZIP (`logo 2.png`, `1 bg.png`, `2 bg.png`, `bg 4.png`, `bg 6.png`, `bg 6_2.png`, `bg 7.png`, `bg 7_2.png`, `bg 12.png`, `bg 12_1.png`) and reorganized into `src/assets/backgrounds` and `src/assets/logos`.
- **Icons**: the supplied `iconset.png` is a single flattened reference sheet (not individually sliceable image files), so icons were **not** cropped pixel-by-pixel from it. Instead, every icon in the UI is drawn from `lucide-react`, chosen to match the outline style and meaning of the icon shown in the reference sheet at each usage site (e.g. the "Journal Hosting" document icon, the "Security & Compliance" shield icon). Facebook/LinkedIn/Twitter/YouTube icons are hand-written inline SVGs in `src/components/ui/SocialIcons.jsx` because `lucide-react` no longer ships brand/logo icons. The original `iconset.png` reference sheet is kept in `src/assets/icons/` for anyone who wants to re-cut exact icons later.
- Favicons and the social share image (`public/social-preview.png`) were generated from the supplied logo.

## Deployment

See `deployment-configs/README.md`. Copy the one file relevant to your host (Netlify, Vercel, Firebase, Apache, or Nginx) so that refreshing a client-side route doesn't produce a server 404.

## Environment Variables

Copy `.env.example` to `.env`. Nothing in `.env.example` is required to run the app as shipped — it's provided as a starting point for wiring up a real backend and Google Maps key later.

## What Has and Hasn't Been Verified

Verified in this environment:
- `npm install`, `npm run lint` (0 errors/warnings), and `npm run build` all complete successfully.
- Every route returns HTTP 200 from `vite preview` (including a random unknown path, confirming the SPA fallback and 404 page both work).
- No missing icon imports or broken module resolution at build time.

**Not verified** (no browser automation / Lighthouse available in this environment): actual on-screen visual fidelity against the reference screenshots pixel-by-pixel, live keyboard/screen-reader accessibility testing, cross-browser testing, and Lighthouse Performance/Accessibility/Best Practices/SEO scores. Please spot-check `npm run dev` locally before treating this as final/production-verified, particularly on mobile breakpoints and with a screen reader.

## Troubleshooting

- **Blank page after `npm run dev`**: make sure you're on Node 18+ and re-run `npm install`.
- **Images not loading**: assets are imported directly in JS (`import x from "../assets/..."`) so Vite will fail the build if a path is wrong — check the terminal output.
- **Refreshing a route 404s in production**: you forgot to apply the deployment rewrite config for your host — see `deployment-configs/`.
- **Contact/Login/Register forms don't "remember" data between browsers/devices**: expected — this demo uses `localStorage`, which is per-browser. Wire up the endpoints marked `TODO` in `src/services/mockApi.js` for real persistence.
