# Portfolio Review

Brutally honest review of the Charlie Weaver portfolio, judged through two readers at
once: a senior frontend/design reviewer, and a semi-technical MSP hiring manager
skimming for about 45 seconds. Reviewed against the live build at commit `790bde8`,
with real rendered screenshots at 1440px and 390px (full page and per section).

Severity scale: Critical (costs you the interview) / High (actively hurts) /
Medium (drag) / Low (polish).

---

## TL;DR

The bones are good and the site does NOT read as generic AI slop. The network-topology
SVG and the live lab-status feeds are genuinely distinctive, the copy is evidence-led and
honest (built vs planned is labeled), and the code and accessibility are clean. That is
the rare 20 percent most junior portfolios never reach.

The problem is the opposite of most portfolios: it says too much. There are 14 sections.
The desktop page scrolls for screens; the mobile page is 24,439px tall, roughly 30 phone
screens. A 45 second skim cannot survive that. The same facts (the AD lab, the target
role list, the VM and IP inventory, the built vs planned framing) repeat four or five
times across different sections. The single highest-leverage move is to cut and merge
down to about 6 to 8 tight sections and lead with the strongest proof.

What is genuinely strong (do not cut): the topology diagram, the live AD feed, the
firewall section, the outcome-first Projects grid, the Evidence screenshots, and the
honest built-vs-planned framing.

---

## 1. Copy tightness / overexplaining

The copy is mostly good: specific, grounded, real numbers, no "passionate about elegant
solutions" slop. The issue is repetition and a handful of meta "here is how to read
this" framings that read as filler.

### C1. The target-role list repeats 4 to 5 times | High
The same "tier-1 service desk, help desk, NOC, junior sysadmin" list appears in the hero
kicker, the hero body paragraph, the Readiness section, the Contact "Open to" column, and
the Contact subtitle. By the third time it reads as padding.
- Fix: state the target roles once (hero) and once at Contact (the "Open to" column).
  Cut it everywhere else.

### C2. Meta "how to read this" framings | High
These are the most AI-tell lines on the site. They explain the obvious and add nothing.
- Skills contextCard, before: "The fast version is three columns. The full cert mapping
  (every lab element traced to A+, Network+, and CCNA objectives) is one click below for
  anyone who wants it."
  after: "Each lab element maps to A+, Network+, and CCNA objectives. Full table below."
- Firewall contextCard, before: "The point of this section: I can write a firewall rule,
  test it, document the intent, and verify it in the log. The same workflow a client
  firewall change needs. Three rules on the LAB200 interface, deny by default and permit
  by exception."
  after: "Three rules on the LAB200 interface, deny by default and permit by exception.
  Each one written, tested, documented, and verified in the log, the same workflow a
  client firewall change needs."
- Readiness subtitle, before: "The 20-second version: what I can do on day one, and how I
  work when I do it. Everything here traces to the lab proof below."
  after: "What I can do on day one." (and see L1: the whole section is a candidate to cut)

### C3. Hero stacks too much framing | Medium
The hero says the same thing several ways: a kicker, a two-tier headline, a cert line
("CompTIA A+ Core 1 passed - Core 2 in progress - CCNA next"), a body paragraph, a 4-cell
at-a-glance strip (which has its own Certs cell), then built and planned cards. The cert
line duplicates the glance "Certs" cell; the body paragraph repeats the kicker and glance.
- Fix: keep the two-tier headline + the at-a-glance strip + CTAs + stats. Cut the
  standalone cert line (it is in the glance strip) and tighten or cut the body paragraph.
- Body paragraph, before: "Applying for tier-1 service desk, help desk, NOC, and junior
  sysadmin roles across the Indianapolis metro. The lab on this page is the proof: a live
  Active Directory domain, a segmented pfSense network, and multi-distro Linux, all
  documented and verified."
  after: "The lab below is the proof: a live AD domain, a segmented pfSense network, and
  multi-distro Linux, all documented and verified."

### C4. Contact subtitle repeats the role list right above the role list | Medium
- before: "Available for tier-1 help desk, service desk, NOC, technical alignment, and
  junior sysadmin roles in the Indianapolis area. On-site, hybrid, or remote with an
  on-site option."
  after: "Indianapolis metro. On-site, hybrid, or remote." (the roles are already in the
  "Open to" column directly beside this line)

### C5. AGDLP and AD-section prose is verbose | Low
The AD section subtitle explains AGDLP nesting in full. It is good screener-grade detail,
but it is long. Keep the AGDLP "why" as a short contextCard, trim the rest.

### C6. One em dash in a code comment | Low
`src/lib/paths.ts:4` has an em dash in a JS comment. Not user-facing, but you said you
never use them, so it is worth fixing for consistency if someone reads the source.

---

## 2. Visual / UI polish

The design system is consistent and intentional: near-black slate, a single cyan accent,
Inter plus JetBrains Mono, a coherent status-color system (green/cyan/amber), real focus
rings. It looks designed, not templated. Issues are about density and a few consistency
nits, not taste.

### V1. The hero is too tall and too busy | Medium
Above the fold is doing 8 jobs: kicker, two-tier H1, cert line, body paragraph, 4-cell
grid, a 4-button CTA row plus 2 text links, a 4-card stat grid, and two large built/planned
cards. It is a wall before the first scroll.
- Fix: thin to headline + glance strip + one primary CTA cluster + the stat grid. Move
  built/planned lower or fold into the stat area.

### V2. Numbered eyebrows interleaved with unnumbered sections | Medium
Eyebrows run 01..10, but three landmark sections (Live AD Lab, Evidence, Live Linux Lab)
have no number and sit between numbered ones. The reader sees "01, then unnumbered, then
02, 03" which looks like a numbering bug.
- Fix: either number everything in order, or drop the numbers entirely (they add little).
  Dropping them is the cleaner call.

