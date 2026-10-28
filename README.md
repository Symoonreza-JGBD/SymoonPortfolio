# Anik · Quality dashboard

A personal portfolio for **MD Symoon Reza Patwary Anik**, Senior Software QA Engineer in Dhaka, Bangladesh. A real Vite + React JavaScript project with plain CSS, a production build and React Router.

## Run locally

Use Node.js **22.12+** (Node **24 LTS** recommended) and npm. Run `npm ci`, then `npm run dev`. Open the local address printed by Vite. Run `npm run check` for ESLint, Node's built-in unit tests and a production build. Run `npm run preview` to inspect the built site locally. Preview is not a production hosting server.

No API keys, backend, `.env` file or environment variables are required. Email uses `mailto:` rather than a pretend contact form. IBM Plex Sans and IBM Plex Mono load from Google Fonts, with local sans-serif/monospace fallbacks if offline.

## Routes

- `/` — home, KPIs, indexed before/after bars, illustrative pipeline, career timeline, full role details, skills, education and contact.
- `/#career` and `/#skills` — deep links to dashboard sections.
- `/resume` — accessible, print-friendly CV with PDF download.
- Any other path — a helpful client-side 404 with a link home.

The sample pipeline is explicitly **not live data**. The timeline is a fixed 2021–2026 display window; an ongoing role extends to its right boundary, not a claim of future employment. JustGo shows both the original QA role and the Apr 2026 senior promotion. All facts and outcomes come only from the supplied brief.

## Edit content

Edit `src/data/portfolio.js`. `github: ''` hides the GitHub link; setting it adds the link to both the hero and CV. `totalBugs: null` hides the optional `bugs_reported_overall` card. Set a real count (including `0`) to show it. Do not populate either with invented values.

The CV is generated from the same data at download time by `src/lib/resume.js`. It is a text-based, selectable PDF, uses built-in Helvetica and supports pagination. No old CV asset or unverified personal facts are used by the app. `/resume` also supports browser Print / Save as PDF. The simple PDF writer targets the supplied Latin/ASCII content; use the browser print version if you later add non-Latin text.

## Project layout

- `src/components/` — dashboard sections, shared layout, icons, theme toggle and CV.
- `src/data/portfolio.js` — factual content and optional values.
- `src/lib/` — pure KPI/timeline utilities and PDF generation.
- `src/styles.css` — all styling and light/dark tokens, responsive and print rules.
- `static/theme.js` — pre-paint theme initialization, guarded storage, system preference fallback.
- `static/favicon.svg` — custom QA mark. Vite publishes only `static/`; original `public/` assets are preserved but excluded from the build, including the old CV and photo.
- `tests/` — Node tests for KPI visibility, timeline math, PDF structure/content and theme initialization.
- `vite.config.js`, `vercel.json`, `netlify.toml` — build and deployment settings.

## Dependencies

Runtime: **React**, **React DOM**, **React Router** (actual routes, deep links, client navigation and a 404 view). Development only: **Vite** and its official React plugin for JSX, bundling and hot reload; **ESLint**, `@eslint/js`, `globals`, React Hooks and React Refresh ESLint plugins for static checks. No UI, animation, chart, icon, CSS framework, PDF or test libraries. Tests use Node's built-in runner.

## Accessibility and smoke checks

Semantic landmarks, a skip link, visible keyboard focus, accessible chart text, a real table with headers, keyboard-scrollable charts/tables, reduced-motion support and all safe-area insets are included. Both themes use contrasting text tokens (minimum target 4.5:1). Green is reserved for the supplied positive outcomes, not fabricated pipeline statuses.

Before publishing, check `/`, `/resume`, a missing route and a direct refresh of `/resume`. Test at 320px, 375px, 768px and desktop widths; only the timeline and table should scroll horizontally. Use Tab to reach the skip link, navigation, toggle and CV buttons. Toggle theme and refresh; clear the `anik-theme` storage key to return to OS preference. Block storage to verify the app still works. Emulate reduced motion. Download and open the PDF and inspect Print preview. GitHub and total bugs should remain hidden with the default data.

## Deploy to Vercel (recommended)

1. Commit and push this project to your GitHub repository.
2. In Vercel, import the repository as a new project (or update the existing project's framework from Next.js to **Vite**).
3. Use Node **24.x**, install command `npm ci`, build command `npm run build`, output directory **`dist`**, project root **`.`**. No environment variables needed.
4. Deploy. `vercel.json` supplies the React Router history fallback and basic security headers. Remove any old Next.js-specific project overrides in the Vercel dashboard.
5. Open `/` and refresh `/resume` on the deployed domain to verify deep links. Add a custom domain through the host's domain settings if desired.

## Deploy to Netlify

1. Import the Git repository into Netlify.
2. The included `netlify.toml` selects Node 24, build command `npm run build`, publish folder `dist`, security headers and the SPA fallback.
3. Deploy, then test a direct visit and refresh at `/resume`.

## Other static hosting

Run `npm ci` and `npm run build`; publish the **contents of `dist/`**, not `src/`. Configure the server to serve existing assets normally and rewrite other paths to `/index.html` (for Nginx: `try_files $uri $uri/ /index.html;`). This project targets a domain root. Subdirectory hosting additionally needs matching Vite `base` and React Router `basename` settings; GitHub Pages also needs a history fallback strategy, so Vercel or Netlify is simpler.

The site is deployable, but no deployment is performed automatically and no account credentials are needed to build it.
