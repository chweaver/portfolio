# Copy audit findings (report only, nothing edited yet)

Audit of every user-facing string, per the mega-brief. Method: one inventory agent
(281 strings across 20 files, only Section.tsx empty), four parallel lens agents
(slop, precision, honesty, voice), then adversarial verification and a consistency
sweep. The four verify agents and the consistency agent hit the session usage limit,
so those two passes were done inline by the orchestrator against the recovered lens
findings: every quote was re-checked against the file, conflicting proposals merged,
and one honesty flag killed with feed evidence. Evidence baseline: both live
lab-status feeds fetched 2026-08-03, AGENTS.md sections 6 and 10, the certs data,
topologyNodes, and public/logs.

Verified invariants at report time: zero em or en dashes in src/ and scripts/
(grep), no repo file modified, feeds untouched.

---

## A. Proposed changes (16), for approval before any edit

| # | Location | Current | Verdict | Proposed | Why |
|---|---|---|---|---|---|
| 1 | src/data/portfolio.ts:150 | "...login scripts and help-desk drills are tracked live above." | tighten | "...tracked live below." | The live AD section renders below the Projects grid. The parallel Linux card already says "below". |
| 2 | src/data/portfolio.ts:156 | "Linux lab build (7 labs)" | tighten | "Linux lab build" | "7" is the feed-owned totalLabs count in static copy; the live section below carries the real count. Found independently by all four lenses. |
| 3 | src/data/portfolio.ts:161 | "Lab 1 (SSH hardening) is in progress, tracked live below. Six labs queued after it: Samba on the domain, ..." | rewrite | "Lab 1 (SSH hardening) is in progress, tracked live below. Queued after it: Samba on the domain, ..." (rest unchanged) | "Six labs queued" is a derived feed count, wrong the moment lab 1 completes. Dropping the numeral keeps the sentence qualitative; the named list stays. |
| 4 | src/data/portfolio.ts:89 | "Public documentation: this site, the AD lab guide, and named snapshots at every clean state" | tighten | "Public documentation: this site, the AD and Linux lab guides, and named snapshots at every clean state" | The Linux guide is public, live-fed, and linked two sections down; the built list undercounts its own evidence. |
| 5 | src/data/portfolio.ts:103 | "Carmel, IN · Indy metro" | tighten | "Carmel, IN · Indianapolis metro" | The only "Indy" on the site; every other surface says "Indianapolis metro". |
| 6 | src/data/portfolio.ts:173 | stack: [... 'VLAN' ...] | tighten | stack: [... 'Routing' ...] | Nothing in the pfSense project configures 802.1Q; segmentation is two VMware VMnets routed by pfSense. "Routing" is backed by the card's own "Two routed /24 subnets". VLAN exposure legitimately lives in the Packet Tracer row. |
| 7 | src/data/portfolio.ts:405 | "Single Packet Tracer scene to date. ...are the Phase 5 ramp." | rewrite | "Single Packet Tracer topology to date. IOS configuration, OSPF, services on IOS, security, wireless, and automation come with CCNA study." | "Phase 5" is a dangling reference to the removed roadmap; on today's page it reads as an AD feed phase (whose phase 5 is file services, wrong). "Topology" matches Packet Tracer vocabulary; "scene" is nonstandard. |
| 8 | src/components/Projects.tsx:11 | "The homelab is the moat. Outcome first; the proof is in the sections below." | rewrite | "The homelab is the proof. The detail is in the sections below." | "Moat" is startup/VC jargon, the one word on the page this owner would not type, and "Outcome first" restates the title directly above it ("Hands-on work, outcome first"). Found by three lenses. |
| 9 | src/components/FirewallRules.tsx:10 | "...verified in the log - the same workflow a client firewall change needs." | tighten | "...verified in the log: the same workflow a client firewall change needs." | The spaced hyphen functions as an em dash, which the house rules ban. The colon is the sanctioned substitute; the only dash-like character in shipped copy. |
| 10 | src/components/LinuxLabProgress.tsx:31 | contextCard "Bridging Linux into the Windows domain the way a real mixed network runs, then operating it: logs, metrics, patches." | rewrite | "One lab per service: harden SSH, join the domain, then add DNS, backups, logging, monitoring, and patching." | Near-verbatim mirror of project 2's problem field (portfolio.ts:159), visible on the same page two sections apart; scanning both reads as copy-paste. The replacement carries the section's own so-what and matches the feed's lab list exactly. |
| 11 | src/components/NetworkTopology.tsx:11 | "...Each node turns green as its labs (from SSH hardening through central logging, monitoring, and patching) complete, read live from the Linux lab guide." | tighten | "...Each Linux node turns green as its labs complete, read live from the Linux lab guide." | Merges two lens findings: only the three Linux nodes carry labs (DC01/WS01/pfSense never turn green), and the four-item parenthetical splits subject from verb in a card meant for skimmers. The lab names already appear in the live section and on the nodes. |
| 12 | src/components/NetworkTopology.tsx:41 | "The Linux DNS lab adds a BIND9 resolver on rocky-base..." | tighten | "The planned Linux DNS lab will add a BIND9 resolver on rocky-base..." | The BIND9 lab is status planned in the feed. Present-tense "adds" reads as built, exceeding the evidence. |
| 13 | src/components/SkillsMatrix.tsx:180-182 | "The full CompTIA A+ is complete, both exams passed. It is the gatekeeper credential for MSP and help-desk work, covering hardware, networking, virtualization, operating systems, security, and software troubleshooting. Next up is Security+, then CCNA." | rewrite | "Both cores passed. Next up is Security+, then CCNA." | The A+ cert card in the same section already carries the identical six-domain list and the "MSP gatekeeper credential" claim (portfolio.ts:439); the card heading repeats "certified June 2026". Saying it all twice in one section reads as template padding. Alternative: delete the closing card entirely (owner call; found by three lenses). |
| 14 | src/components/ArtifactGallery.tsx:95 | "Direct exports from the pfSense web UI, plus the real filter.log, dhcpd.log, and system.log under public/logs. Click any thumbnail for full size." | rewrite | "Screenshots straight from the pfSense web UI, plus the raw filter.log, dhcpd.log, and system.log published with this site. Click any thumbnail for full size." | The artifacts are screenshots, not exports, and "under public/logs" is a source-tree path a recruiter cannot navigate; the useful fact is that the raw logs ship with the site. |
| 15 | src/components/TopologyGraph.tsx:124 | aria-label "...with Linux servers marked complete as their lab finishes" | tighten | "...with Linux servers marked complete as their labs finish" | Nodes carry multiple labs (ops01 has three) and complete only when all finish; the singular describes the mechanism wrong for screen-reader users. |
| 16 | scripts/build-og-card.mjs:35 | "Live Active Directory domain  ·  pfSense + firewall lab" | tighten | "Live Active Directory domain  ·  routed pfSense firewall lab" | pfSense is the firewall, so "pfSense + firewall lab" reads as two items. Matches the OG description's "routed pfSense lab". Requires rerunning node scripts/build-og-card.mjs. |

