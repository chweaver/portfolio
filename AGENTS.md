# AGENTS.md, Charlie Weaver Portfolio

Operating guide for any AI or developer working on this site. Read this first. It
covers the purpose, the stack, the full structure, the design system, how content
flows, how to build and deploy, and the rules and methodology to follow when
updating or polishing the site.

Style note for everything you write here (copy, comments, commit messages): direct
and concise, and no em dashes. Use commas, periods, colons, or parentheses.

---

## 1. What this site is

A personal career portfolio for Charles "Charlie" Weaver, aimed at landing an
entry-level role at a networking-focused MSP (managed service provider): tier-1
service desk, help desk, technical alignment, NOC, or junior sysadmin.

The audience is a busy MSP hiring manager or technical recruiter who decides in
about 20 seconds whether to interview. The site exists to prove, with evidence, that
Charlie already works like a methodical junior tech: he builds, documents, verifies,
and is honest about scope.

Positioning thesis (everything on the page should serve it): the rare entry-level
hire who already operates like a tech with a year on the job, proven by a live,
routed, firewalled home lab and a live Active Directory domain documented to runbook
standard, with CompTIA A+ Core 1 passed.

Live URL: https://chweaver.github.io/portfolio/
Repo: https://github.com/chweaver/portfolio (public)

---

## 2. Stack and tooling

- Next.js 16 (App Router), statically exported (`output: 'export'`). There is no
  server at runtime: the whole site is prerendered to static HTML in `out/`.
- React 18, TypeScript (strict), Tailwind CSS 3.
- Fonts: Inter (sans) and JetBrains Mono (mono) via `next/font/google`.
- No state library, no UI kit, no animation library. Plain React + Tailwind. Do not
  add heavy dependencies without a clear, stated reason.
- Hosting: GitHub Pages, deployed by GitHub Actions on every push to `main`.
- Image step: `sharp` (dev dep) and `scripts/convert-screenshots.mjs` produce `.webp`
  copies of the lab screenshots in `public/logs/`.

npm scripts (`package.json`): `dev` (next dev), `build` (next build, the static
export), `start`, `lint`.

---

## 3. Repository structure

```
.
|- .github/workflows/deploy.yml   GitHub Actions: build + deploy to Pages on push to main
|- next.config.mjs                output:'export', trailingSlash, images.unoptimized,
|                                 basePath/assetPrefix from GITHUB_PAGES_REPO, sets
|                                 NEXT_PUBLIC_BASE_PATH
|- tailwind.config.ts             theme tokens (colors, fonts, shadows, animations)
|- tsconfig.json                  @/* path alias -> ./src/*
|- postcss.config.mjs, next-env.d.ts, package.json, package-lock.json
|- README.md
|- scripts/
|   |- convert-screenshots.mjs    png -> webp for public/logs (run when adding artifacts)
|- public/
|   |- .nojekyll                  required so GitHub Pages serves _next/ assets
|   |- Charlie-Weaver-Resume.pdf  linked from the hero (Resume CTA)
|   |- og-card.png                Open Graph / Twitter social card (1200x630)
|   |- logs/                      lab evidence: screenshots (.png + .webp) and raw
|                                 logs (filter.log, dhcpd.log, system.log)
|- src/
    |- app/
    |   |- layout.tsx             root layout, metadata/SEO/OG, fonts, renders
    |   |                         Navigation + LabProgressStrip + main + Footer
    |   |- page.tsx               the one page: imports and orders every section
    |   |- globals.css            Tailwind layers + the design-system component classes
    |- components/                one file per section/UI piece (see section 6)
    |- data/
    |   |- portfolio.ts           THE content spine. Almost all copy and data live here
    |- lib/
        |- paths.ts               basePath() and publicAsset() for fetch/img URLs
        |- useLabStatus.ts        shared client hook for the live AD lab status feed
```

Build artifacts (`out/`, `.next/`) and `node_modules/` are git-ignored and should
never be edited by hand.

---

## 4. Where content lives (the content spine)

`src/data/portfolio.ts` is the single source of truth for almost all content. Each
named export feeds one or more components. To change wording, numbers, lists, certs,
phases, skills, etc., edit `portfolio.ts`, not the components.

Exports and their consumers:

