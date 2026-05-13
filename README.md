# Charlie Weaver — Portfolio Site

Personal portfolio site built from the Home Lab v2 and MSP Career Roadmap document. Next.js 14 (App Router) + Tailwind CSS, statically exported for GitHub Pages.

## Local development

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```powershell
npm run build
```

The static export lands in `./out`.

## Deploying to GitHub Pages

1. Create a new public GitHub repo (e.g. `chweaver/portfolio`).
2. Push this directory to the repo's `main` branch.
3. In the repo settings → Pages, set **Source** to **GitHub Actions**.
4. Push to `main` — the workflow at `.github/workflows/deploy.yml` builds and deploys automatically.

The site lives at `https://<user>.github.io/<repo>/`. The `next.config.mjs` reads the repo name from the `GITHUB_PAGES_REPO` env var (set in the workflow) so paths resolve correctly.

### User/org page deployment

If you'd rather host at the root — `https://chweaver.github.io/` instead of `/<repo>/` — name the repo `chweaver.github.io` and leave `GITHUB_PAGES_REPO` unset (or empty). The config will skip the `basePath` automatically.

## Editing content

All copy lives in `src/data/portfolio.ts`. Update there; the components consume the data.

## Stack

- Next.js 14 (App Router, `output: 'export'`)
- React 18
- Tailwind CSS 3
- TypeScript
- Fonts: Inter + JetBrains Mono via `next/font/google`

## Project layout

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, nav, footer
│   ├── page.tsx            # Composes the sections
│   └── globals.css         # Tailwind + custom utilities
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Section.tsx         # Reusable section shell
│   ├── LabOverview.tsx
│   ├── NetworkTopology.tsx # Inline SVG topology diagram
│   ├── FirewallRules.tsx
│   ├── VMInventory.tsx
│   ├── SkillsMatrix.tsx    # Client-side filterable table
│   ├── Roadmap.tsx         # Vertical phase timeline
│   ├── Certifications.tsx
│   ├── Career.tsx
│   ├── Supplementary.tsx   # Trading bot + bash app
│   ├── Contact.tsx
│   └── Footer.tsx
└── data/
    └── portfolio.ts        # All copy in one place
```