## B. Flags: the owner's call, no edit proposed

1. **Hero.tsx:10, "Lab VMs 6 · pfSense + 2 Windows + 3 Linux".** The site elsewhere
   documents a seventh machine: ipTable has debian-base at 192.168.100.11 ("LAN second
   host"), summary.built says "Ubuntu, Debian, and Rocky Linux VMs", and the Mixed Linux
   card names Debian (ifupdown). Meanwhile ipTable omits DC01, WS01, and ops01. Either
   debian-base still runs (hero should say 7 / 4 Linux) or it was retired (its ipTable
   row, summary.built wording, and the Mixed Linux card are stale). Found by three
   lenses; only the owner knows the current lab state.
2. **layout.tsx:15, Title Case site title** ("MSP Tier-1 Service Desk Candidate |
   Active Directory + pfSense Lab"). Conflicts with the sentence-case rule and the
   body's lowercase "tier-1", but title case in a browser tab / SERP is a conventional,
   defensible choice. Sentence-case variant ready if the house rule wins.
3. **layout.tsx:16, age in the OG description** ("Entry-level MSP candidate, 20.").
   Hardcoded number that drifts on a birthday, and hands screeners an age datum. If the
   young-plus-certified angle is deliberate, keep; otherwise drop ", ${profile.age}".
4. **portfolio.ts:377, "Eve-NG Pro installed (post-A+ activation)".** Ambiguous:
   activated after passing the A+ (done fact, say it plainly) or activation still
   pending (stale, the A+ passed in June). Only the owner knows which.
5. **portfolio.ts:178-186, the Odysseus card.** The most detailed card on the page
   (four-service Compose stack, GPU tuning, hardening, test battery) is the only one
   with zero linked evidence (repo: ''). Options: publish a sanitized repo or write-up
   and link it, or trim the card's specificity toward the evidence shown.
6. **portfolio.ts:162, project 2 stack pills** list tools from labs the feed marks
   planned (Samba, BIND9, rsync, rsyslog, Prometheus, Docker). Lean keep: the card is
   pilled in-progress and its result text labels those labs queued, and the feed's
   monitoring phases confirm Prometheus/Grafana/Docker are genuinely planned. Trim to
   the hands-on set (Linux, OpenSSH, ufw, fail2ban) only if pills should mean
   "touched", not "series scope".
7. **Dead copy-bearing exports** (code cleanup, outside this copy pass):
   profile.labPhase (portfolio.ts:81) and subnets (portfolio.ts:189-204) have no
   component consumers (verified by grep) and silently drift. Suggest deleting both.
8. **HeroLabStat.tsx:5-8 comment** still references the removed sticky strip (stale
   comment, not user-facing; fix in passing if desired).

## C. Resume PDF flags (generated outside the repo; flag only, per the brief)

- "department file shares" under the AD project: the feed's departmental file server
  is phase 9, planned. Phase 5's shares and home folders are done, so "file shares" is
  defensible; "department" overshoots. Suggest "file shares and redirected home folders".
- "RAID and storage configuration" under Hardware: nothing in the lab, site, or guides
  backs RAID. Either it traces to the PC build (then say what) or it should go.
- ServiceNow, Jira, Microsoft 365 listed as bare skills: the site carefully says
  "familiar, not yet hands-on". The resume should carry the same qualifier or drop them.
- "Every phase is written up as a public step-by-step guide on my portfolio": the
  guides live on the separate guide sites the portfolio links to. "on my lab guide
  sites, linked from my portfolio" is the accurate version.
- "VLANs" under Networking: backed only by the single Packet Tracer SVI scene; site
  copy discloses that depth, the resume line does not. Borderline; owner call.

## D. Killed or resolved during verification

- Honesty flag on "Prometheus + Grafana on Docker" (portfolio.ts:161): KILLED. The
  live feed's monitoring lab phases are "Docker on ops01", "Prometheus + Grafana under
  Compose", "Wire up Grafana". The copy matches the guide's plan exactly.
- Three competing rewrites each for Projects.tsx:11, SkillsMatrix.tsx:180, and
  portfolio.ts:405 were merged to the single strongest variant (shown in section A).
- Precision's variant of finding 3 also removed "Grafana on Docker"; dropped for the
  reason above.

## E. Deliberate keeps (examined, left alone)

- "Design, apply, and verify a real client-style firewall policy": a verb triplet, but
  each verb maps to shown work, unlike the killed "Define, test, document, explain".
- "measured, not guessed" (Odysseus): contrast construction, but terse and backed by
  the described test battery.
- "Punch a single TCP/22 hole", "SSH punches through", "real reps": informal but
  concrete and authentically this owner's register.
- "Let's talk" (Contact): generic but short and human; every same-length alternative
  is equally generic.
- Identical subtitles on the two live sections ("Read live from the ... guide I build
  and document myself"): deliberate parallelism, AGENTS.md wants the sections identical.
- Hero static stats "Subnets routed 2" / "Firewall rules 3": static infrastructure
  counts the feeds do not own; consistent across all surfaces.
- The "skill-to-task" client mappings (firewall contextCard, MSP column, Mixed Linux
  card): constructions vary enough that the sanctioned shape does not read as a tell.
- SNAPSHOT constants in HeroLabStat/HeroStatusPill: sanctioned code fallbacks, match
  the current feed.
- "Entry-level MSP candidate, 20." honesty posture and "No professional MSP tenure
  yet" survive untouched in substance in every proposal above.
- Consistency observations not worth churn: "certified June 2026" renders on four
  label surfaces (each is a legitimate label; the SkillsMatrix rewrite removes a fifth);
  the Firewall title and its contextCard both say "verified in the log" (minimal-fix
  colon change only).

## F. Applied and verified (owner approved all 16 on 2026-08-03)

All 16 changes from section A are applied. The OG card was regenerated
(node scripts/build-og-card.mjs). Verification against the served static export
(http-server on out/, port 4173):

- npm run build: compiled successfully, TypeScript clean, 3/3 static pages.
- Both feeds render live in the export: AD 5/7 build-out phases (updated Jul 19),
  Linux 3/34 phases, 0/7 labs (updated Aug 2). Fetch logic untouched.
- Guide deep links resolve (200): AD phase-01, AD phase-06, Linux lab 01, guide
  topology.
- Zero console errors on load.
- Zero em or en dashes in the shipped HTML (grep on out/).
- "moat" gone from the shipped HTML; new strings confirmed present.

New discovery during verification: summary.built and summary.planned no longer
render anywhere (Hero uses only summary.honesty), so change 4 landed in dead copy.
Harmless and still correct, but both arrays join the dead-exports cleanup flag
(B.7) alongside profile.labPhase and subnets. AGENTS.md section 7.1 still
describes hero "built vs planned cards"; that line is stale.

## G. Still owed at ship time (after owner sees the preview)

Screenshots (Browser pane was not displayed at verification time; preview server
still running), owner preview approval, then: commit to main as Charlie Weaver
(no AI trailer), push, watch the Pages deploy, hard-refresh and confirm the live
site.