| Export | Consumed by | Holds |
|---|---|---|
| `profile` | Hero, Navigation, Footer, Contact, layout (SEO) | name, location, email, links, tagline, labPhase |
| `summary` | Hero | `built` / `planned` lists + an `honesty` line |
| `adLab` | ADLabProgress, useLabStatus | guide base URL + the lab-status.json URL |
| `subnets`, `ipTable` | NetworkTopology | network addressing |
| `hostSpec` | LabOverview | host hardware/hypervisor spec |
| `vmInventory` | VMInventory | per-VM table |
| `firewallRules`, `implicitBehavior`, `verificationLog`, `pfsenseLog` | FirewallRules | the 3 rules with intent + verification, plus real terminal and filter.log evidence |
| `skillsMatrix`, `skillsOverview`, `certCoverage`, `coverageMethodology` | SkillsMatrix | the lab-element to cert to MSP table, the 3-col overview, and exam coverage bands |
| `phases` | Roadmap | the 5-phase roadmap (status: complete / in-progress / planned) |
| `certs` | Certifications | cert cards (status: passed / in-progress / queued / optional / long-term) |
| `careerStages` | Career | entry / network-engineer / long-term, each with bringing vs learning |

Exception: `ArtifactGallery.tsx` defines its artifact list inline (it maps the image
files in `public/logs/`), not in `portfolio.ts`. To add an artifact, add the image to
`public/logs/`, run the convert script, then add an entry in `ArtifactGallery.tsx`.

---

## 5. Design system

Defined in `tailwind.config.ts` (tokens) and `src/app/globals.css` (component
classes). Reuse these. Do not invent new colors or one-off class soup.

Color tokens (Tailwind theme):
- `bg`: DEFAULT `#0a0e14`, `elevated #0f141b`, `card #141b24`, `border #1f2937`
- `accent`: DEFAULT `#22d3ee` (cyan), `dim #0891b2`, `glow #67e8f9`
- `ink`: DEFAULT `#e5e7eb`, `dim #9ca3af`, `faint #6b7280`
- `signal`: `green #10b981`, `amber #f59e0b`, `red #ef4444`

Use them as Tailwind utilities: `bg-bg-elevated`, `text-ink-dim`, `border-bg-border`,
`text-accent`, `bg-signal-green`, etc.

Component classes (in `globals.css` under `@layer components`):
- `.container-narrow`: page width wrapper (max-w-6xl + padding). Wrap section content.
- `.section-eyebrow`: small mono uppercase label with a leading dash, the kicker above
  each section title.
- `.section-title`: section heading.
- `.card`: the standard surface (rounded, bordered, subtle blur and shadow, hover lift
  gated on prefers-reduced-motion).
- `.pill`, `.pill-accent`, `.pill-green`, `.pill-amber`: status badges.
- `.btn-primary`, `.btn-secondary`: the two button styles (used in the hero CTAs).
- `.link`, `.codeblock`, `.accent-line`: inline link, code block, gradient text.

Section wrapper: `src/components/Section.tsx` is the shared frame for every numbered
section. Props: `id` (anchor), `eyebrow`, `title`, `subtitle`, `children`. It applies
`scroll-mt-28` so anchor jumps clear the fixed nav + the sticky lab strip. Use it for
any new section.

Motion and accessibility: `globals.css` has a global `prefers-reduced-motion: reduce`
reset that neutralizes transitions, animations, and smooth scroll. Keep it. Any new
motion should degrade under reduced motion. The page is dark-theme only
(`color-scheme: dark`, `darkMode: 'class'`).

---

## 6. Sections and components

`src/app/page.tsx` renders the sections in this order. The eyebrow shows the section
number. Note: number 09 is currently unused (the old Side-projects section was removed
in v2), so Contact reads 10. Renumbering Contact to 09 is a pending cleanup.

1. `Hero` (profile, summary): name, positioning line, stat cards, built-vs-planned
   cards, honesty line, and the CTAs (See the lab, email, LinkedIn, GitHub, Resume).
2. `ArtifactGallery` (eyebrow "Evidence", inline data + `public/logs`): screenshots
   that prove the lab exists (firewall rules, interface assignments, dashboard, an
   SSH-works-but-ping-blocked capture).
3. `LabOverview` (01 / Lab, hostSpec): host hardware and hypervisor spec.
4. `NetworkTopology` (02 / Network, ipTable + subnets): the two routed /24 subnets and
   the IP addressing.
5. `FirewallRules` (03 / Firewall, firewallRules + implicitBehavior + verificationLog +
   pfsenseLog): the three pfSense rules, each with intent and a verification command,
   the implicit-deny explanation, and real terminal + filter.log evidence. This is the
   strongest documentation-discipline proof on the site.
6. `VMInventory` (04 / VMs, vmInventory): per-VM table (OS, vCPU, RAM, disk, NICs, IPs,
   role, snapshot).
