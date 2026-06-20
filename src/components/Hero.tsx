import { profile, summary, heroGlance } from '@/data/portfolio';
import { publicAsset } from '@/lib/paths';
import { HeroLabStat } from './HeroLabStat';

const STATS = [
  { label: 'Subnets routed', value: '2', sub: 'LAN + LAB200' },
  { label: 'Firewall rules', value: '3', sub: 'pass / block / pass' },
  { label: 'Network lab VMs', value: '4', sub: 'pfSense + 3 Linux' },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20">
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 h-72 bg-[radial-gradient(closest-side,rgba(34,211,238,0.18),transparent_70%)] blur-3xl"
        aria-hidden
      />
      <div className="container-narrow relative">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
            {profile.shortName} · {profile.location} · Indianapolis metro
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-ink leading-[1.12]">
            {profile.headline}
          </h1>
          <p className="mt-5 font-mono text-sm accent-line">
            CompTIA A+ Core 1 passed · Core 2 in progress · CCNA next
          </p>
          <p className="mt-5 text-ink-dim leading-relaxed">
            Applying for tier-1 service desk, help desk, NOC, and junior sysadmin roles across the
            Indianapolis metro. The lab on this page is the proof: a live Active Directory domain, a
            segmented pfSense network, and multi-distro Linux, all documented and verified.
          </p>

          {/* At-a-glance strip: the 5-second recruiter scan. Hairline-separated
              cells via a 1px gap over a border-colored background. */}
          <div className="mt-8 grid max-w-[880px] grid-cols-2 gap-px overflow-hidden rounded-xl border border-bg-border bg-bg-border md:grid-cols-4">
            {heroGlance.map((g) => (
              <div key={g.k} className="bg-bg-card px-4 py-3">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
                  {g.k}
                </div>
                <div className="mt-1 text-sm leading-snug text-ink">{g.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={publicAsset('/Charlie-Weaver-Resume.pdf')} download className="btn-primary">
              Download resume ↓
            </a>
            <a href={`mailto:${profile.email}`} className="btn-secondary">
              Contact Charlie
            </a>
            <a href="#ad-lab" className="btn-secondary">
              See lab proof →
            </a>
            <span className="flex items-center gap-4 pl-1 text-sm">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="link">
                GitHub
              </a>
            </span>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
          <HeroLabStat />
          {STATS.map((s) => (
            <div key={s.label} className="card p-5">
              <div className="font-mono text-5xl md:text-6xl text-ink tabular-nums leading-none">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-ink">{s.label}</div>
              <div className="font-mono text-xs text-ink-faint">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-green" />
              Built and verified
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-dim">
              {summary.built.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="font-mono text-signal-green">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-amber" />
              Designed, not yet built
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-dim">
              {summary.planned.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="font-mono text-signal-amber">○</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-bg-border pt-4 text-sm italic text-ink-faint">
              {summary.honesty}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
