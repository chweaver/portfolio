# Charlie Weaver, Portfolio

Personal IT/MSP career portfolio. Next.js (App Router), statically exported and deployed
to GitHub Pages at https://chweaver.github.io/portfolio/.

For the full operating guide (architecture, the live lab-status pipeline, conventions,
and gotchas), see [AGENTS.md](AGENTS.md). It is the canonical reference; this README is
just a quick start.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build and deploy

```bash
npm run build    # static export to ./out (this is also the CI gate)
```

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and deploys to
GitHub Pages. In CI the workflow sets `GITHUB_PAGES_REPO`, so `next.config.mjs` serves
the site under the `/portfolio` base path.

## Where things live

- Content: `src/data/portfolio.ts` (the single content spine, almost all copy and data).
- Page composition: `src/app/page.tsx`.
- Components: `src/components/` (one file per section or UI piece).
- Design tokens: `tailwind.config.ts`; component classes and motion: `src/app/globals.css`.
- Live lab status: `src/lib/useLabStatus.ts` fetches `lab-status.json` published by the
  sibling repos `chweaver/ad-lab-guide` and `chweaver/linux-lab-guide`.

## Scripts

```bash
npm run dev        # local dev server
npm run build      # static export to ./out
npm run typecheck  # tsc --noEmit
npm run lint       # eslint

node scripts/build-og-card.mjs       # regenerate public/og-card.png
node scripts/convert-screenshots.mjs # regenerate .webp for new public/logs PNGs
```

Stack: Next.js 16, React 18, TypeScript (strict), Tailwind CSS 3, static export. Node 20
in CI.