7. `SkillsMatrix` (05 / Skills, skillsMatrix + skillsOverview + certCoverage): a 3-col
   overview, then a filterable table mapping each lab element to A+, Network+, and CCNA
   objectives and to its MSP client-work application, then honest exam-coverage bands.
8. `Roadmap` (06 / Roadmap, phases): 5-phase timeline. Renders three states: complete
   (green), in-progress (accent), planned (amber).
9. `ADLabProgress` (Live, AD Lab, adLab + useLabStatus): the live Active Directory lab
   status, build-out progress bar and per-phase list, read from the feed (section 7).
10. `Certifications` (07 / Certifications, certs): cert cards by status.
11. `Career` (08 / Trajectory, careerStages): entry, network-engineer, and long-term
    stages, each with "bringing" vs "learning."
12. `Contact` (10 / Contact, profile): the closing contact section.

Layout-level (always present, in `layout.tsx`):
- `Navigation` (sticky top nav, `top-0 z-40 h-14`).
- `LabProgressStrip` (sticky live AD progress strip just under the nav, `top-14 z-30`).
- `LogBackground` (animated scrolling log backdrop, desktop only, reduced-motion gated).
- `Footer`.

Shared: `Section` (frame), `useLabStatus` (hook), `paths.ts` (URL helpers).

Component conventions: named exports (not default), `@/` alias for imports, `'use
client'` only where a component needs hooks (Hero, most data-table sections, and the
gallery are server components; SkillsMatrix, ADLabProgress, LabProgressStrip,
useLabStatus are client because of state or fetch).

---

## 7. The live Active Directory lab feature

This is the site's freshest, strongest signal and it updates without a redeploy.

- A sibling repo, `chweaver/ad-lab-guide` (a MkDocs site on GitHub Pages), publishes a
  machine-readable status file at
  `https://chweaver.github.io/ad-lab-guide/lab-status.json`, regenerated on every push
  to that repo's main, so it is always current.
- `src/lib/useLabStatus.ts` is a shared client hook that fetches that URL once and
  returns `{ data, failed }`. Both `LabProgressStrip` (the sticky strip) and
  `ADLabProgress` (the detailed section) use it, so there is one fetch.
- `adLab.statusUrl` in `portfolio.ts` is an absolute URL, so it does not need basePath
  prefixing.

lab-status.json shape:
```json
{
  "generatedAt": "ISO timestamp",
  "guideBaseUrl": "https://chweaver.github.io/ad-lab-guide/",
  "summary": { "total": 16, "buildOutTotal": 12, "buildOutDone": 6,
               "done": 6, "next": 1, "planned": 5, "stretch": 4 },
  "phases": [ { "id": 1, "title": "...", "status": "done|next|planned|stretch",
               "track": "build-out|stretch", "path": "build-out/phase-01-install/" } ]
}
```
- Headline metric: `buildOutDone / buildOutTotal` (the build-out track is the main
  metric, 12 core phases; stretch is 4 bonus phases).
- Phase link: `guideBaseUrl + phase.path`.
- Handle fetch failure gracefully: the strip hides on failure (the section shows a
  guide link), and nothing renders before the client mounts (no hydration mismatch).

Source-of-truth rule: the live feed is authoritative for AD progress. When you update
static AD copy elsewhere (the `built` list, `skillsOverview`, the Roadmap Phase 3, the
hero stats), keep it consistent with the feed. As of the v2 baseline the feed shows 6
of 12 build-out phases done, phase 7 next.

---

## 8. Build, local development, and deploy

Local dev:
```
npm install
npm run dev      # http://localhost:3000
```

Production build (what CI runs, and what you must pass before committing):
```
npm run build    # next build, static export to ./out, runs the TypeScript pass
```
A clean build prints "Compiled successfully", a TypeScript pass with no errors, and
"Generating static pages (3/3)".

Deploy (`.github/workflows/deploy.yml`): on push to `main` (or manual dispatch), CI
checks out, sets up Node 20, runs `npm ci`, runs `npm run build` with
`GITHUB_PAGES_REPO` set to the repo name (so `next.config.mjs` computes the
`/portfolio` basePath), uploads `out/`, and deploys to GitHub Pages. Typical run is
about 45 to 60 seconds. The site is at https://chweaver.github.io/portfolio/.

basePath: in production the site is served under `/portfolio`. `next.config.mjs`
derives `basePath`, `assetPrefix`, and `NEXT_PUBLIC_BASE_PATH` from
`GITHUB_PAGES_REPO`. Next prefixes `<Link>` and `next/image` automatically. For raw
`fetch()` or `<img src>` to local `/public` assets, use `publicAsset()` from
`src/lib/paths.ts`. Absolute external URLs (like the lab feed) need no prefixing.

