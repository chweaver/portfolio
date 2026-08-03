# Mega-brief: Full copy audit of the portfolio (every word, zero slop)

Paste this whole document as the prompt for the audit session. It is self-contained.

---

## Mission

Audit every last word of user-facing text on Charlie Weaver's portfolio
(`C:\Users\Charl\portfolio`, live at https://chweaver.github.io/portfolio/) and make it
read like a precise, human-written, beautifully crafted site. Not one string escapes the
sweep: headlines, subtitles, section titles, context cards, card copy, pill labels, table
cells, alt text, aria-labels, button labels, metadata, the OG card, code comments that
describe copy, and the resume PDF (flag only, see Boundaries).

The bar: a skeptical MSP hiring manager reads any sentence and hears a careful junior
tech, never a language model. Two failure modes killed copy before and both are in scope:

1. **AI slop**: hollow verb lists ("Define, test, document, explain" shipped as a section
   title and had to be killed), triplet abstractions, mirrored parallelism, "not just X
   but Y" constructions, adjectives doing the work verbs should, generic
   enthusiasm, any sentence that could appear on anyone's portfolio.
2. **Imprecision**: claims that drift from evidence, numbers the live feeds own baked
   into static copy, redundancy between sections, terminology that wobbles (pick one term
   per concept and enforce it), dates or counts that contradict each other.

## Authoritative context (read before anything else)

- `AGENTS.md` at the repo root is the constitution. Its writing rules (section 10: no em
  dashes anywhere, sentence case, no AI-tell phrasing, honesty is non-negotiable) and its
  source-of-truth rule (section 6: the live feeds are authoritative for lab progress;
  static copy stays qualitative, never numeric where a feed could outrun it) override
  every stylistic instinct. If this brief and AGENTS.md conflict, AGENTS.md wins; report
  the conflict instead of improvising.
- `src/data/portfolio.ts` is the content spine; most copy lives there. The rest hides in
  component JSX (`Section` titles/subtitles/contextCards, inline paragraphs in
  `FirewallRules`, `NetworkTopology`, `SkillsMatrix`, `Hero`, `ArtifactGallery`),
  `src/app/layout.tsx` (title/description metadata), and `scripts/build-og-card.mjs`
  (text baked into the OG image; rerun the script if its copy changes).
- The owner's voice reference: plain, terse, first person, evidence-led, a little dry.
  He writes "I build and document myself", not "a meticulously documented journey".

## Hard boundaries: what the audit must NOT break (verify, do not assume)

This is a working site with live plumbing. The audit is a copy pass, not a refactor.

- **Live feeds stay wired and untouched.** `src/lib/useLabStatus.ts`, the absolute
  status URLs in `adLab` / `linuxLab`, and every component that consumes them
  (`ADLabProgress`, `LinuxLabProgress`, `HeroLabStat`, `HeroStatusPill`,
  `TopologyGraph`) keep their fetch logic, types, fallbacks, and deep-link
  construction byte-identical. Copy inside them may change; logic may not.
- **No structural changes.** Section order, anchors (`#ad-lab`, `#linux-lab`, ...),
  `NAV_LINKS`, the disclosure (`<details>`) pattern, component boundaries, and the
  9-section IA all stay. No new sections, no merges, no reordering.
- **No visual changes.** Tokens, classes, spacing, pills, fonts are out of scope. If a
  rewrite changes a line's length so drastically it breaks a layout, shorten the rewrite,
  not the layout.
- **Numbers the feeds own stay out of static copy.** Anything like "5/7 phases",
  "phases A-C done", "3/34" belongs to the runtime feed render only. Static copy stays
  qualitative ("in progress", "planned"). The one sanctioned static snapshot is the
  `SNAPSHOT` fallback constants, which are code, not copy; leave them.
- **Honesty floor.** Never invent experience, tools, metrics, or outcomes. Every claim
  must trace to the lab, a repo, a passed cert, or the feeds. "No professional MSP tenure
  yet" survives in substance. When tightening, it is always safer to claim less.
- **Config and tooling untouched**: `next.config.mjs`, `tailwind.config.ts`,
  `deploy.yml`, `package.json`, `paths.ts`. The resume PDF is generated outside the
  repo; if its text needs changes, FLAG them in the report, do not regenerate it.

After all edits, these invariants must hold (prove each in verification):
build passes; both feeds still render live data in the preview; every guide deep link
still resolves; no console errors; `grep` finds zero em dashes in shipped copy.

## Method (use real scale: subagents / a workflow, not one linear pass)

The owner explicitly authorizes multi-agent orchestration for this audit. Structure it,
do not wing it:

1. **Inventory.** One pass extracts EVERY user-facing string with its file:line into a
   working list. Include metadata, aria-labels, alt text, `<title>`, OG script text.
   Nothing is exempt because it is short.
2. **Parallel lenses over the inventory.** At minimum:
   - *Slop hunter*: AI-tell patterns per the list above; anything template-flavored.
   - *Precision*: vague nouns, unverifiable claims, wobbling terminology, redundancy
     across sections (the hero, cards, and sections must not repeat each other).
   - *Honesty*: every factual claim traced to evidence (curl both lab-status.json feeds
     for current truth; check cert claims against the certs data; flag anything the
     feeds could outrun).
   - *Voice*: does it sound like the owner. Rewrites must be things a careful 20-year-old
     tech would actually type.
3. **Adversarial verify.** Every proposed rewrite gets an independent check: does it
   claim more than the original evidence supports, introduce an em dash, break a
   boundary above, or sound MORE like AI than what it replaces? Kill any that do.
4. **Consistency sweep.** One agent reads the final full text top to bottom as a page
   (not as diffs) checking flow, repetition between adjacent sections, and terminology.
5. **Report BEFORE editing.** Produce a findings table: file:line, current text, verdict
   (keep / tighten / rewrite), proposed replacement, and why. The owner reviews and
   approves before any file changes. He prefers seeing a preview before anything merges;
   honor that again at ship time (build, serve `out/`, screenshots, wait for approval).
6. **Apply + verify + ship** (only after approval): make the approved edits, run
   `npm run build`, re-verify the invariants above in the served static export, then
   commit to `main` authored as `Charlie Weaver <charliewgz6@gmail.com>`, message in the
   repo's style, NO AI co-author trailer (AGENTS.md section 13, owner preference), push,
   watch the Pages deploy to success, and confirm the live site.

## Known tensions to adjudicate honestly

- "the same workflow a client firewall change needs" style translations are sanctioned
  by AGENTS.md (skill-to-task mapping) but the same shape repeated many times becomes a
  tell. Keep the mapping, vary the construction, and cut the weakest instances.
- The saved-page reference in `docs/portfolio-review.md` and `_deliverables/*.md` are
  working notes, not shipped copy; ignore them except as history.
- Screenshot note: kill animations AND force opacity before capturing
  (`*{animation:none!important;transition:none!important;opacity:1!important;transform:none!important}`),
  otherwise the fade-in freeze produces blank shots.

## Success criteria

- Zero AI-tell constructions survive; zero em dashes; zero feed-owned numbers in static
  copy; zero redundant sentences between sections.
- Every surviving sentence earns its place: cut it and something real is lost.
- The site still builds, the feeds still render live, every link still works, and the
  live deploy is verified green at the end.
- The final report lists what changed, what was deliberately kept, and anything flagged
  for the owner (resume PDF text, tensions above).