### V3. Section padding compounds the length | Medium
Every section uses `py-20 md:py-28` (up to 112px top and bottom). Across 14 sections that
is a large share of the total scroll. After cutting sections, also consider tightening
vertical rhythm on the survivors.

### V4. The animated log background is a borderline gimmick | Low
`LogBackground` scrolls a green terminal log behind the whole page on desktop. It is
subtle and reduced-motion gated, so it is not egregious, but it is a "vibe" element a
senior reviewer might read as trying-hard. Judgment call: keep if subtle, cut if you want
maximum restraint.

### V5. Faint mono labels may be low contrast | Low
Small mono labels and meta use `ink-faint (#6b7280)` on the near-black background. At 11px
this is close to the WCAG AA threshold. Worth a contrast check (see T4).

---

## 3. Layout and flow (site information architecture)

This is where the most value is. The site has all the right material but too much of it,
in an order that buries the best parts.

### L1. Far too many sections for a 45-second skim | Critical
14 sections (Hero, Readiness, Live AD, Firewall, Network, Projects, VMs, Lab, Skills,
Evidence, Certs, Plan, Contact, Live Linux). A hiring manager will not scroll a 24,000px
mobile page. Target 6 to 8 sections.
- Fix direction (for Phase 4 discussion): a leaner spine, for example
  Hero -> Projects -> Live AD lab -> Firewall -> Network topology -> Skills + Certs ->
  Evidence -> Contact. Everything else merges up or is cut.

### L2. Heavy cross-section redundancy | Critical
The same facts recur:
- Active Directory: hero stat, the sticky Live AD strip, the Live AD section, the Projects
  AD card, the Plan. About 5 surfaces.
- VM and IP inventory: the topology, the VMs section, the Network IP table, the Lab
  environment spec. 3 to 4 surfaces.
- Built vs planned: hero cards, Readiness, Plan, Certs.
- Fix: each fact gets one home. The topology owns the network picture; Projects owns the
  outcome summary; the Live AD section owns AD detail.

### L3. The strongest skim artifacts are buried | High
Projects (outcome-first, the single best 45-second artifact) is at DOM position 6, below
the dense Live AD and Firewall sections. Evidence (real pfSense screenshots, hard proof)
is at position 10.
- Fix: promote Projects to right after the hero. Promote Evidence above the credential
  sections.

### L4. The page ends on "nothing finished yet" | High
The last section is Live Linux Lab, which currently reports 0 of 19 phases, 0 percent, all
four labs "NOT STARTED." Ending a portfolio on a large section advertising unstarted work
is a weak final impression.
- Fix: cut the full section until it has real progress, or reduce it to a one-line "Linux
  labs in progress, tracked live" pointer. Do not close on a 0 percent board.

### L5. VMs and Lab environment overlap | Medium
"What each VM proves" and "A safe place to practice MSP tasks" cover the same host
inventory and hypervisor story.
- Fix: merge into one short "Lab environment" block, or fold the VM facts into the
  topology and cut the standalone sections.

### L6. Plan / near-term overlaps the hero and certs | Medium
The near-term Plan repeats the built-vs-planned story and the cert roadmap.
- Fix: fold the one or two forward-looking lines into Certs, cut the standalone section.

### L7. Readiness duplicates the hero | Medium
The Readiness section restates the hero (target roles, what I can do, how I work).
- Fix: cut it, move any unique line into the hero.

---

## 4. Code and technical polish

Genuinely clean. A technical reviewer opening the repo or DevTools will not wince. This is
a strength to leave mostly alone.

What is good (verified):
- Component structure: one file per section, named exports, `@/` alias, `'use client'`
  only on the 10 islands that need hooks or fetch. Static export builds clean.
- Accessibility: correct heading order (one h1, section h2s via the shared `Section`, card
  h3s), alt text on all Evidence images, aria-labels on the lightbox and the topology SVG,
  a global focus-visible ring, and a global reduced-motion reset.
- Performance shape: self-hosted fonts via `next/font`, Evidence images served as WebP,
  fetches to the two lab feeds deduped by the HTTP cache.

### T1. Stale README and dead scripts | Low
`README.md` says Next 14 and references a deleted `Career.tsx`. `package.json` has a
`lint` script (`next lint`, removed in Next 16, no ESLint config) and a `start` script
(meaningless for a static export). Trim or fix.

### T2. No automated quality gate | Low
The only gate is `npm run build` (which does typecheck). There is no ESLint config and no
tests. Not required for a site this size, but a minimal ESLint flat config would be a nice
"I do this properly" signal if a reviewer opens the repo.

### T3. Many client islands for a static page | Low
10 components carry `'use client'`. Most are justified (lab-status fetches, filters,
lightbox), but after the IA cut, revisit whether all are still needed.

### T4. Run Lighthouse for hard numbers | Low
A11y and perf look good from code and rendered output, but real numbers (contrast on the
faint mono labels, LCP from the hero, CLS from the late lab-status fetch shifting layout)
would confirm it. Can run a full Lighthouse pass on request.

---

## Appendix: what to protect

When cutting, do not lose these. They are the reason the site is above average:
1. The network-topology SVG (bespoke, live, reads as real engineering).
2. The live AD lab-status feed (rare, updates without redeploy).
3. The Firewall section (the strongest documentation-discipline proof).
4. The Projects outcome-first grid (best 45-second artifact, just needs promoting).
5. The Evidence screenshots (hard proof, just needs promoting).
6. The honest built-vs-planned framing (a trust asset; never inflate it away).