---

## 9. How to make a change end to end

1. Work from a fresh clone of the live repo. Do not edit any local zip download (a
   download has no `.git` and can drift from `main`).
   ```
   git clone https://github.com/chweaver/portfolio.git
   cd portfolio
   npm install
   ```
2. Make the change. Prefer editing `src/data/portfolio.ts` for content. Touch
   components only for structure or presentation. Match the design system.
3. Verify: `npm run build` must pass (TypeScript clean, static export succeeds). For
   visual checks, `npm run dev`.
4. Commit. Author commits as Charlie (`Charlie Weaver <charliewgz6@gmail.com>`). Do not
   add a Co-Authored-By AI trailer on this repo (owner preference). Use explicit-path
   adds, write a scope-honest message, no em dashes.
5. Push to `main`. The Actions workflow builds and deploys automatically.
6. Verify live: wait for the Action to go green (repo Actions tab), then hard-refresh
   https://chweaver.github.io/portfolio/ and confirm the change. Spot-check by grepping
   the deployed HTML for expected strings.

---

## 10. Conventions and hard rules

- Honesty is non-negotiable. Do not invent experience, titles, metrics, or skills. The
  audience is hiring managers who detect inflation instantly, and inflation is
  disqualifying. Every claim must trace to something real in the lab, the repo, or a
  passed cert. If a claim has no backing, cut it or label it plainly (the site already
  does this: "everything marked built is built," "familiar, not yet hands-on,"
  "no professional MSP tenure yet"). Preserve that honesty; it is a trust asset, not a
  weakness.
- No em dashes anywhere (copy, comments, commit messages). Use commas, periods,
  colons, or parentheses.
- Match the existing design system and voice. Changes are elevations, not redesigns.
- Keep the stack: Next.js App Router + TypeScript + Tailwind, static export. No new
  heavy dependencies without a clear reason. `npm run build` must pass.
- Accessibility and performance are part of "polished": semantic HTML, alt text on
  images, sufficient contrast, prefers-reduced-motion support (already wired globally),
  fast static load.
- Code: named exports, `@/` path alias, `'use client'` only where hooks or fetch are
  used.

---

## 11. Editing methodology (how to evaluate any change)

Hold two lenses at once on every change:

1. MSP hiring manager: What does this prove? Would it survive a 20-second screen? What
   MSP-relevant signal does it send (ticket and documentation discipline, networking
   fundamentals, Windows/AD/M365, service-desk readiness, RMM/PSA awareness, certs)?
   Does it de-risk the hire with evidence, or only claim?
2. Marketing and conversion: Is the value proposition immediate and above the fold? Is
   it scannable (a busy reader skims, does not read)? Is the hierarchy right? Is there
   a clear next action (contact, resume, view the lab)? Where does attention leak?

Lead with the strongest proof (the documented firewall lab, the live AD domain, A+
Core 1 passed). Cut filler. Keep one clear primary call to action with frictionless
contact. Polish equals credibility: consistent voice, zero typos, tight spacing, a
clean Open Graph card for shared links.

---

## 12. v2 baseline and known follow-ups

v2 (shipped 2026-06-02) did: promoted Active Directory from "planned" to a live,
in-progress strength across the data, hero, skills, and roadmap; added an in-progress
state to the Roadmap; relabeled Microsoft 365 / ServiceNow / Jira as "familiar, not yet
hands-on"; removed a Python side project and the Side-projects section to focus on the
labs. Build verified, deployed.

Open follow-ups (not yet done, safe to pick up):
- Add one-line "so what" takeaways to the dense technical sections (NetworkTopology,
  FirewallRules, VMInventory) so a non-technical recruiter gets the point before the
  engineer reads the depth.
- SEO: keyword the title (role + Indianapolis) and refresh the OG card.
- Tighten Career and Roadmap to a crisper "now / next."
- Cosmetic: renumber Contact from 10 to 09 (the 09 slot opened when Side-projects was
  removed).
- Consider promoting the hero `<h1>` from the name to the positioning line, with the
  name as an eyebrow (a more aggressive conversion play; get owner buy-in first).

---

## 13. Quick reference

- Content: `src/data/portfolio.ts`
- Sections wired: `src/app/page.tsx`
- Design tokens: `tailwind.config.ts`; component classes: `src/app/globals.css`
- Live AD feed: `https://chweaver.github.io/ad-lab-guide/lab-status.json` via
  `src/lib/useLabStatus.ts`
- Build: `npm run build` (must pass). Deploy: push to `main`, Actions to Pages.
- Live site: https://chweaver.github.io/portfolio/
```
